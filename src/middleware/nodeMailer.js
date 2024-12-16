import nodeMailer from "nodemailer"

const sendApplicantMail = async (req, res, next) =>{
    const {name, email} = req.body;
    let transporter = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'codingninjas2k16@gmail.com',
            pass:'slwvvlczduktvhdj'
        }
    })

    let mailOptions = {
        from:'codingninjas2k16@gmail.com',
        to:email,
        subject:'Application Received',
        text:`Dear ${name},\n\nThank you for applying for the job. We have received your application.\n\nBest Regards,\nCompany Team.`,
    }

    try{
        await transporter.sendMail(mailOptions);
        next()
    }catch(err){
        console.log('Error occured while sending mail: ', err)
    }

}

export { sendApplicantMail}