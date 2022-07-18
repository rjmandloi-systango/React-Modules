import useInput from "../hooks/use-input";

const SimpleInput = () => {
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
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control ";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          id="name"
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Please enter a valid name </p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          id="email"
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email </p>
        )}
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

export default SimpleInput;
