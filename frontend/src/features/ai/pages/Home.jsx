import React from 'react'
import '../style/aiHome.scss'
import { useState, useEffect } from 'react'
import {useInterview} from '../hooks/useInterview.jsx'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../layout/Loading.jsx'

const Home = () => {

  const navigate = useNavigate()

  const { loading, generateReport, getAllReport, allReports, getReport} = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  useEffect(() => {
    getAllReport();
  }, []);

  // console.log(allreports);
  if(loading){
    return <Loading/>;
  }
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(jobDescription == "" && (resume == "" || selfDescription == "")){
      console.log("fields are required");
    }
    else if(resume == "" || selfDescription == ""){
      console.log("either resume or selddescription is required")
    }
    else{

      // console.log({jobDescription, resume, selfDescription});
      
      const response = await generateReport({resume, selfDescription, jobDescription });
      // console.log(response);
      navigate(`/report/${response._id}`);
    }  
  }

  async function handleClick(interviewId){
    // console.log(interviewId);
    const response = await getReport(interviewId);
    // console.log(response);
    navigate(`/report/${interviewId}`)
    // console.log("======================")
  }

  return (
   <>
    <header>
        <h1>Create Your Custom <span>Interview Plan</span></h1>
        <p> Let our AI analyze the job requirements and your profile to build a winning strategy </p>
    </header>


    <form onSubmit={handleSubmit}>
    <div className="home-container">

      <div className="left">

        <div className="input_field">
          <label htmlFor="jobDesc"> Target Job Description</label>
          <textarea id="jobDesc" 
            name="jobDescription" 
            onChange={(e)=> {setJobDescription(e.target.value)}} 
            placeholder='Paste full job description here....' required></textarea>
        </div>

      </div>

      <div className="right">

        <div className="input_field">
          <label htmlFor="resume"> Upload Resume</label>
          <input id="resume" type="file" 
            placeholder='Click to upload'
            accept="application/pdf,.pdf"
            name='resume'
            onChange={(e) => {
              setResume(e.target.files[0]);
              console.log(e.target.files[0]);
            }}/>
        </div>

        <div className="input_field">
           <label htmlFor="selfDesc"> Quick Self Description</label>
          <textarea id="selfDesc" 
            name='selfDescription'
            placeholder='Breafly describe your experience, key skills if you dont have a resume handy..'
            onChange={(e)=>{setSelfDescription(e.target.value)}}></textarea>
        </div>

        <div className="note">
          <p> Either a Resume or a Self Description is required to generate a personolised plan </p>
        </div>

      </div>
            
    </div>
    <div className="buttom">
      <button type='submit'>Generate My Interview Strategy</button>
    </div>
    </form>



<div className='history-cards'>
  {allReports?.length > 0 && (
    <div className='allcards'>
      {allReports.map((report) => (
        <div key={report._id}  className='card' onClick={()=> {return handleClick(report._id)}}>
          <p>{report.title}</p>
          <div className='align'>
          <div className='left'>
            <p> MatchScore :  {report.matchScore}</p>
          </div>
          <div className='right'>
            <p className='relative'>  {report.createdAt.slice(0, 10)}</p>
          </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  </>
   
  )
}

export default Home
