/*------- Import function here------*/
import { name } from "ejs"
import {
    createRecruiterModel,
    findRecruiterModel,
    applicantsFunc,
    recruitersFunc,
    jobsArrayFunc,
    createJob,
    getJobFromId,
    updateJobWithId,
    deletejobWithId,

    findJobText,

    addApplicantsInArray,
    checkApplicantsExist,
    createApplicants,
    applicantsFormData

} from "../model/model.js"


/*------- Import function here------*/

/*---------App-Arrays, Jobs-Arrays, Recrui-Arrays--------*/

const applicantsArrayRoute = (req, res) =>{
    const app = applicantsFunc()
    res.send(app)
}

const recruitersArrayRoute = (req, res) =>{
    const recrui = recruitersFunc()
    res.send(recrui)
}

const jobsArrayRoute = (req, res) =>{
    const jobsR = jobsArrayFunc()
    res.send(jobsR)
}

/*---------App-Arrays, Jobs-Arrays, Recrui-Arrays-End--------*/


const jobsHome = (req, res) =>{
    let user = req.session.user || '';
    let app = req.session.App || '';
    res.render('home',{user, app})
}



const createRecruiter = (req, res) =>{
    createRecruiterModel(req.body)
    res.redirect("/login")
}

const loginPage = (req, res)=>{
    let user = req.session.user || '';
    let app = req.session.App || '';
    res.render("login", {user, app})
}

const loginRecruiter = (req, res) =>{
    const recruiter = findRecruiterModel(req.body)
    if(recruiter && recruiter.length){
        // const userName = recruiter[0].name;
        // req.session.user = userName;
        req.session.user = recruiter[0];
        res.redirect("/jobs")
    }else{
        res.redirect("/user-not-found")
    }
}

const logoutRecruiter = (req, res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/login');
        }
      });
}


const jobListingPage = (req, res)=>{
    let lastLoggedIn = req.session.lastLoggedIn || '';
    let user = req.session.user || '';
    let app = req.session.App || '';
    const jobs = jobsArrayFunc()
    res.render("jobs", {user, jobs, app, lastLoggedIn})
}


const jobDetails = (req, res)=>{
    const job = getJobFromId(req.params)
    let user = req.session.user || '';
    let app = req.session.App || '';
    res.render("job-Details", {user, app, job})
}

const newJobPage = (req, res)=>{
    let user = req.session.user || ''
    let app = req.session.App || '';
    if(user){
        let jobNumber = '';
        res.render("post-job", {user, app, jobNumber})
    }else{
        const warning = 'only recruiter is allowed to access this page, login as recruiter to continue'    
        res.render("404page", {user,app, warning})
    }
}

const createNewJob = (req, res) =>{
    const userEmail = req.session.user.email;
    createJob(req.body, userEmail)
    res.redirect("/jobs")
}

const updateJobPage = (req, res)=>{
    const {id} = req.params;
    let user = req.session.user;
    let app = req.session.App || '';
    let jobNumber = id;
    res.render("post-job", {user, app, jobNumber})
}
const updateJob = (req, res)=>{
    const {id} = req.params;
    let user = req.session.user;
    let jobNumber = Number(id);
    const updateJobObj = updateJobWithId(jobNumber, req.body)
    if(updateJobObj && updateJobObj.length){
        res.redirect(`/job/${jobNumber}`)
    }
}

const deleteJob = (req, res) =>{
    const {id} = req.params;
    const deletedJob = deletejobWithId(id)
    if(deletedJob && deletedJob.length){
        res.redirect('/jobs')
    }
}

const findJob = (req, res) =>{
    const {search} = req.body;
    const searchText = search.trim();

    const jobs = findJobText(searchText)
    let lastLoggedIn = req.session.lastLoggedIn || '';
    let user = req.session.user || '';
    let app = req.session.App || '';

    if(jobs && jobs.length){
        res.render("jobs", {user, app, jobs, lastLoggedIn})
    }else{
        const warning = `Job name '${searchText}' doesn't exist`
        res.render("404page", {user, app, warning})
    }

}

const loginApplicants = (req, res)=>{
    let user = req.session.App || '';
    let app = req.session.App || '';
    res.render("loginApp", {user, app})
}

const applicantsAccount = (req, res)=>{
    const {name, email, password} = req.body;
    const app = {name, email, password, appliedJob:[]}
    const applicants = addApplicantsInArray(app)
    res.redirect('/login/applicants')
}

const getApplicantAccount = (req, res)=>{
    const {email, password} = req.body;
    const app = {email, password}
    const applicant =  checkApplicantsExist(app)
    if(applicant && applicant.length){
        req.session.App = applicant[0];
        res.redirect("/home")
    }else{
        res.redirect("/user-not-found")
    }
}

const logoutApplicant = (req, res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/login/applicants');
        }
      });
}

const jobApplicants = (req, res)=>{
    let user = req.session.user || '';
    let app = req.session.App || '';
    if(user){
        res.render("applicants", {user, app})
    }else{
        const warning = 'only recruiter is allowed to access this page, login as recruiter to continue'    
        res.render("404page", {user, app, warning})
    }
}

const jobApplyApplicants = (req, res) =>{
    const {name, email, number} = req.body;
    const { file } = req;
    const{jobId, appId} = req.params;
    const applicant = { name, email, number, resume: `/uploads/${email}-${file.originalname}`};
    createApplicants(applicant, jobId, appId)
    res.redirect('/jobs')
}

const applicantsAppliedJob = (req, res)=>{
    let user = req.session.user || '';
    let app = req.session.App || '';
    const {appId} = req.params;
    const applicantData = applicantsFunc().filter( app => app.id == appId)
    const applicants = applicantData[0].appliedJob;
    if(!app){
        const warning = 'Only applicants is allowed to access this page, login as applicant to continue'
        res.render("404page", {user, app, warning})
        return;
    }
    let count = 1;
    res.render("applicants", {user,app , applicants, count})
}


const applicantsForm = (req, res) =>{
    let user = req.session.user || '';
    let app = req.session.App || '';
    const {id} = req.params
    const jobs = jobsArrayFunc().filter(job=>job.id == id)
    const createrJob = jobs[0].jobCreater;
    if(user.email == createrJob){
        const applicants = applicantsFormData(req.params);
    
        if(applicants && applicants.length){
            let count = 1;
            res.render("applicants", {user,app , applicants, count})
            return
        }
        const warning = 'No body apply for this job'
        res.render("404page", {user, app, warning})
    }else if(user){
        const warning = 'Only recruiter who create this job can access this page'
        res.render("404page", {user, app, warning})
    }
    else{
        const warning = 'only recruiters is allowed to access this page, login as recruiter to continue'
        res.render("404page", {user, app, warning})
    }
}

const userNotFound = (req, res)=>{
    let user = req.session.user || '';
    let app = req.session.App || '';
    const warning = 'user not found pls register'
    res.render("404page", {user, app, warning})
}

const page404 = (req, res)=>{
    let user = req.session.user || '';
    let app = req.session.App || '';
    const warning = '404: Page not Found'
    res.render("404page", {user, app, warning})
}

export {
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
    logoutApplicant,
    jobApplyApplicants,

    findJob,

    userNotFound,
    page404,

    applicantsArrayRoute,
    recruitersArrayRoute,
    jobsArrayRoute,

}