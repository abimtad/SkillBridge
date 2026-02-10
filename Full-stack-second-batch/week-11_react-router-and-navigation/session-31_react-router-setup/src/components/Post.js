import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();

  return (
    <div>
      <h3>Post post id</h3>
      <p>containted in its own page</p>
    </div>
  );
};

export default Post;
