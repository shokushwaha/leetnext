import React from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
type SingleProblemProps = {
    problem: Problem;
};

const SingleProblem: React.FC<SingleProblemProps> = ({ problem }) => {

    return (
        <>
            <Topbar problemPage={true} />

            <Workspace problem={problem} />

        </>
    )
}
export default SingleProblem;

export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params: { pid: key },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
    const { pid } = params;
    const problem = problems[pid];

    if (!problem) {
        return {
            notFound: true,
        };
    }
    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props: {
            problem,
        },
    };
}