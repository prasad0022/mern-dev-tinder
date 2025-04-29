import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="flex-1">
        <div className="flex">
          <img
            className="w-8"
            src="https://img.icons8.com/ios/50/FFFFFF/source-code.png"
            alt="source-code"
          />
          <a className="btn btn-ghost text-xl w-28 items-center">DevTinder</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <NavLink to={"/login"}>
                  <p
                    onClick={async () => {
                      try {
                        const res = await axios.post(
                          "http://localhost:5000/logout"
                        );
                        if (res.status === 200) {
                          dispatch(removeUser());
                          navigate("/login");
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    Logout
                  </p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
