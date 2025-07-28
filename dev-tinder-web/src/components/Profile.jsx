import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const nevigate = useNavigate();
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img src={user?.photoURL} className="w-70 h-80 rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
          <p className="py-1 pt-2">Gender: {user?.gender}</p>
          <p className="py-1">Age: {user?.age}</p>
          <p className="py-1">About: {user?.about}</p>
          <p className="py-1">Skills: {user?.skills.join(", ")}</p>
          <button
            onClick={() => nevigate("/edit/profile")}
            className="mt-4 btn btn-primary"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
