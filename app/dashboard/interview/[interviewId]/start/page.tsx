'use client';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_component/QuestionsSection';
import RecordAnsSection from './_component/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface InterviewProps {
    params: {
        interviewId: string;
    };

}
interface Question {
    question: string;
    answer: string;
}


function StartInterview({ params }: InterviewProps) {

    const [interviewData, setInterviewData] = useState<any>(null);
    const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);

    const [mockInterviewQuestion, setmockInterviewQuestion] = useState<Question[]>([]);
    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                console.log(jsonMockResp);

                setmockInterviewQuestion(jsonMockResp); // Set the mock interview questions
                setInterviewData(result[0]); // Set the interview data (assuming it's an object)
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    }

    useEffect(() => {
        if (interviewData) {
            console.log('Interview Data:', interviewData);
        }
    }, [interviewData]);


    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}

                />

                {/* Video/Audio Recording */}
                <RecordAnsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && <Button onClick={() => setactiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button onClick={() => setactiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}

                {activeQuestionIndex == mockInterviewQuestion?.length - 1 &&
                    <Link href={"/dashboard/interview/" + interviewData?.mockId+"/feedback"}>
                        <Button>End Interview</Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default StartInterview