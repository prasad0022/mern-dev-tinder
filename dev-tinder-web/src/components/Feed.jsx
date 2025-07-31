import React from "react";
import { useEffect } from "react";
import DevCard from "./DevCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/store/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return;
      try {
        const res = await axios.get(`${BASE_URL}/user/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (error) {
        console.error(error);
      }
    };

    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center flex-wrap">
      {feed &&
        feed.map((dev) => <DevCard key={dev._id} dev={dev} type={"feed"} />)}
    </div>
  );
};

export default Feed;
