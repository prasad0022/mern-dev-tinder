import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/store/requestsSlice";
import DevCard from "./DevCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log(requests);

  useEffect(() => {
    const fetchConnections = async () => {
      if (requests) return;
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        dispatch(addRequests(res?.data?.data));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests || requests.length === 0)
    return <h1 className="text-center mt-10 text-2xl">No pending requests</h1>;

  return (
    requests && (
      <>
        <h1 className="text-center mt-5 text-2xl">Pending requests</h1>
        <div className="flex justify-center">
          {requests.map((dev) => (
            <DevCard key={dev._id} dev={dev} type={"request"} />
          ))}
        </div>
      </>
    )
  );
};

export default Requests;
