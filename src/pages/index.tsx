import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { firestore } from "@/firebase/firebase";
import useHasMounted from "@/hooks/useHasMounted";
import { doc, setDoc } from "firebase/firestore";
import { useState } from 'react'
import { motion } from 'framer-motion'
export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(false);
  const hasMounted = useHasMounted();
  if (!hasMounted)
    return null;
  return (
    <>
      <motion.div
        className="container text-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.4 }}
      >
        <main className="bg-slate-200 min-h-screen" >
          <Topbar />
          <h1
            className='text-2xl text-center text-gray-700  font-medium uppercase mt-10 mb-5 pt-10'>
            ⚡&ldquo; Get all Done &rdquo;⚡
          </h1>

          <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
            {loadingProblems && (
              <div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
                {[...Array(10)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}
              </div>
            )}
            <table className='text-sm text-left text-gray-500  sm:w-7/12 w-full max-w-[1200px] mx-auto'>
              {!loadingProblems && (

                <thead className='text-xs text-gray-500 uppercase  border-b '>
                  <tr>
                    <th scope='col' className='px-1 py-3 w-0 font-medium'>
                      Status
                    </th>
                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                      Title
                    </th>
                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                      Difficulty
                    </th>

                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                      Category
                    </th>
                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                      Solution
                    </th>
                  </tr>
                </thead>
              )}
              <ProblemsTable setLoadingProblems={setLoadingProblems} />
            </table>
          </div>

        </main>
      </motion.div>
    </>
  )
}



const LoadingSkeleton = () => {
  return (
    <div className='flex items-center space-x-12 mt-4 px-6'>
      <div className='w-6 h-6 shrink-0 rounded-full bg-gray-500'></div>
      <div className='h-4 sm:w-52  w-32  rounded-full bg-gray-500'></div>
      <div className='h-4 sm:w-52  w-32 rounded-full bg-gray-500'></div>
      <div className='h-4 sm:w-52 w-32 rounded-full bg-gray-500'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};