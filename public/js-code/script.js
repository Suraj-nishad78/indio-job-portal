
/*-------Navbar Dropdown ------*/


const dropdown = document.getElementById('dropdown')
const dropdownContent = document.getElementById('dropdown-cnt')

if(dropdown && dropdownContent){
    dropdown.addEventListener('click', ()=>{
        dropdownContent.classList.toggle('visible')
    })
}


/*------------Signup Form--------*/

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



/*------------Login Form--------*/


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



/*------------Login to Signup Form--------*/

const loginSignupPage = document.getElementById('login-signup-page')

if(loginSignupPage){
    loginSignupPage.addEventListener('click', ()=>{
        signupForm.classList.toggle('hidden')
        loginForm.classList.toggle('hidden')
    })
}


/*-----------Job-Seeker Form------------*/

let applyFormData = document.getElementById('apply-form-data');
let ApplyForm = document.getElementById('apply-form');
let closeApplyForm = document.querySelectorAll('.close-apply-form');

if (ApplyForm && applyFormData) {
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
            method:'PATCH',
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
    if(company && jobLocation && jobSalary && positions){
        alert('Job posted Successfully')
    } else {
        alert('Please enter the correct details')
    }
 }

 













