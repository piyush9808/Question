'use client';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText, { ResultType } from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }: {
    mockInterviewQuestion: any;
    activeQuestionIndex: number;
    interviewData: any;
  })  {

    const [userAnswer, setUserAnswer] = useState<string>('');
    const { user } = useUser();
    const [loading, setloading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.forEach((result) => {
            if (typeof result !== 'string' && 'transcript' in result) {
                setUserAnswer(prevAns => prevAns + result.transcript);
            }
        });
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswerInDb();
        }
    }, [userAnswer])

    const StartStopRecording = async () => {

        if (isRecording) {

            stopSpeechToText()
            console.log(UserAnswer)
            
            // if (userAnswer?.length < 10) {
            //     setloading(false);
            //     toast('Error while saving your answer,please record again');
            //     return;
            // }


        }
        else {
            startSpeechToText();
        }
    }

    const UpdateUserAnswerInDb = async () => {
        console.log(userAnswer)
        setloading(true);
        const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question + ",User Answer" + userAnswer +
            "Depends on question and user answer for given interview question" + "Please give us rating for answer and feedback as area of improvement if any" + "in just 3 to 5 Lines to improve it in JSON format with rating field and feedback field";


        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');

        console.log(mockJsonResp);

        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer).values({
            mockId: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
        })

        if (resp) {
            toast('User Answer recorded successfully');
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);
        setloading(false);
    }

    return (
        <div className='flex items-center justify-center flex-col'>

            <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5  mt-20 my-20'>
                <Image src={'/webcam.png'} width={200} height={200} alt="webcam"
                    className="absolute" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button variant='outline' className='my-10'
                onClick={StartStopRecording} disabled={loading}
            >
                {isRecording ?
                    <h2 className=' flex gap-2 animate-pulse text-red-600'>
                        <Mic />&apos;Recording...&apos;
                    </h2>
                    :
                    'Record Answer'
                }
            </Button>


        </div>
    )
}

export default RecordAnsSection