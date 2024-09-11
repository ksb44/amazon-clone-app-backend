import nodemailer from 'nodemailer'
async function sendVerificationEmail(email,token){

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        secure:true,
        port:465,
        auth: {
          user: '12as1913162@gmail.com', 
          pass: 'cggm mbqq qott upur'   
        }
      });
    const mailOptions={
        from: 'amazon.com',
        to:email,
        subject:'Verify your email',
        text:`Please click the following link to verify your email : http://localhost:3000/api/email/verify/${token}`
    }
     
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log('error sending email',error)
    }
    }

export default sendVerificationEmail