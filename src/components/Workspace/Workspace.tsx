import React, { useState, useEffect } from 'react';
import Split from "react-split";
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { Problem } from '@/utils/types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
import { motion } from 'framer-motion'
type WorkspaceProps = {
    problem: Problem
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
    const { width, height } = useWindowSize();
    const [success, setSuccess] = useState<boolean>(false);
    const [solved, setSolved] = useState<boolean>(false);

    return <Split className='split' minSize={0}>

        <motion.div

            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4 }}
        >
            <ProblemDescription problem={problem} _solved={solved} />
        </motion.div>
        <motion.div

            initial={{ opacity: 0, x: "2000px" }}
            animate={{ opacity: 1, x: "000px" }}
            exit={{ opacity: 0, x: "2000px" }}
            transition={{ duration: 0.4 }}
        >

            <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />

            {success &&
                <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />
            }
        </motion.div>
    </Split>

}
export default Workspace;