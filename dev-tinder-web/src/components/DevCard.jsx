import React from "react";

const DevCard = ({ dev }) => {
  return (
    <div className="flex justify-center mt-5 p-3">
      <div className="card bg-base-200 w-80 shadow-sm">
        <figure>
          <img className="w-full h-full" src={dev.photoURL} alt="dev-photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {dev.firstName} {dev.lastName}
          </h2>
          <p>{dev.about}</p>
          <div className="card-actions justify-center mt-4 gap-8">
            <button className="btn btn-soft btn-error">Reject</button>
            <button className="btn btn-soft btn-success">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevCard;
