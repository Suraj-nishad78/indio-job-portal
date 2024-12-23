import express from "express"
import expressEjsLayout from "express-ejs-layouts"
import session from "express-session"
// import nodeMailer from "nodemailer"
import dotenv from "dotenv"
import {join} from "path"
import ejs from "ejs"
import bodyParser from "body-parser"
import axios from "axios"
import cookieParser from "cookie-parser"


dotenv.config()
/*----import function are here-----*/
import {
    jobsHome,

    loginPage,
    createRecruiter,
    loginRecruiter,
    logoutRecruiter,

    jobListingPage,
    jobDetails,
    jobApplicants,
    newJobPage,
    createNewJob,
    updateJobPage,
    updateJob,
    deleteJob,
    applicantsForm,

    applicantsAccount,
    loginApplicants,
    getApplicantAccount,
    applicantsAppliedJob,
    updateAppliedJob,
    deleteAppliedJob,
    logoutApplicant,
    jobApplyApplicants,

    findJob,

    userNotFound,
    page404
} from "./src/controller/controller.js"

import { upload } from "./src/middleware/multer.js"
import {sendApplicantMail, updateApplicantMail} from "./src/middleware/nodeMailer.js"
import{lastLoggedInAt} from "./src/middleware/cookies.js"

/*----import function are here-----*/

const app = express();

app.set('view engine', 'ejs');
app.set('views', join(process.cwd(), '/src/views'));
app.set('layouts', 'layout')


/*-------Middleware---------*/

app.use(cookieParser())
app.use(express.static(join(process.cwd(), 'public'))); 
app.use(expressEjsLayout);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: 'recruiter',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

/*-------Middleware End---------*/

/*---------App-Arrays, Jobs-Arrays, Recrui-Arrays--------*/
import {
    applicantsArrayRoute,
    recruitersArrayRoute,
    jobsArrayRoute
} from "./src/controller/controller.js"
import { console } from "inspector"


app.get("/applicantsArray", applicantsArrayRoute)
app.get("/recruitersArray", recruitersArrayRoute)
app.get("/jobsArray", jobsArrayRoute)

/*---------App-Arrays, Jobs-Arrays, Recrui-Arrays-End--------*/

app.get("/", jobsHome)
app.get("/home", jobsHome)

app.get("/login", loginPage)
app.post("/login", lastLoggedInAt, loginRecruiter)//
app.get("/logout", logoutRecruiter)//
app.post("/recruiter", lastLoggedInAt, createRecruiter)

app.get("/jobs", jobListingPage)
app.get("/job/:id", jobDetails)

app.get("/post-job", newJobPage)
app.get("/update-job-page/:id", updateJobPage)
app.get('/jobs/applicants', jobApplicants)
app.post("/post-job", createNewJob)
app.post('/job-search', findJob)
app.put("/update-job/:id", updateJob)
app.delete("/job/:id", deleteJob)
app.get('/jobs/:id/applicants', applicantsForm)


app.get('/login/applicants', loginApplicants)
app.post('/Signup/applicants', applicantsAccount)
app.post('/login/applicant', getApplicantAccount)
app.get('/logout/applicants', logoutApplicant)
app.get('/appliedJobs/:appId', applicantsAppliedJob)
app.post('/jobs/:jobId/applicants/:appId', upload.single('resume'), sendApplicantMail, jobApplyApplicants)
app.put('/applicants/:appId/index/:index', upload.single('resume'), updateApplicantMail , updateAppliedJob)
app.delete('/jobs/:jobId/applicants/:appId/index/:index', deleteAppliedJob)


app.get("/user-not-found", userNotFound)
app.get('*', page404)


app.listen(3000, ()=>{
    console.log('Server is runnig on port 3000')
})

