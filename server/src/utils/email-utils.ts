import nodemailer from 'nodemailer'

const sendPasswordResetEmail = async (recipientEmail: string, resetToken: string): Promise<void> => {
    // Replace the placeholders with your actual email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: http://life-care/reset-password/${resetToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to: ${recipientEmail}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
};

export { sendPasswordResetEmail }