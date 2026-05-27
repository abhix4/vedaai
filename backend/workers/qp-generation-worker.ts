import { Worker } from "bullmq";
import Redis from "ioredis";
import { generateQuestionPaper } from "../ai-stuff";
import {QuestionPaper} from '../db/qpSchema'
import { connectDB } from "../db";

const connection = new Redis(
  process.env.REDIS_URL!,
  {
    maxRetriesPerRequest: null,
  }
);

async function startWorker(){
    await connectDB();
    new Worker(
      "generation-queue",

      async (job) => {
        console.log("Job received");

        console.log(job.data);

        /// job here

        const paper:any = await generateQuestionPaper(job.data.dueDate, job.data.questionType, job.data.additionalInstruction);

        try {
          
          await QuestionPaper.create({
            title: paper.title,
            // class: paper.class,
            subject: paper.subject,
            totalMarks: paper.totalMarks,
            duration: paper.duration,
            sections: paper.sections,
            createdBy: job.data.createdBy
          })
        } catch (error) {
          console.log(error)
        }
        
        console.log(paper)

        
        await new Promise((resolve) =>
          setTimeout(resolve, 3000)
        );

        console.log("Paper generated");
      },

      {
        connection,
      }
    );

  console.log("Worker started");
}


startWorker();