/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/store/userSlice";

const App = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) return;
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (error) {
        if (error.status === 401) {
          return navigate("/login");
        } else {
          console.error(error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
