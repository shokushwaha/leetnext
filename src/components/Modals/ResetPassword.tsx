import React, { useState, useEffect } from 'react';
import { auth } from "@/firebase/firebase";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from 'react-toastify'
type ResetPasswordProps = {

};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
    const [email, setEmail] = useState("");
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await sendPasswordResetEmail(email);
        if (success) {
            toast.success("Password reset email sent", { position: "top-center", autoClose: 4000, theme: "dark" });
        }
    };
    useEffect(() => {
        if (error) {
            alert(error.message);
        }
    }, [error]);
    return (
        <>
            <form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' onSubmit={handleReset} >
                <h3 className='text-2xl font-semibold  text-black'>Reset Password</h3>
                <p className='text-sm text-gray-600 '>
                    Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
                    to reset it.
                </p>
                <div>
                    <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-400'>
                        Your email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        className=' outline-none sm:text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-4
                        py-4
                        bg-white border-b-2 hover:boder-2 border-gray-500 placeholder-gray-400 text-gray-800 shadow'
                        placeholder='example@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className={`w-full text-white focus:ring-blue-300 font-medium rounded-lg
                    text-sm px-5 py-2 text-center bg-yellow-400 hover:bg-yellow-500 shadow `}
                >
                    Reset Password
                </button>
            </form>
        </>
    )
}
export default ResetPassword;