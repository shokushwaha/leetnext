import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import Logout from '../Buttons/Logout';
import { toast } from 'react-toastify'
import Timer from '../Timer/Timer';
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { useRouter } from 'next/router';
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type TopbarProps = {
    problemPage?: boolean,
};


const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleProblemChange = (isForward: boolean) => {
        const { order } = problems[router.query.pid as string] as Problem;
        const direction = isForward ? 1 : -1;
        const nextProblemOrder = order + direction;
        const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);

        if (isForward && !nextProblemKey) {
            const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
            router.push(`/problems/${firstProblemKey}`);
        } else if (!isForward && !nextProblemKey) {
            const lastProblemKey = Object.keys(problems).find(
                (key) => problems[key].order === Object.keys(problems).length
            );
            router.push(`/problems/${lastProblemKey}`);
        } else {
            router.push(`/problems/${nextProblemKey}`);
        }
    };

    return (
        <>

            <nav className='relative flex h-[70px] w-full shrink-0 items-center px-5 bg-gradient-to-r from-gray-800 via-neutral-700 to-gray-900'>
                <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
                    <Link href={'/'} className='flex items-center justify-center h-20  gap-2' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#facc15" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        <span className='
                         from-purple-600 via-pink-400 to-yellow-400 bg-gradient-to-r bg-clip-text text-transparent text-6xl md:text-3xl font-extrabold ' >NEXTLEET</span>
                    </Link>



                    {problemPage && (
                        <div className='flex items-center gap-4 flex-1 justify-center pl-80'>
                            <div
                                className='flex items-center justify-center rounded bg-neutral-600 hover:bg-neutral-900 h-8 w-8 cursor-pointer'
                                onClick={() => { handleProblemChange(false) }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>

                            </div>
                            <Link
                                href='/'
                                className='flex items-center gap-2 font-medium max-w-[170px] text-gray-400 cursor-pointer'
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                    </svg>

                                </div>
                                <p>Problem List</p>
                            </Link>
                            <div
                                className='flex items-center justify-center rounded bg-neutral-600 hover:bg-neutral-900 h-8 w-8 cursor-pointer'
                                onClick={() => { handleProblemChange(true) }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                    )}




                    <div className='flex items-center space-x-4 flex-1 justify-end'>
                        <div>
                            <div

                                className='bg-neutral-600 py-1.5 px-3 cursor-pointer rounded text-yellow-400 hover:bg-neutral-700'

                                onClick={() => toast("⚡⏰Working on it", { autoClose: 1000 })}
                            >
                                Premium
                            </div>
                        </div>

                        {
                            user && problemPage && <Timer />
                        }
                        {!user &&
                            <Link href='/auth'>
                                <button className='bg-yellow-400 py-1 px-2 cursor-pointer rounded shadow hover:bg-neutral-700 hover:text-yellow-400 transition duration-200 '>Login</button>
                            </Link>
                        }
                        {user && (
                            <div className='cursor-pointer group relative' onClick={() => router.push('/user')} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#facc15" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                                <div
                                    className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-neutral-800 text-yellow-400 p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-400 ease-in-out'
                                >
                                    <p className='text-sm'>{user.email}</p>
                                </div>
                            </div>
                        )}
                        {user && <Logout />}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Topbar;