import { generateInterviewReport, getReportsById, getAllReportsByUserId } from "../services/interview.api"; 
import { InterviewContext } from '../interview.context.jsx';
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import React from 'react'

export const useInterview = () => {

    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error(
        "useInterview must be used within InterviewProvider");
    }

    const { interviewId} = useParams();

    const { loading, setLoading, report, setReport, allReports, setAllReports } = context;


     const generateReport = async ({resume, selfDescription, jobDescription}) =>{
        setLoading(true);
        let response = null; 
        try{
            response = await generateInterviewReport({resume, selfDescription, jobDescription});
            setReport(response.interviewReportData);
            console.log(response.interviewReportData);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
        return response;
    }

    
     const getReport = async (interviewId) =>{
        setLoading(true);
        let response = null;
        try{
            response = await getReportsById(interviewId );
            setReport(response.InterviewReport);
            console.log(response.InterviewReport);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
        return response
    }

    
     const getAllReport = async () =>{
        setLoading(true);
        let response = null;
        try{
            response = await getAllReportsByUserId();
            setAllReports(response.allReports);
            console.log(response.allReports);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
        return response;
    }

    return {loading, report, allReports, generateReport, getReport, getAllReport} 
}


