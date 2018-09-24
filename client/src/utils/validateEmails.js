const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidEmails = emails
  .split(",")
  .map(email => email.trim())
  .filter(validateEmail);

  if(invalidEmails.length){
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};

export const validateEmail = email => {
  return !isNullOrEmptyStr(email) && !emailRegExp.test(email);
};

export const isNullOrEmptyStr = (str) =>
    str === null || str === '';
