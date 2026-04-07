import { useState } from "react";

export default function useForm(initialValues, validateFn) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
    return validationErrors;
  };

  const validateField = (name, value) => {
    const fieldError = validateFn({ ...values, [name]: value });

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError[name],
    }));
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    validateField,
  };
}
