import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  const validateName = (value) => {
    return value.trim() !== "";
  };

  const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
  } = useInput(validateName);

  const {
    value: enteredLName,
    hasError: lNameInputHasError,
    valueChangeHandler: lNameChangedHandler,
    inputBlurHandler: lNameBlurHandler,
    isValid: enteredLNameIsValid,
    reset: resetLNameInput,
  } = useInput(validateName);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;

  if (enteredNameIsValid && enteredLNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid && !enteredEmailIsValid && !enteredLNameIsValid) {
      return;
    }
    resetNameInput();
    resetEmailInput();
    resetLNameInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control ";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control ";

  const lNameInputClasses = lNameInputHasError
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            type="text"
            id="name"
            value={enteredName}
          />
          {nameInputHasError && <p>Please enter valid first name</p>}
        </div>
        <div className={lNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            onChange={lNameChangedHandler}
            onBlur={lNameBlurHandler}
            type="text"
            id="name"
            value={enteredLName}
          />
          {lNameInputHasError && <p>Please enter valid last name</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          type="text"
          id="name"
          value={enteredEmail}
        />
        {emailInputHasError && <p>Please enter valid email</p>}
      </div>
      <div className="form-actions">
        <button
          disabled={!formIsValid}
          style={{ backgroundColor: !formIsValid ? "grey" : "orange" }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
