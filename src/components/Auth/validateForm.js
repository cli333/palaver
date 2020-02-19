import { useState } from "react";

const ValidateForm = initialState => {
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    // read more about synthetic events!!
    e.persist();
    setFormValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // do some validation
    // set some errors
    setSubmitted(true);
  }

  return {
    handleChange,
    handleSubmit,
    formValues,
    submitted
  };
};

export default ValidateForm;
