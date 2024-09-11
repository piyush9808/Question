import { serial,text, varchar,pgTable } from "drizzle-orm/pg-core";
export const MockInterview =pgTable('mockinterview',{
   id:serial('id').primaryKey(),
   jsonMockResp:text('jsonMockResp').notNull(),
   jobPosition:varchar('jobPosition').notNull(),
   jobDescription:varchar('jobDescription').notNull(),
   jobEx:varchar('jobEx').notNull(),
   createdBy:varchar('createdBy').notNull(),
   createdAt:varchar('createdAt'),
   mockId:varchar('mockId').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
   id:serial('id').primaryKey(),
   mockId:varchar('mockId').notNull(),
   question:varchar('question').notNull(),
   correctAns:varchar('correctAns'),
   userAns:text('userAns'),
   feedback:text('feedback'),
   rating:varchar('rating'),
   userEmail:varchar('userEmail'),
   createdAt:varchar('createdAt'),
   
})