import express from 'express'
import { deleteQP, generateQP, getQP, jobStatus, listQP } from '../controllers/qp-controller';


const router = express.Router()

router.post('/generate-question-paper',generateQP)
router.post('/all-question-paper', listQP)
router.post('/delete-question-paper',deleteQP)
router.post('/get-question-paper',getQP)
router.post('/jobs',jobStatus)

export default router;