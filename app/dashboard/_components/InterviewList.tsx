'use client';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

interface InterviewItem {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDescription: string;
    jobEx: string;
    createdBy: string;
    createdAt: string|null; // This is correct
    mockId: string;
}

function InterviewList() {

    const { user } = useUser();
    const [interviewList, setinterviewList] = useState<InterviewItem[]>([]);

    useEffect(() => {
        user && GetInterviewList();
    }, [user])


   
    const GetInterviewList = async () => {

        if (!user?.primaryEmailAddress?.emailAddress) {
            console.error("User email is not available");
            return;
        }

        const result = await db.select().from(MockInterview).where
            (eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))
        console.log(result);
        setinterviewList(result);
    }

    return (
        <div>
            <h2 className='font-lg text-bold'>Previous Mock Interviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>{interviewList&&interviewList.map((interview,index)=>(
                <InterviewItemCard
                interview={interview} key={index} />
            ))}</div>
        </div>
    )
}

export default InterviewList