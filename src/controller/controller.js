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
    res.render('home',{user})
}



const createRecruiter = (req, res) =>{
    createRecruiterModel(req.body)
    res.redirect("/login")
}

const loginPage = (req, res)=>{
    let user = req.session.user || '';
    res.render("login", {user})
}

const loginRecruiter = (req, res) =>{
    const recruiter = findRecruiterModel(req.body)
    if(recruiter && recruiter.length){
        const userName = recruiter[0].name;
        req.session.user = userName;
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
    let user = req.session.user || '';
    const jobs = jobsArrayFunc()
    res.render("jobs", {user, jobs})
}


const jobDetails = (req, res)=>{
    const job = getJobFromId(req.params)
    let user = req.session.user || '';
    res.render("job-Details", {user, job})
}

const newJobPage = (req, res)=>{
    if(req.session.user){
        let user = req.session.user;
        let jobNumber = '';
        res.render("post-job", {user, jobNumber})
    }else{
        const user = ''
        const warning = 'only recruiter is allowed to access this page, login as recruiter to continue'    
        res.render("404page", {user, warning})
    }
}

const createNewJob = (req, res) =>{
    createJob(req.body, req.session.user)
    res.redirect("/jobs")
}

const updateJobPage = (req, res)=>{
    const {id} = req.params;
    let user = req.session.user;
    let jobNumber = id;
    res.render("post-job", {user, jobNumber})
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
    let user = req.session.user || '';
    res.redirect('/jobs')

}


const jobApplicants = (req, res)=>{
    let user = req.session.user || '';
    if(user){
        res.render("applicants", {user})
    }else{
        const warning = 'only recruiter is allowed to access this page, login as recruiter to continue'    
        res.render("404page", {user, warning})
    }
}

const jobApplyApplicants = (req, res) =>{
    const {name, email, number} = req.body;
    const { file } = req;
    const applicant = { name, email, number, resume: `/uploads/${name}-${file.originalname}`};
    createApplicants(applicant, req.params)
    res.redirect('/jobs')
}


const applicantsForm = (req, res) =>{
    let user = req.session.user || '';
    const {id} = req.params
    const jobs = jobsArrayFunc().filter(job=>job.id == id)
    const createrJob = jobs[0].jobCreater;
    if(user == createrJob){
        const apps = applicantsFormData(req.params);
        let count = 1;
        res.render("applicants", {user, apps, count})
    }else if(user){
        const warning = 'Only recruiter who create this job can access this page'
        res.render("404page", {user, warning})
    }
    else{
        const warning = 'only recruiter is allowed to access this page, login as recruiter to continue'
        res.render("404page", {user, warning})
    }
}

const userNotFound = (req, res)=>{
    let user = req.session.user || '';
    const warning = 'user not found pls register'
    res.render("404page", {user, warning})
}

const page404 = (req, res)=>{
    let user = req.session.user || '';
    const warning = '404: Page not Found'
    res.render("404page", {user, warning})
}

export {
    jobsHome,
    loginPage,
    createRecruiter,
    loginRecruiter,
    logoutRecruiter,

    jobListingPage,
    jobDetails,
    newJobPage,
    createNewJob,
    updateJobPage,
    updateJob,
    deleteJob,

    jobApplicants,
    jobApplyApplicants,
    applicantsForm,

    findJob,

    userNotFound,
    page404,

    applicantsArrayRoute,
    recruitersArrayRoute,
    jobsArrayRoute,

}