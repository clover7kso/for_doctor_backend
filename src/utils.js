import jwt from "jsonwebtoken";

export const generateSecret = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
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

export const sendPasswordMail = (adress, password) => {
  const email = {
    from: process.env.ADMIN_EMAIL,
    to: adress,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `회원님의 비밀번호는 <strong>${password}</strong> 입니다.<br/>`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

export const timeFromToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};
