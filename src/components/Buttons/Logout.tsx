import React from 'react';
import { auth } from "@/firebase/firebase";

import { useSignOut } from "react-firebase-hooks/auth";
type LogoutProps = {

};

const Logout: React.FC<LogoutProps> = () => {
    const [signOut, loading, error] = useSignOut(auth);

    const handleLogout = () => {
        signOut();
    };
    return (
        <>


            <button className='bg-neutral-600 py-1.5 px-3 cursor-pointer rounded text-yellow-400' onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>

            </button>
        </>
    )
}
export default Logout;