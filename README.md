# AI Interview Preparation Platform

## Overview

AI Interview Preparation Platform is a full-stack web application designed to help candidates prepare effectively for job interviews. By analyzing a candidate's Resume, Job Description, and Self Introduction, the platform generates personalized interview preparation resources using Generative AI.

The application evaluates how well a candidate matches a target role and provides actionable insights to improve interview readiness.

---

## Features

### AI Match Score

* Analyzes the candidate's profile against the job description.
* Generates a compatibility score indicating overall job fit.

### Technical Interview Questions

* Creates role-specific technical questions based on:

  * Required skills
  * Technologies mentioned in the job description
  * Candidate's experience and projects

### Behavioral Interview Questions

* Generates personalized behavioral and situational questions.
* Helps candidates prepare for HR and culture-fit interviews.

### Skill Gap Analysis

* Identifies missing or weak skills compared to job requirements.
* Provides recommendations for improvement.

### Personalized 7-Day Preparation Plan

* Generates a structured study roadmap.
* Focuses on technical concepts, behavioral preparation, and skill improvement.

### User Authentication

* Secure login and registration using JWT authentication.
* Session management with cookies.

### Interview History

* Stores previous analyses and reports.
* Allows users to revisit and track progress.

---

## Tech Stack

### Frontend

* React.js
* React Router
* SCSS / CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI Integration

* Gemini API

### Authentication

* JWT (JSON Web Tokens)

---

## Project Workflow

1. User uploads:

   * Resume
   * Job Description
   * Self Introduction

2. AI processes the input and performs:

   * Resume analysis
   * Job requirement extraction
   * Skill matching

3. System generates:

   * Match Score
   * Technical Questions
   * Behavioral Questions
   * Skill Gap Report
   * 7-Day Preparation Plan

---
