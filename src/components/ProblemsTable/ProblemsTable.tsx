import { useState, useEffect, FC } from 'react';
import Link from 'next/link';
import YouTube from "react-youtube";
import { IoClose } from 'react-icons/io5'
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { toast } from 'react-toastify';
import { useAuthState } from "react-firebase-hooks/auth";
type ProblemsTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
};

const ProblemsTable: FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
    const [youtubePlayer, setYoutubePlayer] = useState({
        isOpen: false,
        videoId: "",
    });
    const closeModal = () => {
        setYoutubePlayer({ isOpen: false, videoId: "" });
    };
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, []);


    const problems = useGetProblems(setLoadingProblems);
    const solvedProblems = useGetSolvedProblems();
    return (
        <>

            <tbody >
                {problems.map((problem, idx) => {
                    const difficultoColor = problem.difficulty === 'Easy' ? "text-green-500" : problem.difficulty === "Medium" ? "text-yellow-500" : "text-red-500";

                    return (
                        <tr className={`${idx % 2 == 1 ? "bg-white" : "bg-slate-100"}  border-b-2 border-gray-200  `} key={problem.id}>
                            <th className='px-2 py-4 font-medium whitespace-nowrap '>

                                {solvedProblems.includes(problem.id) &&
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6"  >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                }

                            </th>
                            <td className='px-6 py-4 text-black font-bold ' >
                                {problem.link === "" ? (
                                    <div

                                        className='text-gray-400 hover:cursor-pointer'
                                        onClick={() => { toast("Link coming soon!"), { autoClose: 1000 } }}
                                    >
                                        {problem.title}
                                    </div>
                                ) : (
                                    <Link
                                        className='hover:text-blue-600 cursor-pointer'
                                        href={`/problems/${problem.id}`}
                                    >
                                        {problem.title}
                                    </Link>
                                )}

                            </td>
                            <td className={`px-6 py-4 text-black font-semibold ${difficultoColor}`}>{problem.difficulty}</td>
                            <td className={"px-6 py-4 text-black font-semibold"}>{problem.category}</td>
                            <td className={"px-6 py-4 text-black"}>
                                {problem.videoId ?
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  hover:text-red-500 hover:cursor-pointer" onClick={() => setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string })}>
                                            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                        </svg>

                                    </span>
                                    :

                                    <p className='text-gray-400'>Coming soon</p>
                                }

                            </td>
                        </tr>
                    );
                })}
            </tbody>
            {youtubePlayer.isOpen && (
                <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                    <div
                        className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
                        onClick={closeModal}
                    ></div>
                    <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                        <div className='w-full h-full flex items-center justify-center relative'>
                            <div className='w-full relative'>
                                <IoClose
                                    fontSize={"35"}
                                    className='cursor-pointer absolute -top-16 right-0'
                                    onClick={closeModal}
                                />
                                <YouTube
                                    videoId={youtubePlayer.videoId}
                                    loading='lazy'
                                    iframeClassName='w-full min-h-[500px]'
                                />
                            </div>
                        </div>
                    </div>
                </tfoot>
            )}
        </>
    )
}
export default ProblemsTable;


function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBProblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true);
            const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
            const querySnapshot = await getDocs(q);
            const tmp: DBProblem[] = [];
            querySnapshot.forEach((doc) => {
                tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
            });
            setProblems(tmp);
            setLoadingProblems(false);
        };

        getProblems();
    }, [setLoadingProblems]);
    return problems;
}


function useGetSolvedProblems() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getSolvedProblems = async () => {
            const userRef = doc(firestore, "users", user!.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                setSolvedProblems(userDoc.data().solvedProblems);
            }
        };

        if (user) getSolvedProblems();
        if (!user) setSolvedProblems([]);
    }, [user]);

    return solvedProblems;
}