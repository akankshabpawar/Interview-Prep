import { PDFParse } from 'pdf-parse';
import generateInterviewReport from '../sevices/ai.service2.js';
import interviewReportModel from '../models/interviewReport.model.js';

/**
 * api - /api/interview
 * desc - generate interview report on users self description, resume and job description 
 * access - private
 */

async function interviewReportcontroller(req, res){

    const resumeContent = new PDFParse(Uint8Array.from(req.file.buffer));
    const result = await resumeContent.getText();
    

    const{ selfDescription, jobDescription } = req.body;

    const interviewReportByAI = await generateInterviewReport({
        resume : result.text,
        selfDescription,
        jobDescription
    });

    const interviewReportData = await interviewReportModel.create({
        jobDescription,
        resume : result.text,
        selfDescription,
        ...interviewReportByAI,
        user: req.user.id

    });

    res.status(200).json({
        message: "done, Interview report generated successfully",
        interviewReportData
    })
    
}


/**
 * api - /api/interview/report/:id
 * desc -get all interview report of user
 * access - private
 */
async function getReportsByIdController(req, res){

    const { interviewId } = req.params;

    const InterviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id});

    if(!InterviewReport){
        return res.status(404).json({
            message: "Interview report not found",
        })
    }

    res.status(200).json({
        message: "Interview Report fetched successfully",
        InterviewReport
    })
}

/**
 * api - /api/interview/
 * desc -get all interview report of user
 * access - private
 */
async function getAllReportsByUserIdController(req, res){

    const allReports = await interviewReportModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select(
            "-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -__v"
        );

    res.status(200).json({
        message: "Fetched All reports successfully",
        allReports
    })
}

export {interviewReportcontroller, getReportsByIdController, getAllReportsByUserIdController};