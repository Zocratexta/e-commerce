import React from "react";
import axios from "axios";
import "../styles/Register.css";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import IsButtonDisable from "../hooks/IsButtonDisable";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputRegistro, setInputRegistro] = React.useState({});
  const [passwordValidator, setPasswordValidator] = React.useState(true);
  const [emailValidator, setEmailValidator] = React.useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setInputRegistro({ ...inputRegistro, [key]: value });
  };

  const handlerBlur = (e) => {
    if (e.target.name === "email") {
      let result = /(?=.*@)(?=.*\.).{8,}/.test(e.target.value);
      setInputRegistro({ ...inputRegistro, email: e.target.value });
      if (result) {
        setEmailValidator(true);
      } else {
        setEmailValidator(false);
      }
    }
    if (e.target.name === "password") {
      let result = /(^[A-Z])(?=.*\d).{6,}/.test(e.target.value);
      setInputRegistro({ ...inputRegistro, password: e.target.value });
      if (result) {
        setPasswordValidator(true);
      } else {
        setPasswordValidator(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/users/register", inputRegistro).then((res) => {
      dispatch(setUser(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user) history.push("/");
    });
    // .catch((err) => console.log(err))
  };

  return (
    <div className="register">
      <div className="container-fluid" />
      <br />
      <h3>Welcome BookGuru !</h3> <br />
      <p style={{ textAlign: "center" }}>
        Please fill in this form to create an account
      </p>
      <form className="formulario container-fluid" onSubmit={handleSubmit}>
        <label>
          Name <br />
          <input
            className="formulario container-fluid"
            type="text"
            name="name"
            placeholder=""
            required
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name <br />
          <input
            className="formulario container-fluid"
            type="text"
            placeholder=""
            required
            name="lastname"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address <br />
          <input
            className="formulario container-fluid"
            type="text"
            placeholder=""
            required
            name="address"
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Username <br />
          <input
            className="formulario container-fluid"
            type="text"
            placeholder=""
            required
            name="username"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          E-mail <br />
          <input
            className="formulario container-fluid"
            type="text"
            placeholder=""
            required
            name="email"
            onBlur={handlerBlur}
          />
        </label>
        <div>
          {emailValidator
            ? null
            : ["danger"].map((variant, idx) => (
                <Alert key={idx} variant={variant}>
                  "Wrong e-mail"
                </Alert>
              ))}
        </div>
        <label>
          Password <br />
          <input
            className="formulario container-fluid"
            type="password"
            placeholder=""
            required
            name="password"
            onBlur={handlerBlur}
          />
        </label>
        <div>
          {passwordValidator
            ? null
            : ["danger"].map((variant, idx) => (
                <Alert key={idx} variant={variant}>
                  "Password must contain 8 characters, 1 number and 1 capital
                  letter"
                </Alert>
              ))}
        </div>
        <br />
        <h6>
          By creating an account you agree to our Terms & Privacy
          <input required type="checkbox" />
        </h6>
        <br />
        <button
          className="botonRegister"
          disabled={IsButtonDisable(inputRegistro)}
        >
          Submit
        </button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default Register;
