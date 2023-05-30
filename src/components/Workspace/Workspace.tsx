import React, { useState, useEffect } from 'react';
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
    const [success, setSuccess] = useState<boolean>(false);
    const [solved, setSolved] = useState<boolean>(false);

    return <Split className='split' minSize={0}>


        <ProblemDescription problem={problem} _solved={solved} />
        <div>

            <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />

            {success &&
                <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />
            }
        </div>
    </Split>

}
export default Workspace;