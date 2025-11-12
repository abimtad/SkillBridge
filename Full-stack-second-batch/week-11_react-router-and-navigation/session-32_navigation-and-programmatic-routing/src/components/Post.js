import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();
  return (
    <div>
      <h3>Post {postId}</h3>
    </div>
  );
};

export default Post;
