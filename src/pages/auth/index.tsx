import { authModalState } from '@/atoms/authModalAtom';
import Loader from '@/components/Loader/Loader';
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar/Navbar';
import { auth } from '@/firebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
type AuthPageProps = {

};

const AuthPage: React.FC<AuthPageProps> = () => {

    const authModal = useRecoilValue(authModalState);
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user)
            router.push('/');

        if (!loading && !user)
            setPageLoading(false);

    }, [user, router, loading]);

    if (pageLoading)
        return <Loader />

    return (
        <>
            <motion.div
                className="container text-center"
                initial={{ opacity: 0, x: "-2000px" }}
                animate={{ opacity: 1, x: "0px" }}
                exit={{ opacity: 0, x: "-2000px" }}
                transition={{ duration: 0.4 }}
            >
                <div className=' h-screen relative bg-gradient-to-r from-slate-300 from-10% via-slate-100 via-40% to-gray-300 to-80% '>
                    <div className="max-w-screen">
                        <Navbar />
                        <div className="flex flex-col gap-10 items-center justify-center h-[calc(100vh-5rem)] md:flex-row ">

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-40 h-40 md:w-80 md:h-80">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>

                            </div>
                            <div className='text-2xl  text-center flex flex-col gap-4 items-center text-gray-800 md:text-4xl' >The most effective   platform   to solve
                                problems
                                <span className='from-purple-600 via-pink-400 to-yellow-400 bg-gradient-to-r bg-clip-text text-transparent text-6xl md:text-8xl uppercase font-extrabold'>
                                    Nextleet

                                </span>

                                <Link href={'/'} className='flex items-center gap-2 justify-center px-4 py-1 text-yellow-400 bg-neutral-800 rounded-md shadow text-xl border-2 border-transparent hover:border-black hover:bg-transparent hover:text-black'>
                                    <span className=''>
                                        Explore
                                    </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        {authModal.isOpen && <AuthModal />}
                    </div>
                </div>
            </motion.div>
        </>)
}
export default AuthPage;