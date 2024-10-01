import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use true for SSL
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendMail = (to, subject, text, html) => {
    html = `${html}<br><br>
    <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; font-family: Arial, sans-serif; color: #555;">
        <img src="https://raw.githubusercontent.com/rahoolsingh/Backend/refs/heads/master/public/assets/logo-white-border.png" alt="Logo" width="200" height="auto" style="display: block; margin: 0;">
        <p style="font-size: 16px; font-weight: bold; margin: 10px 0;">Data Management by DRS Tech</p>
        <p style="font-size: 12px; margin: 5px 0;">&copy; ${new Date().getFullYear()} DRS Tech. All rights reserved.</p>
        
        <div style="margin-top: 20px; font-size: 12px; color: #777;">
            <h4 style="margin: 5px 0;">Terms and Conditions</h4>
            <p style="margin: 5px 0;">By using our services, you agree to comply with our <a href="#" style="color: #1a73e8; text-decoration: none;">Terms and Conditions</a>.</p>
            <p style="margin: 5px 0;">For any inquiries, please contact us at: <a href="mailto:" style="color: #1a73e8; text-decoration: none;">#</a></p>
        </div>

        <p style="font-size: 10px; margin-top: 10px; color: #999;">
            This email and any attachments may contain confidential information. If you are not the intended recipient, please notify the sender and delete this email. 
            <span style="font-size: 8px;">MID: ${Date.now()}</span>
        </p>
    </div>
    `;
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to,
        subject,
        text,
        html,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                reject(error);
            } else {
                console.log("Message sent:", info.messageId);
                resolve(info);
            }
        });
    });
};

export default sendMail;
