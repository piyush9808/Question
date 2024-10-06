'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";

interface InterviewProps {
    params: {
        interviewId: string;
    };

}
function Interview({ params }: InterviewProps) {

    const [interviewData, setInterviewData] = useState<any>('');
    const [webCamEnabled, setwebCamEnabled] = useState(false)


    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, [])



    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId))

        console.log(result);

        setInterviewData(result[0]);
    }
    useEffect(() => {
        if (interviewData) {
            console.log(interviewData); // This will log the updated interview data
        }
    }, [interviewData]);

    return (
        <div className='my-10 flex flex-col  justify-center items-center text-white'>
            <h2 className='font-bold text-2xl '>Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Only render interview details if interviewData is not null */}
                {interviewData ? (
                    <div className='flex flex-col my-5 w-fit gap-5 p-5 '>
                        <h2 className='text-2xl font-bold'>Let&apos;s Get Started</h2>
                        <div className='flex flex-col p-5 rounded-lg border gap-5'>
                            <h2 className='text-lg'><strong>Job Role:</strong>{interviewData.jobPosition}</h2>
                            <h2 className='text-lg'><strong>Job Description:</strong>{interviewData.jobDescription}</h2>
                            <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData.jobEx}</h2>
                        </div>

                        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                            <h2 className='flex gap-2 items-center text-yellow-950'> <Lightbulb /><strong>Information</strong></h2>
                            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        </div>
                    </div>
                ) : (
                    <p>Loading interview details...</p> // You can display a loading message here
                )}

                {
                    webCamEnabled ? <Webcam
                        onUserMedia={() => setwebCamEnabled(true)}
                        onUserMediaError={() => setwebCamEnabled(false)}
                        style={{
                            height: 300,
                            width: 300
                        }}
                        mirrored={true}
                    />
                        :
                        <div className='flex flex-col items-center'>
                            <WebcamIcon className='h-72 w-full my-10 p-20 bg-secondary rounded-lg border' />
                            <Button onClick={() => setwebCamEnabled(true)}>Enable Web Camera and Microphne</Button>
                        </div>
                }



            </div>
            <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
                <Button className='mt-5'>Start Interview</Button>
            </Link>
        </div>
    )
}

export default Interview