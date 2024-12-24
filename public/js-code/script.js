
/*-------Recruiter Dropdown ------*/


const dropdown = document.getElementById('dropdown-recruiter')
const dropdownContent = document.getElementById('dropdown-cnt-recruiter')

if(dropdown && dropdownContent){
    dropdown.addEventListener('click', ()=>{
        dropdownContent.classList.toggle('visible')
    })
    
}

/*-------Applicant Dropdown ------*/

const dropdownApp = document.getElementById('dropdown-app')
const dropdownContentApp = document.getElementById('dropdown-cnt-app')

if(dropdownApp && dropdownContentApp){
    dropdownApp.addEventListener('click', ()=>{
        dropdownContentApp.classList.toggle('visible')
    })
}



/*------------Signup Form Recruiter--------*/

const signupFormHide = document.getElementById('signup-hide')
const signupFormVisible = document.getElementById('signup-visible')
const signupForm = document.getElementById('signup-form')

if(signupFormVisible && signupFormHide){
    signupFormVisible.addEventListener('click', ()=>{
        signupForm.classList.toggle('hidden')
    })
    
    signupFormHide.addEventListener('click',()=>{
        signupForm.classList.toggle('hidden')
    })
}




/*------------Login Form Recruiter--------*/


const signupToLogin = document.getElementById('signup-login-page')
const loginForm = document.getElementById('login-form')
const loginHides = document.querySelectorAll('.login-hide')

if(signupToLogin && loginHides){
    signupToLogin.addEventListener('click', ()=>{
        signupForm.classList.toggle('hidden')
        loginForm.classList.toggle('hidden')
        
    })
    
    loginHides.forEach(loginHide=>{
        loginHide.addEventListener('click', ()=>{
            loginForm.classList.toggle('hidden')
        })
    })
}



/*------------Login to Signup Form  Recruiter--------*/

const loginSignupPage = document.getElementById('login-signup-page')

if(loginSignupPage){
    loginSignupPage.addEventListener('click', ()=>{
        signupForm.classList.toggle('hidden')
        loginForm.classList.toggle('hidden')
    })
}

/*------------Login to Signup Form Applicants--------*/

const loginSignupPageApp = document.getElementById('login-signup-page-app')

if(loginSignupPageApp){
    loginSignupPageApp.addEventListener('click', ()=>{
        signupFormApp.classList.toggle('hidden')
        loginFormApp.classList.toggle('hidden')
    })
}


/*------------Signup Form Applicant--------*/

const signupFormHideApp = document.getElementById('signup-hide-app')
const signupFormVisibleApp = document.getElementById('signup-app')
const signupFormApp = document.getElementById('signup-form-app')

if(signupFormVisibleApp && signupFormHideApp){
    signupFormVisibleApp.addEventListener('click', ()=>{
        signupFormApp.classList.toggle('hidden')
    })
    
    signupFormHideApp.addEventListener('click',()=>{
        signupFormApp.classList.toggle('hidden')
    })
}

/*------------Login Form Applicants--------*/


const signupToLoginApp = document.getElementById('signup-login-page-app')
const loginFormApp = document.getElementById('login-form-app')
const loginHidesApp = document.querySelectorAll('.login-hide-app')

if(signupToLoginApp && loginHidesApp){
    signupToLoginApp.addEventListener('click', ()=>{
        signupFormApp.classList.toggle('hidden')
        loginFormApp.classList.toggle('hidden')
        
    })
    
    loginHidesApp.forEach(loginHide=>{
        loginHide.addEventListener('click', ()=>{
            loginFormApp.classList.toggle('hidden')
        })
    })
}

/*-----------Job-Seeker Form------------*/

let applyFormData = document.getElementById('apply-form-data');
let ApplyForm = document.getElementById('apply-form');
let closeApplyForm = document.querySelectorAll('.close-apply-form');

    function applyForm(app){

        if(!app){
            return alert('Please login as Applicant!')
        }

        ApplyForm.addEventListener('click', () => {
            applyFormData.classList.remove('hidden');
        });
    
        closeApplyForm.forEach(closeForm => {
            closeForm.addEventListener('click', () => {
                applyFormData.classList.add('hidden'); 
            });
        });
    }



/*--------Update ajob function----------*/

function editJob(job) {
    const isConfirmed = confirm('Are you sure you want to edit this job?')
      if(!isConfirmed){
        return
      }

    let jobJSON = JSON.parse(job);

    // Store job data in localStorage/sessionStorage
    sessionStorage.setItem('jobData', JSON.stringify(jobJSON));

    // Redirect to the new page
    window.location.href = `/update-job-page/${jobJSON.id}`;
}

// On the redirected page, retrieve the data and populate fields
document.addEventListener('DOMContentLoaded', () => {
    const jobData = sessionStorage.getItem('jobData');
    if (jobData) {
        const jobJSON = JSON.parse(jobData);
        data(jobJSON);
    }
});

