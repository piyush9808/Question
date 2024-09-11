'use client';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FeedbackItem {
    id: number;
    createdAt: string | null;
    mockId: string;
    question: string;
    correctAns: string | null;
    userAns: string | null;
    feedback: string | null;
    rating: string | null;
    userEmail: string | null;
}


interface InterviewProps {
    params: {
        interviewId: string;
    };

}
function Feedback({ params }: InterviewProps) {

    const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);


    useEffect(() => {
        GetFeedback();
    }, [])
    const GetFeedback = async () => {
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockId, params.interviewId)).orderBy(UserAnswer.id);

        console.log(result)
        setFeedbackList(result);
    }
    return (
        <div className='p-10'>



            {feedbackList.length == 0 ?
                <h2>No Record Founded for this particular interview</h2>
                :
                <>
                    <h2 className='text-2xl font-bold text-green-400'>Congratulations</h2>
                    <h2 className="font-bold text-2xl">Here is your interview Feedback</h2>
                    <h2 className='text-primary text-lg my-3'>Your overall interview Rating:</h2>

                    <h2 className='text-sm text-gray-500'>Find below Interview Questions with correct answer,Your answer and scope for improvement</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg m-2 my-2 text-left flex  w-full justify-between'>
                                {item.question}
                                <ChevronsUpDownIcon className='h-5 w-5 flex' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2 p-2'> <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}
                                </h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 tex-sm text-red-950'><strong>Your Answer</strong>{item.userAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-200 tex-sm text-red-950'><strong>Correct Answer</strong>{item.correctAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-200 tex-sm text-red-950'><strong>Feedback</strong>{item.feedback}</h2>
                                </div>

                            </CollapsibleContent>
                        </Collapsible>

                    ))}
                </>

            }

            <Link href="/dashboard">
                <Button>Go Home</Button>
            </Link>
        </div>
    )
}

export default Feedback