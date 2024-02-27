import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", // replace with your email provider's SMTP s  erver
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "ddcuteyeunndethuong@gmail.com",
    pass: "rtgw ugrg rddh izju", // replace with your password
  },
});

// export const mailOptions = {
//   from: {
//     name: "money minder lover",
//     address: process.env.ACCOUNT,
//   }, // sender address
//   to: ["duong1906ltv@gmail.com", "neihnsabig@gmail.com"], // list of receivers
//   subject: "Hello", // Subject line
//   text: "Hello world", // plain text body
//   html: "<b>Hello world</b>", // html body
// };

export const sendEmail = async (transporter, mailOptions) => {
  try {
    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};