function data(jobJSON) {
    // Populate form fields
    document.getElementById('company').value = jobJSON.companyName;
    document.getElementById('post-job-location').value = jobJSON.jobLocation; 
    document.getElementById('post-job-salary').value = jobJSON.salary;
    document.getElementById('total-positions').value = jobJSON.numberOfOpenings;
}

 async function updateJob(id){
    let jobCategory = document.getElementById('job-category').value;
    let jobDesignation = document.getElementById('job-designation').value;
    let jobCompany = document.getElementById('company').value;
    let jobLocation = document.getElementById('post-job-location').value;
    let jobSalary = document.getElementById('post-job-salary').value;
    let totalPositions = document.getElementById('total-positions').value;
    let jobAppliedDate = document.getElementById('job-applied-date').value;

    let selectElement = document.getElementById('post-job-skills');
    let jobSkills = Array.from(selectElement.selectedOptions).map(option => option.value);

    const applyDate = new Date(jobAppliedDate)
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    if(!(applyDate >= currentDate)){
        alert(`Invalid date ${jobAppliedDate}. Please enter a valid date`)
        return;
    }

    let updateJobDeta = {
        jobCategory,
        jobDesignation,
        jobCompany,
        jobLocation,
        jobSalary,
        totalPositions,
        jobSkills,
        jobAppliedDate,
    }

    try{
        const response = await fetch(`/update-job/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(updateJobDeta)
        })

        window.location.href = `/job/${id}`;
    }catch(error){
        console.log("Error Occured",error)
    }

}

/*--------Delete a job function----------*/
async function deletedjob(jobId) {
    try {
      const isConfirmed = confirm('Are you sure you want to delete this job?')
      if(!isConfirmed){
        return
      }

    const response =  await fetch(`/job/${jobId}`,{ method: 'DELETE'})
    window.location.href = "/jobs";

    alert('Job deleted Successfully !')

    } catch (error) {
      console.log("Error Occured",error)
    }
  }

 const newJob = document.getElementById('new-job')

 newJob.addEventListener('click', ()=>{
    sessionStorage.clear()
    document.getElementById('company').value = '';
    document.getElementById('post-job-location').value = '';
    document.getElementById('post-job-salary').value = '';
    document.getElementById('total-positions').value = '';
 })

 function newJobPosted(){
    const company = document.getElementById('company').value;
    const jobLocation = document.getElementById('post-job-location').value; 
    const jobSalary = document.getElementById('post-job-salary').value;
    const positions = document.getElementById('total-positions').value;
    const jobApplieDate = document.getElementById('job-applied-date').value

    const selectedDate = new Date(jobApplieDate)
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    if(selectedDate >= currentDate){
        if(company && jobLocation && jobSalary && positions && jobApplieDate){
            alert('Job posted Successfully')
        } else {
            alert('Please enter the correct details')
            return
        }
    } else {
        alert (`Invalid date ${jobApplieDate}. Please Enter a valid date`)
        return
    }
    
 }

/*--------Delete a Applied job function----------*/

async function errorAppliedBtn(appId){

    try{

        if(!appId){
            alert('Access the page please login as Applicant')
            return;
        }

        const response = await fetch(`/appliedJobs/${appId}`, {method: 'GET'})
    }
    catch(error){
        console.log('Error', error)
    }
}


async function deleteAppliedjob(appId, jobId, index) {
    try {
      const isConfirmed = confirm('Are you sure you want to delete this Applied job?')
      if(!isConfirmed){
        return
      }

    const response =  await fetch(`/jobs/${jobId}/applicants/${appId}/index/${index}`,{ method: 'DELETE'})

    window.location.href = `/appliedJobs/${appId}`;
    alert('Application deleted!')

    } catch (error) {
      console.log("Error Occured",error)
    }
  }


  /*-----------Job Seeker update form------------*/

    let updateFormData = document.getElementById('update-form-data');
    let updateAppEdit = document.querySelectorAll('.app-edit');
    let closeUpdateForm = document.querySelectorAll('.close-update-form');

    if(updateFormData && closeUpdateForm){
    
        closeUpdateForm.forEach(closeForm => {
            closeForm.addEventListener('click', () => {
                updateFormData.classList.add('hidden'); 
            });
        });
    }

  let applicantId;
  let appliedIndex; 

  function editAppliedJob(app, aId, index){

    const isConfirmed = confirm('Are you sure you want to update this Applied job?')
    if(!isConfirmed){
        return
    }

    applicantId = aId;
    appliedIndex = index;

    const appData = JSON.parse(app)


    document.getElementById('update-name').value = appData.name;
    document.getElementById('update-email').value = appData.email;
    document.getElementById('update-number').value = Number(appData.number);

    if (updateFormData) {
        updateFormData.classList.remove('hidden');
    }

}

const updateData = document.getElementById('update-data')

if(updateData){

    updateData.addEventListener('submit', async (event)=>{
        event.preventDefault();
    
        const formData = new FormData(updateData)
        let appId = applicantId;
        let appIndex = appliedIndex;

        try{
            const response = await fetch(`/applicants/${appId}/index/${appIndex}`, {
                method:'PUT',
                body: formData
            })
            window.location.href = `/appliedJobs/${appId}`;

            alert('Your details are updated successfully!')

        }catch(err){
            console.log('error', err)
        }
        
    })
}

















