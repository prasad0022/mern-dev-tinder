import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  if (isLogin && user) navigate("/");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); // ben@gmail.com
  const [password, setPassword] = useState(""); // Benten@123

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setError("");
        dispatch(addUser(res.data.data));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (res.status === 201) {
        setError("");
        dispatch(addUser(res.data.data));
        navigate("/profile");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center mb-2 text-2xl">
            Dev {isLogin ? "Login" : "SignUp"}
          </h2>
          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">First Name</legend>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input validator"
                  type="text"
                  name="firstName"
                  required
                  value={firstName}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Last Name</legend>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  className="input validator"
                  type="text"
                  name="lastName"
                  required
                  value={lastName}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Email</legend>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input validator"
              type="email"
              name="email"
              required
              placeholder="mail@site.com"
              value={email}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Password</legend>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="input validator"
              required
              placeholder="Password"
              value={password}
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-3">
            <button
              onClick={isLogin ? handleLogin : handleSignUp}
              className="btn btn-primary"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto pt-3 cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setIsLogin((val) => !val)}
          >
            {isLogin ? "New user? Sign up here" : "Existing user? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
