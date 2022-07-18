import { useState } from "react";
import validateEmail from "../validateEmail";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredEmailIsValid = validateEmail(enteredEmail);

  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const changeInputNameHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const changeInputEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }
    console.log(enteredName);
    console.log(enteredEmail);
    setEnteredName("");
    setEnteredEmail("");

    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses =
    nameInputIsValid && emailInputIsValid
      ? "form-control invalid"
      : "form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          onChange={changeInputNameHandler}
          onBlur={nameInputBlurHandler}
          id="name"
          value={enteredName}
        />
        {nameInputIsValid && (
          <p className="error-text">Please enter a valid name </p>
        )}
      </div>

      <div className={nameInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          onChange={changeInputEmailHandler}
          onBlur={emailInputBlurHandler}
          id="email"
          value={enteredEmail}
        />
        {emailInputIsValid && (
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
