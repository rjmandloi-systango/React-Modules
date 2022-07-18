const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default validateEmail;
//   console.log(validateEmail('rj=gmi.lin'))
