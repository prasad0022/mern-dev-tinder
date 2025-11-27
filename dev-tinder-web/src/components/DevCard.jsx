import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/store/requestsSlice";
import { removeFeedUser } from "../utils/store/feedSlice";

const DevCard = ({ dev, type }) => {
  const dispatch = useDispatch();

  const sendRequest = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${dev?._id}`,
        {},
        { withCredentials: true }
      );
      if (res) {
        dispatch(removeFeedUser(dev?._id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const reviewRequests = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${dev?._id}`,
        {},
        { withCredentials: true }
      );
      if (res) {
        dispatch(removeRequest(dev?._id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-5 p-3">
      <div className="card bg-base-200 w-80 shadow-sm">
        <figure>
          <img
            className="w-full h-80"
            src={type === "request" ? dev?.fromUserId?.photoURL : dev?.photoURL}
            alt="dev-photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {type === "request" ? dev?.fromUserId?.firstName : dev?.firstName}{" "}
            {type === "request" ? dev?.fromUserId?.lastName : dev?.lastName}
          </h2>
          <p>{type === "request" ? dev?.fromUserId?.about : dev?.about}</p>
          {type === "profile" && (
            <>
              <p>Age: {dev?.age}</p>
              <p>Gender: {dev?.gender}</p>
              <p>Skills: {dev?.skills?.join(", ")}</p>
            </>
          )}
          {type === "feed" && (
            <div className="card-actions justify-center mt-4 gap-8">
              <button
                className="btn btn-soft btn-error"
                onClick={() => sendRequest("ignored")}
              >
                Reject
              </button>
              <button
                className="btn btn-soft btn-success"
                onClick={() => sendRequest("interested")}
              >
                Connect
              </button>
            </div>
          )}
          {type === "request" && (
            <div className="card-actions justify-center mt-4 gap-8">
              <button
                className="btn btn-soft btn-error"
                onClick={() => reviewRequests("rejected")}
              >
                Reject
              </button>
              <button
                className="btn btn-soft btn-success"
                onClick={() => reviewRequests("accepted")}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevCard;
