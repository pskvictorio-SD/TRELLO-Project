import { useState, useEffect } from "react";

function useValidateForm(input1, input2, input3) {
  const [data, setData] = useState([]);
  const name = input1;
  const email = input2;
  const password = input3;

  const validateName = () => {
    if (!name) {
      const error = {
        message: "Este campo es obligatorio",
        field: "name",
        ok: false,
      };
      return setData((prevData) => [...prevData, error]);
    } else if (name.length < 4) {
      const error = {
        message: "El nombre debe tener minimo 4 caracteres",
        field: "name",
        ok: false,
      };
      return setData((prevData) => [...prevData, error]);
    }
    return setData([]);
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      const error = {
        message: "Este campo es obligatorio",
        field: "email",
        ok: false,
      };
      return setData((prevData) => [...prevData, error]);
    } else if (!emailRegex.test(email)) {
      const error = {
        message: "Este email es invalido",
        field: "email",
        ok: false,
      };
      return setData((prevData) => [...prevData, error]);
    }
    return setData([]);
  };
  const validatePassword = () => {
    if (!password) {
      const error = {
        message: "Este Campo es obligatorio",
        field: "password",
        ok: false,
      };
      return setData((prevData) => [...prevData, error]);
    } else if (password.length < 6) {
      const error = {
        message: "La contraseña debe tener minimo 6 caracteres",
        field: "password",
        ok: false,
      };
      return setData((prevData) => [...prevData, error]);
    }
    return setData([]);
  };

  return { data, validateEmail, validateName, validatePassword };
}

export default useValidateForm;
