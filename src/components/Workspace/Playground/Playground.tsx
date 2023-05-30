import React, { useEffect } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from "@/firebase/firebase";
import { toast } from 'react-toastify'
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { problems } from "@/utils/problems";
import { useRouter } from 'next/router';
type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
    fontSize: string;
    settingsModalIsOpen: boolean;
    dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
    const [user] = useAuthState(auth);
    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
    let [userCode, setUserCode] = useState<string>(problem.starterCode);

    const {
        query: { pid },
    } = useRouter();


    const [settings, setSettings] = useState<ISettings>({
        fontSize: '16px',
        settingsModalIsOpen: false,
        dropdownIsOpen: false,
    });


    const handleSubmit = async () => {
        if (!user) {
            toast.error("You have to login to perform this action", { position: 'top-center', autoClose: 2000 });
            return;
        }
        try {

            userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
            const cb = new Function(`return ${userCode}`)();
            const handler = problems[pid as string].handlerFunction;

            if (typeof handler === "function") {
                const success = handler(cb);
                if (success) {
                    toast.success("All tests passed!", {
                        position: "top-center",
                        autoClose: 2000,

                    });
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 4000);

                    const userRef = doc(firestore, "users", user.uid);
                    await updateDoc(userRef, {
                        solvedProblems: arrayUnion(pid),
                    });
                    setSolved(true);
                }
            }

        } catch (error: any) {
            if (
                error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
            ) {
                toast.error("Oops! One or more test cases failed", {
                    position: "top-center",
                    autoClose: 2000

                });
            } else {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000

                });
            }
        }


    }


    useEffect(() => {
        const code = localStorage.getItem(`code-${pid}`);
        if (user) {
            setUserCode(code ? JSON.parse(code) : problem.starterCode);
        }
        else {
            setUserCode(problem.starterCode);
        }
    }, [pid, user, problem.starterCode]);


    const onChange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${pid}`, JSON.stringify(value));
    }

    return (
        <>
            <div className='flex flex-col bg-neutral-800 relative overflow-x-hidden'>

                <PreferenceNav settings={settings} setSettings={setSettings} />
                <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                    <div className='w-full overflow-auto'>
                        <CodeMirror
                            value={userCode}
                            theme={vscodeDark}
                            extensions={[javascript()]}
                            style={{ fontSize: settings.fontSize }}
                            onChange={onChange}
                        />
                    </div>






                    <div className='w-full px-5 overflow-auto bg-slate-200'>

                        <div className='flex h-10 items-center space-x-6'>
                            <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                <div className='text-md font-bold leading-5 text-gray-800 '>Testcases</div>
                                <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black' />
                            </div>
                        </div>

                        <div className='flex '>
                            {problem.examples.map((example, index) => (
                                <div
                                    className='mr-2 items-start mt-2 '
                                    key={example.id}
                                    onClick={() => setActiveTestCaseId(index)}
                                >
                                    <div className='flex flex-wrap items-center gap-y-4'>
                                        <div
                                            className={`font-medium items-center transition-all focus:outline-none inline-flex   relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap 
                                            bg-slate-100
										${activeTestCaseId === index ? "text-black bg-white shadow" : "text-gray-500"}
									`}
                                        >
                                            Case {index + 1}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='font-semibold my-4'>
                            <p className='text-sm font-medium mt-4 text-black'>Input:</p>
                            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-white shadow border-transparent text-gray-500 mt-2'>
                                {problem.examples[activeTestCaseId].inputText}
                            </div>
                            <p className='text-sm font-medium mt-4 text-black'>Output:</p>
                            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-white shadow border-transparent text-gray-500 mt-2'>
                                {problem.examples[activeTestCaseId].outputText}
                            </div>
                        </div>
                    </div>
                </Split>
                <EditorFooter handleSubmit={handleSubmit} />
            </div>
        </>
    )
}
export default Playground;