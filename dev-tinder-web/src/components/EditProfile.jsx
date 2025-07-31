import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DevCard from "./DevCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/store/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoURL: user.photoURL,
    age: user.age,
    gender: user.gender,
    about: user.about,
    skills: user.skills,
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, profile, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    user && (
      <div className="flex justify-center m-5 gap-15">
        <div className="card card-border bg-base-200 w-120">
          <h2 className="card-title justify-center mt-2 text-2xl">
            Update Profile
          </h2>
          <div className="card-body pt-2">
            <fieldset className="fieldset">
              <legend className="text-xl">First Name</legend>
              <input
                type="text"
                name="firstName"
                className="outline-gray-800 outline-1 p-1 text-md"
                value={profile.firstName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="text-xl">Last Name</legend>
              <input
                type="text"
                name="lastName"
                className="outline-gray-800 outline-1 p-1 text-md"
                value={profile.lastName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="text-xl">Photo URL</legend>
              <input
                type="text"
                name="photoURL"
                className="outline-gray-800 outline-1 p-1 text-md"
                value={profile.photoURL}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="text-xl">Age</legend>
              <input
                type="text"
                name="age"
                className="outline-gray-800 outline-1 p-1 text-md"
                value={profile.age}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="text-xl">Gender</legend>
              <input
                type="text"
                name="gender"
                className="outline-gray-800 outline-1 p-1 text-md"
                value={profile.gender}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="text-xl">About</legend>
              <input
                type="text"
                name="about"
                className="outline-gray-800 outline-1 p-1 text-md"
                value={profile.about}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="text-xl">Skills</legend>
              <input
                type="text"
                name="skills"
                className="outline-gray-800 outline-1 p-1 text-md"
                value={profile.skills}
                onChange={handleChange}
              />
            </fieldset>
            {error && <p className="text-red-600">{error}</p>}
            <div className="card-actions justify-center">
              <button onClick={handleSubmit} className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title justify-center mb-2 text-2xl">Preview</h2>
          <DevCard dev={profile} type={"profile"} />
        </div>
      </div>
    )
  );
};

export default EditProfile;
