import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/store/userSlice";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        return navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="flex-1">
        <div className="flex">
          <img
            className="w-8"
            src="https://img.icons8.com/ios/50/FFFFFF/source-code.png"
            alt="source-code"
          />
          <NavLink to={"/"} className="btn btn-ghost text-xl w-28 items-center">
            DevTinder
          </NavLink>
        </div>
      </div>
      {user && (
        <div className="flex gap-5 items-center">
          <p>{user?.firstName + " " + user?.lastName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/profile"} className="justify-between">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/connections"}>Connections</NavLink>
              </li>
              <li>
                <NavLink to={"/requests"}>Requests</NavLink>
              </li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
