import React from 'react';
import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineSetting } from "react-icons/ai";
import { toast } from 'react-toastify';

type PreferenceNavProps = {

};

const PreferenceNav: React.FC<PreferenceNavProps> = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };
    useEffect(() => {
        function exitHandler(e: any) {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                return;
            }
            setIsFullScreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener("fullscreenchange", exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            document.addEventListener("MSFullscreenChange", exitHandler);
        }
    }, [isFullScreen]);
    return (
        <>
            <div className='flex items-center justify-between bg-slate-200 h-11 w-full'>
                <div className='flex items-center text-white'>
                    <button className='flex cursor-pointer items-center rounded focus:outline-none bg-slate-400 hover:bg-slate-100  px-2 py-1.5 font-medium mx-4'>
                        <div className='flex items-center px-1'>
                            <div className='text-xs text-label-2 text-black  ' onClick={() => { toast("Currently we support javascript only!") }}>JavaScript</div>
                        </div>
                    </button>
                </div>

                <div className='flex items-center m-2'>
                    <button className='preferenceBtn group'>
                        <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                            <AiOutlineSetting />
                        </div>
                        <div className='preferenceBtn-tooltip'>Settings</div>
                    </button>

                    <button className='preferenceBtn group'>
                        <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                            <AiOutlineFullscreen />
                        </div>
                        <div className='preferenceBtn-tooltip'>Full Screen</div>
                    </button>
                </div>
            </div>
        </>
    )
}
export default PreferenceNav;