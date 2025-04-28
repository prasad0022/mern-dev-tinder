import React from "react";

const Feed = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="card bg-base-200 w-80 shadow-sm">
        <figure>
          <img
            className="w-full h-full"
            src="https://avatars.githubusercontent.com/u/124147305?s=400&u=3837c871d6fae6f515249fd6fab0c78120372adb&v=4"
            alt="dev-photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Prasad Khose</h2>
          <p>This is default a user.</p>
          <div className="card-actions justify-center mt-4 gap-8">
            <button className="btn btn-soft btn-error">Reject</button>
            <button className="btn btn-soft btn-success">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
