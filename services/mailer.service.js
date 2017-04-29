var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "grishab8@gmail.com",
        pass: "09897635524"
    }
});

exports = smtpTransport;