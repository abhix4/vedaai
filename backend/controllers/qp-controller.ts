import type { Request, Response } from "express";
import { generationQueue } from "../queues/qp-generation-queue";
import { QuestionPaper } from "../db/qpSchema";


export async function generateQP(req: Request, res: Response){
    const {
        dueDate,
        questionType,
        additionalInstruction
    }  = req.body;


    const job = await generationQueue.add('generate-paper', {
        dueDate,
        questionType,
        additionalInstruction,
        createdBy: '6a15878b55ed0527d4f76233'
    })
    if(!job){
        return res.status(500).json({
            message:"failed to generate assignment"
        })
    }
    return res.status(200).json({
        message:"job added!",
        data: job.id
    })
}


export async function listQP(req: Request,res: Response){
    const {userId} = req.body;
    const allQuestionPapers = await QuestionPaper.find({createdBy: userId});

    return res.status(200).json({
        allQuestionPapers
    })
}

export async function deleteQP(req: Request,res: Response){
    const {qpId} = req.body;
    const qp = await QuestionPaper.findOneAndDelete({_id: qpId});

    if(!qp){
        return res.status(500).json({
            message:"question paper does not exists!"
        })
    }

    return res.status(200).json({
        message: "Question paper deleted sucessfully!"
    })
}