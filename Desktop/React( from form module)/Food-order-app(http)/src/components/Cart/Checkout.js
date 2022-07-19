import { useRef, useState } from "react";
import classes from "./checkout.module.css";

const isValidString = (string) => {
  return string.trim().length > 0;
};

const isValidPostal = (postalCode) => {
  return postalCode.trim().length === 6;
};

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = isValidString(enteredName);
    const enteredStreetIsValid = isValidString(enteredStreet);
    const enteredPostalIsValid = isValidPostal(enteredPostal);
    const enteredCityIsValid = isValidString(enteredCity);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }
    const userData={
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postal:enteredPostal
    }
    props.onSubmit(userData);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formValidity.name && classes.invalid }`}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formValidity.name && <p>Please enter valid name</p>}
      </div>
      <div className={`${classes.control} ${!formValidity.street && classes.invalid }`}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formValidity.street && <p>Please enter valid Street</p>}
      </div>
      <div className={`${classes.control} ${!formValidity.postal && classes.invalid }`}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formValidity.postal && <p>Please enter valid postal code</p>}
      </div>
      <div className={`${classes.control} ${!formValidity.city && classes.invalid }`}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formValidity.city && <p>Please enter valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
