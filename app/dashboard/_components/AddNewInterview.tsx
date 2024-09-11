'use client';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from "@/utils/GeminiAIModel";
import { Loader2Icon } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobPosition, setjobPosition] = useState('');
    const [jobDescription, setjobDescription] = useState('');
    const [jobExperience, setjobExperience] = useState('');
    const [loading, setloading] = useState(false)
    const [jsonResponse, setjsonResponse] = useState('');
    const { user } = useUser();
    const { v4: uuidv4 } = require('uuid');
    const router=useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setloading(true)
        e.preventDefault();
        console.log(jobPosition, jobExperience, jobDescription)

        const InputPrompt = "Job position:" + jobPosition + ",Job Description:" + jobDescription + ",Years of Experience:" + jobExperience + ",Please give " + process.env.NEXT_PUBLIC_INTERVIEW_COUNT + " interview questions alongwith their answers, the question with its answer in JSON format,the response should only have question with their answer in json"


        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')

        console.log(MockJsonResp);
        setjsonResponse(MockJsonResp);

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDescription: jobDescription,
                    jobEx: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress ?? 'Unknown',
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId });
                
            console.log("INSERTED ID:", resp);

            if(resp)
                {
                setOpenDailog(false);
                router.push('/dashboard/interview/'+resp[0]?.mockId);
            }
        }

        else {
            console.log("ERROR");
        }
        setloading(false);
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 transition-all hover:shadow-md cursor-pointer'
                onClick={() => setOpenDailog(true)}
            >
                <h2 className='font-bold text-lg text-center'>
                    +Add New
                </h2>
            </div>
            <Dialog open={openDailog}>

                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details about your job position,Job Description and years of experience</h2>
                                    <div className='mt-7 my-4'>
                                        <label className='text-bold'>
                                            Job Role/Position
                                        </label>
                                        <Input placeholder='Full-Stack Developer' required
                                            onChange={(event) => setjobPosition(event.target.value)}
                                        >
                                        </Input>
                                    </div>
                                    <div className='mt-3 my-4'>
                                        <label className='text-bold'>
                                            Job Description/TechStack
                                        </label>
                                        <Textarea placeholder='ReactJs,Docker,PowerBI' required
                                            onChange={(event) => setjobDescription(event.target.value)}
                                        >
                                        </Textarea>
                                    </div>
                                    <div className='mt-3 my-4'>
                                        <label className='text-bold'>
                                            Years of Experience
                                        </label>
                                        <Input placeholder='1-5' type='number' max="50" required
                                            onChange={(event) => setjobExperience(event.target.value)}
                                        >
                                        </Input>
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}

                                    >
                                        {loading ?
                                            <>
                                                <Loader2Icon className='animate-spin' />&apos;Generating from AI&apos;
                                            </>
                                            : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview