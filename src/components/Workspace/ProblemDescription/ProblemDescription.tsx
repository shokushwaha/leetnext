import { Problem } from '@/utils/types/problem';
import Image from 'next/image';
import React from 'react';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
type ProblemDescriptionProps = {
    problem: Problem
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {

    return (
        <div className='bg-slate-200'>

            <div className='flex h-11 w-full items-center pt-2 bg-slate-200 text-black overflow-x-hidden'>
                <div className={"bg-slate-100 rounded-t-[5px] px-5 py-[10px]  cursor-pointer font-bold "}>
                    Description
                </div>
            </div>

            <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
                <div className='px-5'>

                    <div className='w-full'>
                        <div className='flex space-x-4'>
                            <div className='flex-1 mr-2 text-lg text-gray-800 font-medium'>{problem.title}</div>
                        </div>
                        <div className='flex items-center mt-3'>
                            <div
                                className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                            >
                                Easy
                            </div>
                            <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
                                <BsCheck2Circle />
                            </div>
                            <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
                                <AiFillLike />
                                <span className='text-xs'>120</span>
                            </div>
                            <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'>
                                <AiFillDislike />
                                <span className='text-xs'>2</span>
                            </div>
                            <div className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '>
                                <TiStarOutline />
                            </div>
                        </div>

                        <div className='text-gray-800 text-sm'>
                            <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
                        </div>

                        <div className='mt-4'>
                            {problem.examples.map((example, index) => (
                                <div key={example.id}>
                                    <p className='font-medium text-gray-500 '>Example {index + 1}: </p>
                                    {example.img && <Image src={example.img} alt='' className='mt-3' width={400} height={200} />}
                                    <div className='example-card'>
                                        <pre>
                                            <strong className='text-black'>Input: </strong> {example.inputText}
                                            <br />
                                            <strong className='text-black'>Output:</strong>
                                            {example.outputText} <br />
                                            {example.explanation && (
                                                <>
                                                    <strong className='text-black'>Explanation:</strong> {example.explanation}
                                                </>
                                            )}
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='my-8 pb-4'>
                            <div className='text-black text-sm font-medium'>Constraints:</div>
                            <ul className='text-black ml-5 list-disc '>
                                <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProblemDescription;