import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import Logout from '../Buttons/Logout';
import { toast } from 'react-toastify'
type TopbarProps = {

};

const Topbar: React.FC<TopbarProps> = () => {
    const [user] = useAuthState(auth);
    return (
        <>

            <nav className='fixed top-0 left-0 flex h-[70px] w-full shrink-0 items-center px-5 bg-neutral-800  '>
                <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}>
                    <Link href={'/'} className='flex items-center justify-center h-20  gap-2' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#facc15" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        <span className='text-yellow-400 font-bold text-xl md:text-2xl font-poppins' >NEXTLEET</span>


                    </Link>

                    <div className='flex items-center space-x-4 flex-1 justify-end'>
                        <div>
                            <div

                                className='bg-neutral-600 py-1.5 px-3 cursor-pointer rounded text-yellow-400 hover:bg-neutral-700'

                                onClick={() => toast("⚡⏰Working on it", { autoClose: 1000 })}
                            >
                                Premium
                            </div>
                        </div>
                        {!user &&
                            <Link href='/auth'>
                                <button className='bg-yellow-400 py-1 px-2 cursor-pointer rounded shadow hover:bg-neutral-700 hover:text-yellow-400 transition duration-200 '>Login</button>
                            </Link>
                        }
                        {user && (
                            <div className='cursor-pointer group relative'>
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