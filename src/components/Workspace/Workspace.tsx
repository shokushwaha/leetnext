import React, { useEffect } from 'react';
import Split from "react-split";
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { Problem } from '@/utils/types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
type WorkspaceProps = {
    problem: Problem
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
    const { width, height } = useWindowSize();

    // useEffect(() => {
    //     setTimeout(() => {

    //     }, 1000)
    // // }, [])
    // setTimeout(fnc, 100);
    // function fnc() {
    //     window.location.reload();

    // }
    return <Split className='split' minSize={0}>
        {/* <div className='bg-neutral-800'> */}

        <ProblemDescription problem={problem} />
        <Playground problem={problem} />
        {/* </div> */}
        {/* <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} /> */}
    </Split>

}
export default Workspace;