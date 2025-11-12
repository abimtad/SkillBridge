import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Posts = () => {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        <li>
          <Link to="/posts/1">Post 1</Link>
        </li>
        <li>
          <Link to="/posts/2">Post 2</Link>
        </li>
        <li>
          <Link to="/posts/3">Post 3</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Posts;
