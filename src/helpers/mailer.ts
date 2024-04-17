import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from  'bcryptjs';
export const sendMail = async({email,emailType,userId}:any)=> {
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(),8)
      const expireIn = 3600 * 1000 ; // 1 hour in milliseconds
      if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId ,{
          verifyToken: hashedToken,
          verifyTokenExpiry  : Date.now()+ expireIn
        } )
      }else if (emailType==="RESET"){
        await  User.findByIdAndUpdate(userId ,{
          resetPasswordToken: hashedToken,
          resetPasswordTokenExpiry :Date.now() + expireIn 
          }
        )
      }
        
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2e6a490e845a47",
          pass: "8a532d2272be55"
        }
      });

          const emailResponse = await transport.sendMail({
            from: 'dhaval@nextjs.auth',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your mail": "Reset your password", 
            html: `<P>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
            to ${emailType == "VERIFY" ? "verify your email" : "reset your password"}
            or Copy and Past link below in your browser.
          <br/>
          ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          </P>`,
          });
          return emailResponse;

    } catch (error) {
        console.log("Error occured while sending Email", error);
        throw error;
        
    }
}
