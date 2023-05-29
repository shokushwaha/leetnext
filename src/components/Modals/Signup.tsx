import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil'
import { useState } from 'react';
import { auth, firestore } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
type Props = {}

function Signup({ }: Props) {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };

    const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const router = useRouter();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);


    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all fields");
        try {
            toast.loading("Registering....", { position: "top-center", toastId: "loadingToast" });
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser)
                return;

            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: [],
            };

            await setDoc(doc(firestore, "users", newUser.user.uid), userData);

            router.push('/');

        } catch (error: any) {
            toast.error(error.message, { position: "top-center", autoClose: 2000, toastId: "errorToast" })
        }
        finally {
            toast.dismiss("loadingToast");
            toast.success("Registered successfully!", { autoClose: 1000 });
        }

    }

    useEffect(() => {
        if (error)
            alert(error.message);
    }, [error])


    return (
        <>
            <form className='space-y-6 px-6 mb-4' onSubmit={handleRegister}>
                <h2 className=' font-medium text-gray-500 flex items-center gap-4 text-2xl'>Register
                    <span className='text-4xl font-bold px-8 text-black uppercase'>

                        NextLeet
                    </span>
                </h2>
                <div>
                    <label htmlFor="email" className='text-sm font-medium block mb-2  text-gray-200'>
                        Email
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
                    <label htmlFor="displayName" className='text-sm font-medium block mb-2  text-gray-200'>
                        Username
                    </label>
                    <input type="text" name='displayName' id='displayName' onChange={handleInputChange}
                        className='
                        outline-none sm:text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-4
                        py-4
                        bg-white border-b-2 hover:boder-2 border-gray-500 placeholder-gray-400 text-gray-800 shadow
                  '
                        placeholder='@username'
                    />
                </div>
                <div>
                    <label htmlFor="password" className='text-sm font-medium block mb-2  text-gray-200'>
                        Password
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
            ' >
                    {loading ?
                        'Registering....'
                        : 'Register'
                    }
                </button>

                <div className='text-sm font-medium text-gray-600'>
                    Already have an account?{" "}
                    <a href='#' className='text-yellow-600 hover:underline' onClick={() => handleClick("login")}>
                        Login
                    </a>
                </div>

            </form>
        </>
    )
}

export default Signup