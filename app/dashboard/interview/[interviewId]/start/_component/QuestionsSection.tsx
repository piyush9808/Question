
import { LightbulbIcon, Volume2 } from 'lucide-react'
import React from 'react'

type mockInterviewQuestion = {
    question: string;
   
};

interface QuestionsSectionProps {
    mockInterviewQuestion: mockInterviewQuestion[];
    activeQuestionIndex: number;
}

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }: QuestionsSectionProps) {

    const textToSpeech=(text:string)=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);

        }
        else{
            alert("Your Browser Doesnt Support it")
        }
    }
    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-4'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 key={index} className={`p-2 bg-slate-100 rounded-full
                    text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && " font-bold text-2xl bg-slate-400"}`}>Question #{index + 1}</h2>
                ))}
            </div>

            <h2 className='my-5 text-sm md:text-lg text-white'>{mockInterviewQuestion[activeQuestionIndex]?.question}
                
            </h2><Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
                
            <div className='border rounded-lg p-5 bg-blue-200'>
                <h2 className='flex gap-5 items-center'>
                    <LightbulbIcon />
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm my-2 '>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores eveniet totam obcaecati repellat hic, laborum id assumenda fuga perferendis? Repellat officia cupiditate iure quibusdam maiores? Sint tenetur ut quibusdam ullam.
                </h2>
            </div>

        </div>
    )
}

export default QuestionsSection