import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    const { email, password } = credentials;
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        navigate("/feed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-15">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center mb-2 text-2xl">Dev Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Email</legend>
            <input
              onChange={handleChange}
              className="input validator"
              type="email"
              name="email"
              required
              placeholder="mail@site.com"
              value={credentials.email}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Password</legend>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="input validator"
              required
              placeholder="Password"
              value={credentials.password}
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
            <p className="validator-hint">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>
          </fieldset>
          <div className="card-actions justify-center">
            <button onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
