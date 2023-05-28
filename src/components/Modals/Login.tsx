import { authModalState } from '@/atoms/authModalAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil'
import { useState, useEffect } from 'react';
import { auth } from "@/firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { toast } from 'react-toastify'
type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const router = useRouter();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password)
            return toast.error("Fill all the fields", { position: "top-center", autoClose: 4000, theme: "dark" });

        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push("/");
        } catch (error: any) {
            toast.error(error.message, { position: "top-center", autoClose: 4000, theme: "dark" });
        }
    }

    useEffect(() => {
        if (error)
            toast.error(error.message, { position: "top-center", autoClose: 4000, theme: "dark" });
    }, [error])

    return (
        <>
            <form className='space-y-6 px-6 mb-4' onSubmit={handleLogin}>
                <h2 className=' font-medium text-gray-500 flex items-center gap-4 text-2xl'>Login
                    <span className='text-4xl font-bold px-10 text-black uppercase'>

                        NextLeet
                    </span>
                </h2>
                <div>
                    <label htmlFor="email" className='text-sm font-medium block mb-2  text-gray-200'>
                        Your Email
                    </label>
                    <input type="email" name='email' id='email' onChange={handleInputChange}
                        className='
                     outline-none sm:text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-4
                     py-4
                     bg-white border-b-2 hover:boder-2 border-gray-500 placeholder-gray-400 text-gray-800 shadow
                  '
                        placeholder='example@gmail.com'
                    />
                </div>
                <div>
                    <label htmlFor="password" className='text-sm font-medium block mb-2  text-gray-200'>
                        Your Password
                    </label>
                    <input type="password" name='password' id='password' onChange={handleInputChange}
                        className='
                        outline-none sm:text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-4
                        py-4
                        bg-white border-b-2 hover:boder-2 border-gray-500 placeholder-gray-400 text-gray-800 shadow
                   '
                        placeholder='********'
                    />
                </div>

                <button type='submit' className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2 text-center bg-yellow-400 hover:bg-yellow-500 shadow
            '>

                    {loading ? 'Logging in....' : 'Login'}

                </button>
                <button className='flex w-full justify-end' onClick={() => handleClick("forgotPassword")} >
                    <a href='#' className='text-sm block text-yellow-500 hover:underline w-full text-right'>
                        Forgot Password?
                    </a>
                </button>
                <div className='text-sm font-medium text-gray-600'>
                    Not Registered?{" "}
                    <a href='#' className='text-yellow-600 hover:underline' onClick={() => handleClick("register")}>
                        Create account
                    </a>
                </div>

            </form>
        </>
    )
}
export default Login;