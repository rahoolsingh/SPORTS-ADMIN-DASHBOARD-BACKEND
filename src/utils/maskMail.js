const maskMail = (mail) => {
    mail = mail.split("@");
    mail[0] = mail[0].substr(0, 3) + "*****";
    return mail.join("@");
};

const maskMailArray = (mailArray) => {
    return mailArray.map((mail) => maskMail(mail));
};

export default maskMail;
export { maskMailArray, maskMail };
