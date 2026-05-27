import express from 'express'
import { deleteQP, generateQP, listQP } from '../controllers/qp-controller';


const router = express.Router()

router.post('/generate-question-paper',generateQP)
router.post('/all-question-paper', listQP)
router.post('/delete-question-paper',deleteQP)

export default router;