import React from "react";

const DevCard = ({ dev, type }) => {
  return (
    <div className="flex justify-center mt-5 p-3">
      <div className="card bg-base-200 w-80 shadow-sm">
        <figure>
          <img
            className="w-full h-full"
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
              <button className="btn btn-soft btn-error">Reject</button>
              <button className="btn btn-soft btn-success">Connect</button>
            </div>
          )}
          {type === "request" && (
            <div className="card-actions justify-center mt-4 gap-8">
              <button className="btn btn-soft btn-error">Reject</button>
              <button className="btn btn-soft btn-success">Accept</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevCard;
