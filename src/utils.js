import jwt from "jsonwebtoken";

export const generateSecret = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const sendMail = (email) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail.send(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: process.env.ADMIN_EMAIL,
    to: adress,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `안녕하세요! 회원가입 완료를 위한 비밀코드는 <strong>${secret}</strong> 입니다.<br/> 앱 또는 웹에서 복사붙여넣기하여 회원가입을 완료해주세요`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
