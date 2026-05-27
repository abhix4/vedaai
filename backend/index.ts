import express from 'express'
import { generateQuestionPaper } from './ai-stuff';
import { parseAiJson } from './lib/parse-ai-json';
import { connectDB } from './db';
import userRoutes from './routes/user-routes'
import qpRoutes from './routes/qp-routes'
import http from 'http'
import { initSocket } from './realtime/socket';
import { authenticate } from './middleware/auth';

const app = express()
app.use(express.json())
// const server = http.createServer(app);

// initSocket(server);


const port = 8080;

connectDB()

app.use("/teacher",authenticate, userRoutes);
app.use("/",qpRoutes)
app.get("/",(req,res) => {
    return res.json({
        message:"hi"
    })
})



// app.post("/generate-question-paper",async(req,res) => {
//     const AiResponse: any = await generateQuestionPaper()
//     const parsed = parseAiJson(AiResponse);
//     return res.json({
//         parsed
//     })
// })

app.listen(port,()=>{
    console.log(`listening on ${port}` )
})
