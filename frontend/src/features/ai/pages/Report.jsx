import React, { useState, useEffect } from 'react'
import '../style/report.scss'
// import report from '../../../../../test.json';
import {useInterview} from '../hooks/useInterview.jsx'
import { useParams } from 'react-router-dom';
import Loading from '../../../layout/Loading.jsx';
import { HiArrowLongLeft } from "react-icons/hi2";

const Report = () => {

    const { interviewId} = useParams();

    const {loading, report, getReport} = useInterview();
    

    const [showTechnical, setShowTechnical] = useState(true);
    const [showBehavioral, setShowBehavioral] = useState(false);
    const [showPrepPlan, setShowPrepPlan] = useState(false);

    useEffect(() => {
    if (interviewId) {
        getReport(interviewId);
    }
    }, [interviewId]);

    if(loading){
        return <Loading/>
    }

    if(!report){
        return(<h1> No Data Found </h1>)
    }
    // console.log(report);

  return (
    <div className='container'>
        <p className='relative'>
            <a href='http://localhost:5173/home'> <HiArrowLongLeft /> </a>
        </p>

        <h2> Here is Your Report For<span> {report.title} </span></h2>
        

        <div className="report">
            <section className='up-section'>

                <div className="matchscore">
                    <h1> {report.matchScore} </h1>

                    <div
                        className="circle"
                        style={{
                            background: `conic-gradient(
                            orange ${report.matchScore}%,
                            white ${report.matchScore}%
                            )`,
                        }}
                        >
                        {report?.matchScore}%
                    </div>
                </div>
                
                <div className="skillgaps">
                    <h2>Skill Gaps</h2>

                    {report?.skillGaps?.map((skill, index) => (
                        <div key={index} className="skill-card">
                            <h4>{skill.skill}</h4>
                            <span className={`severity ${skill.severity}`}>
                                {skill.severity}
                            </span>
                        </div>
                    ))}
                </div>

            </section>

            <section className='down-section'>

                <h1> Technical Questions <div onClick={()=>{setShowTechnical(!showTechnical)}}> {showTechnical ? "-" : "+"} </div></h1>

                {showTechnical && (
                    <div className="technical">
                        {report?.technicalQuestions?.map((question, index)=>(
                            <div key={index} className="Question-card">
                                <h4> {index + 1}. {question.question}</h4>
                                <p className='intention'> {question.intention}</p>
                                <p> Answer - {question.answer} </p>
                            </div>
                        ))}
                    </div>)}

                <h1> Bhavioral Questions <div onClick={()=>{setShowBehavioral(!showBehavioral)}}> + </div></h1>

                {showBehavioral && ( 
                    <div className="behavioral">
                        {report?.behavioralQuestions?.map((question, index)=>(
                            <div key={index} className="Question-card">
                                <h4> {index + 1}. {question.question}</h4>
                                <p className='intention'> {question.intention}</p>
                                <p> Answer -  {question.answer} </p>
                            </div>
                        ))}
                    </div>)}


                <h1> Prepration Plan <div onClick={()=>{setShowPrepPlan(!showPrepPlan)}}> +</div></h1>

                {showPrepPlan && (
                    <div className="plan">
                        {report?.preparationPlan?.map((plan, index)=>(
                            <div key={index} className="Question-card">
                                
                                <p className='day'> Day {plan.day} - {plan.focus}</p>
                                <div> {plan.tasks.map((task, indx)=>(
                                    <div key={indx}>
                                        <p>{task}</p>
                                    </div>
                                ))} </div>
                            </div>
                        ))}
                    </div>
                )}

            </section>
            

        </div>

    
      
    </div>
  )
}

export default Report
