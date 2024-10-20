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

const sendMail = async (to, subject, text, html) => {
    // Validate email and other inputs
    if (!to || !subject || !html) {
        console.error(
            "Invalid parameters: 'to', 'subject', and 'html' are required."
        );
        throw new Error("Invalid parameters for sending email.");
    }

    // Construct the footer HTML
    html += `<br><br>
    <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; font-family: Arial, sans-serif; color: #555;">
        <img src="https://res.cloudinary.com/dwiouayh7/image/upload/v1728839717/My%20Brand/veerRajpoot_mplaff.png" alt="Logo" width="200" height="auto" style="display: block; margin: 0;">
        <p style="font-size: 16px; font-weight: bold; margin: 0;">Data Management by Veer Rajpoot</p>
        <p style="font-size: 12px; margin: 5px 0;">&copy; ${new Date().getFullYear()} Veer Rajpoot. All rights reserved.</p>
        
        <div style="margin-top: 20px; font-size: 12px; color: #777;">
            <h4 style="margin: 5px 0;">Terms and Conditions</h4>
            <p style="margin: 5px 0;">By using our services, you agree to comply with our <a href="#" style="color: #1a73e8; text-decoration: none;">Terms and Conditions</a>.</p>
            <p style="margin: 5px 0;">For any inquiries, please contact us at: <a href="mailto:" style="color: #1a73e8; text-decoration: none;">#</a></p>
        </div>

        <p style="font-size: 10px; margin-top: 10px; color: #999;">
            This email and any attachments may contain confidential information. If you are not the intended recipient, please notify the sender and delete this email. 
            <span style="font-size: 8px;">MID: ${Date.now()}</span>
        </p>
    </div>`;

    const mailOptions = {
        from: {
            name: "Veer Rajpoot",
            address: process.env.SMTP_EMAIL,
        },
        to,
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent:", info.messageId);
        return info; // Return the info on success
    } catch (error) {
        // Log error without crashing the server
        console.error("Error sending email:", error);
        // You could also consider throwing the error here if you want to handle it at a higher level
        throw new Error("Failed to send email.");
    }
};

export default sendMail;
