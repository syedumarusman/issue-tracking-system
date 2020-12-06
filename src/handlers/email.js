  
const path = require('path');
const nodemailer = require('nodemailer');

const sendEmail = async (user) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "issuetracker2020@gmail.com", // generated ethereal user
            pass: "IncidentTracker2020!", // generated ethereal password
        },
    });

    imagePath = path.normalize(__dirname + '../../../assets/reset_password.png');
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Support Staff" <issuetracker2020@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Password Reset Notification", // Subject line
        html: `<img src="cid:unique@kreata.ee"/><br><br>
        Hello ${user.name},<br><br>
        A request has been received to change the password. So, this is you new password: <strong>${user.password}</strong>.<br>
        Login to Issue Tracking System using the new password and then change it with your own password.<br><br>
        Thank you!<br>
        Support Team`,
        attachments: [{
            filename: 'reset_password.png',
            path: imagePath,
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = sendEmail;