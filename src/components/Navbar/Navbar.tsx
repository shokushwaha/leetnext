import { authModalState } from '@/atoms/authModalAtom';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil'
import { motion } from 'framer-motion';
type NavbarProps = {

};

const Navbar: React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, isOpen: true }))

    }
    return (

        <>
            <motion.div
                className="container text-center"
                initial={{ opacity: 0, y: "-2000px" }}
                animate={{ opacity: 1, y: "0px" }}
                exit={{ opacity: 0, y: "-2000px" }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex items-center justify-between sm:px-12 px-2 md:px-24 bg-neutral-800">
                    <Link href={'/'} className='flex items-center justify-center h-20  gap-2' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#facc15" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        <span className=' from-purple-600 via-pink-400 to-yellow-400 bg-gradient-to-r bg-clip-text text-transparent text-6xl md:text-3xl font-extrabold ' >NEXTLEET</span>


                    </Link>
                    <div className="flex items-center">
                        <button className='bg-yellow-400 text-black px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                    hover:text-yellow-400  hover:bg-transparent hover:border-2 hover:border-yellow-400 border-2 border-transparent transition duration-400 ease-in-out hover:scale-110
                    '  onClick={handleClick} >Login</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
export default Navbar;