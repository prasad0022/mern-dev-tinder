import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/store/connectionsSlice";
import DevCard from "./DevCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    const fetchConnections = async () => {
      if (connections) return;
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res?.data?.data));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connections]);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="text-center mt-10 text-2xl">No connections found 😔</h1>
    );

  return (
    connections && (
      <>
        <h1 className="text-center mt-5 text-2xl">My connections</h1>
        <div className="flex justify-center">
          {connections.map((dev) => (
            <DevCard key={dev._id} dev={dev} type={"profile"} />
          ))}
        </div>
      </>
    )
  );
};

export default Connections;
