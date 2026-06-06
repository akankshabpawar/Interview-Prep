import express from 'express';
import getmeMiddleware from '../middleware/auth.middleware.js'
import {interviewReportcontroller, getReportsByIdController, getAllReportsByUserIdController} from '../controller/interview.controller.js'
import upload from '../middleware/file.middleware.js';

const interviewRouter = express.Router();

/**
 * api - /api/interview
 * desc - generate interview report on users self description, resume and job description 
 * access - private
 */
interviewRouter.post("/", getmeMiddleware, upload.single("resume"), interviewReportcontroller);


/**
 * api - /api/interview/report:id
 * desc - get all interview report of user
 * access - private
 */
interviewRouter.get("/report/:interviewId", getmeMiddleware, getReportsByIdController);


/**
 * api - /api/interview
 * desc - get all interview report of user
 * access - private
 */
interviewRouter.get("/", getmeMiddleware, getAllReportsByUserIdController);


export default interviewRouter;