import { useEffect, useState } from "react";

const SimpleInput = (props) => {
  // const enteredNameRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
  // const [formIsValid, setFormIsValid] = useState(false);
  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const changeInputNameHandler = (event) => {
    setEnteredName(event.target.value);
    // console.log(event.target.value);
    // if (event.target.value.trim().length !== "") {
    //   setEnteredNameIsValid(true);
    // }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    // if (enteredName.trim().length === 0) {
    //   setEnteredNameIsValid(false);
    //   return;
    // }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    if (!enteredNameIsValid) {
      return;
    }
    console.log(enteredName);
    // console.log(enteredNameRef.current.value);
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsValid
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          // ref={enteredNameRef}
          onChange={changeInputNameHandler}
          onBlur={nameInputBlurHandler}
          id="name"
          value={enteredName}
        />
        {nameInputIsValid && (
          <p className="error-text">Please enter a valid name </p>
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
