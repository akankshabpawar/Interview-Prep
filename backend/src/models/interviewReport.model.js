import mongoose from "mongoose";

/**
 * job description: String
 * resume text: String
 * self description :String
 * 
 * matchScore : number
 * technical question :[{
 *                      question: "",
 *                      intention:"",
 *                      answer: ""
 *                      }]
 * bahavioral question :[{
 *                      question: "",
 *                      intention:"",
 *                      answer: ""
 *                      }]
 * skill gaps :[{
 *              skill: "",
 *              sevary: {
 *                      type: String,
 *                      enum: ["low", "medium", "high"]
 *                      },
 *              }]
 * prepration plan :[{
 *                  day: number,
 *                  focus: String
 *                  task : [String]
 *                  }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: [true, "Technical Questions Are required"]
    },
    intention:{
        type:String,
        required: [true, "Intention is required"]
    },
    answer:{
        type:String,
        required: [true, "Answers Are required"]
    }
},{
    _id:false
});

const bhavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: [true, "Technical Questions Are required"]
    },
    intention:{
        type:String,
        required: [true, "Intention is required"]
    },
    answer:{
        type:String,
        required: [true, "Answers Are required"]
    }
},{
    _id:false
});

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required: [true, "skills required"]
    },
    severity:{
        type:  String,
        enum: [ "low", "medium", "high"],
        required: [true, "Severity is required"]
    }
},{
    _id: false
});

const preprationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true, "Day is required"]
    },
    focus:{
        type: String,
        required: [true, "focus is required"]
    },
    tasks:{
        type: [String],
        required: [true, "task is required"]
    }
},{
    _id:false
});

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: [true, "job description is required"]
    },
    resume:{
        type: String
    },
    selfDescription:{
        type: String
    },
    matchScore:{
        type: Number,
        max:100,
        min: 0
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [bhavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preprationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title:{
        type: String,
        required: [true, "job title is required"]
    }
},{
    timestamps: true
});

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

export default interviewReportModel;