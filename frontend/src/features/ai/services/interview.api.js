import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

export const generateInterviewReport = async ({resume, selfDescription, jobDescription})=> {

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const response = await api.post("/api/interview", formData ,{
        headers: {
            "content-Type": "multipart/form-data"
        }

    })
    return response.data; 
}

export const getReportsById = async (interviewId)=>{

    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;

}

export const getAllReportsByUserId = async () =>{

    const response = await api.get("/api/interview");
    return response.data;
}