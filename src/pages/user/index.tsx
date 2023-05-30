import Topbar from '@/components/Topbar/Topbar';
import { auth, firestore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type UserPageProps = {

};

interface UserDetails {
    displayName: string;
    email: string;
    createdAt: string;
    uid: string;
    updatedAt: string;
    likedProblems: string[];
    dislikedProblems: string[];
    solvedProblems: string[];
    starredProblems: string[];
}
const UserPage: React.FC<UserPageProps> = () => {
    const [user] = useAuthState(auth);
    const [liked, setLiked] = useState<string[]>([]);
    const [disLiked, setDisLiked] = useState<string[]>([]);
    const [starred, setStarred] = useState<string[]>([]);
    const [solved, setSolved] = useState<string[]>([]);
    const [create, setCreate] = useState<Date>();
    const [update, setUpdate] = useState<Date>();
    const [loading, setLoading] = useState<boolean>(false);

    const [userDetails, setUserDetails] = useState<UserDetails>()
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const docRef = doc(firestore, "users", user!.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap) {
                const result = docSnap.data() as UserDetails;
                setUserDetails(result)
                setLiked(result.likedProblems);
                setDisLiked(result.dislikedProblems);
                setStarred(result.starredProblems);
                setSolved(result.solvedProblems);
                let a = new Date(result.createdAt)
                let b = new Date(result.updatedAt)
                setCreate(a);
                setUpdate(b);
                setLoading(false);
            }
            else {
                toast.error("Failed to fethc user detials!", { position: 'top-center', autoClose: 2000 })
                setLoading(false);
            }
        }
        getUser();
        console.log(userDetails)
    }, []);





    return (
        <>
            <div className='bg-slate-200 min-h-screen'>

                <Topbar />

                <div className='flex  w-1/3 mx-auto items-center gap-4 bg-slate-100 mt-4 px-4 py-2'>

                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <span className='flex items-center gap-4'>

                            <span className='flex flex-col'>
                                <span className='uppercase text-gray-500 text-sm'>

                                    username:
                                </span>
                                <span className='text-gray-800 text-xl'>

                                    {userDetails?.displayName}
                                </span>
                            </span>
                        </span>

                        <span className='flex items-center gap-4'>

                            <span className='flex flex-col'>
                                <span className='uppercase text-gray-500 text-sm flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>

                                    email:
                                </span>
                                <span className='text-gray-800 text-xl'>

                                    {userDetails?.email}
                                </span>
                            </span>
                        </span>




                    </div>
                    <div className='flex flex-col  text-xs relative top-10 left-12 border-l-2 border-gray-500 pl-2'>

                        <span className='text-gray-600'>
                            <span className='text-gray-400'>

                                Created:
                            </span>
                            {userDetails?.createdAt}
                        </span>
                        <span className='text-gray-600'>
                            <span className='text-gray-400'>

                                Last updated:
                            </span>
                            <span >

                                {userDetails?.updatedAt}
                            </span>
                        </span>
                    </div>
                </div>

                <div className='flex items-center gap-4 justify-center mt-10 border-b-2 border-gray-400 w-5/6 mx-auto pb-4 '>
                    <span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>

                    </span>
                    <span className='text-4xl uppercase font-bold'>
                        Your Stats
                    </span>
                </div>

                {
                    loading ?
                        <div className='flex items-center justify-center'>

                            <LoadingSkeleton />
                        </div>
                        :


                        <div className='grid grid-cols-2 gap-4 w-4/5 mx-auto justify-center px-4 py-4 mt-10'>


                            <div className='bg-gradient-to-r from-green-200 via-green-300 to-green-400 w-2/3 px-4 py-2 rounded-md shadow'>
                                <span className='flex items-center gap-2 text-2xl font-bold bg-slate-100 p-1 rounded-md shaodw mb-4'><svg xmlns="http://www.w3.org/2000/svg" fill="#22c55e" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                                    Liked Problems</span>
                                <div>
                                    {liked && liked.length == 0 ?
                                        <span className='font-bold '>

                                            You have not liked any problem yet
                                        </span>

                                        : null}
                                    {liked && (
                                        liked.map((item, index) => {
                                            return (
                                                <>
                                                    <span className='flex items-center gap-2 py-1'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                        </svg>
                                                        <Link href={`problems/${item}`}>
                                                            {item}
                                                        </Link>
                                                    </span>

                                                </>
                                            )
                                        })
                                    )}
                                </div>
                            </div>







                            <div className='bg-gradient-to-r from-red-200 via-red-300 to-red-400 w-2/3 px-4 py-2 rounded-md shadow'>
                                <span className='flex items-center gap-2 text-2xl font-bold bg-slate-100 p-1 rounded-md shaodw mb-4'><svg xmlns="http://www.w3.org/2000/svg" fill="#ef4444" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                </svg>
                                    Disliked Problems</span>
                                <div>
                                    {disLiked && disLiked.length == 0 ?
                                        <span className='font-bold '>

                                            You have not disliked any problem yet
                                        </span>

                                        : null}
                                    {disLiked && (
                                        disLiked.map((item, index) => {
                                            return (
                                                <>
                                                    <span className='flex items-center gap-2 py-1'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
                                                        </svg>


                                                        <Link href={`problems/${item}`}>
                                                            {item}
                                                        </Link>
                                                    </span>

                                                </>
                                            )
                                        })
                                    )}
                                </div>
                            </div>


                            <div className='bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 w-2/3 px-4 py-2 rounded-md shadow '>
                                <span className='flex items-center gap-2 text-2xl font-bold bg-slate-100 p-1 rounded-md shaodw mb-4'><svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                    Starred Problems</span>
                                <div>
                                    {starred && starred.length == 0 ?
                                        <span className='font-bold '>

                                            You have not starred any problem yet
                                        </span>

                                        : null}

                                    {starred && (
                                        starred.map((item, index) => {
                                            return (
                                                <>
                                                    <span className='flex items-center gap-2 py-1'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                        </svg>


                                                        <Link href={`problems/${item}`}>
                                                            {item}
                                                        </Link>
                                                    </span>

                                                </>
                                            )
                                        })
                                    )}
                                </div>
                            </div>


                            <div className='bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-400 w-2/3 px-4 py-2 rounded-md shadow'>
                                <span className='flex items-center gap-2 text-2xl font-bold bg-slate-100 p-1 rounded-md shaodw mb-4'><svg xmlns="http://www.w3.org/2000/svg" fill="#38bdf8" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                                    Solved Problems</span>
                                <div>
                                    {solved && solved.length == 0 ?
                                        <span className='font-bold '>

                                            You have not solved any problem yet
                                        </span>

                                        : null}
                                    {solved && (
                                        solved.map((item, index) => {
                                            return (
                                                <>
                                                    <span className='flex items-center gap-2 py-1'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                        </svg>


                                                        <Link href={`problems/${item}`}>
                                                            {item}
                                                        </Link>
                                                    </span>

                                                </>
                                            )
                                        })
                                    )}
                                </div>
                            </div>

                        </div>}

            </div>



        </>)
}
export default UserPage;




const LoadingSkeleton = () => {
    return (
        <>


            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="flex items-baseline mt-4 space-x-6">
                    <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                    <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                    <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                </div>
                <span className="sr-only">Loading....</span>
            </div>

        </>
    )
}