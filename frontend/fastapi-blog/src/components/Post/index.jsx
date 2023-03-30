import React from "react";
import FastAPIClient from "../../client";
import config from "../../config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import * as moment from "moment";


const client = new FastAPIClient(config);
const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson)


const Post = ({ blog, showPostInfoModal }) => {
  const [post, setPost] = useState(blog);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      const decodedAccessToken = jwtDecode(token.access_token);
      if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleDelete = (event, id) => {
    client.deletePost(id);
    setPost(null);
  };

  let deleteButton;
  const buttonStyle =
    "bg-red-500 px-4 py-2 leading-none rounded-xl text-white hover:bg-red-700 hover:text-bg-black";

  if (isLoggedIn && post.user_id===user.id) {
    deleteButton= (
      <button
        className={buttonStyle}
        onClick={(e) => {
          handleDelete(e, post.id);
        }}
      >
        Delete
      </button>
    );
  }

  return (
    post && (
      <>
        <div
          // onClick={(e) => {showPostInfoModal() ; e.stopPropagation()}}
          className="flex flex-wrap items-end w-full transition duration-500 ease-in-out transform bg-[#1a2d55] border-2 border-gray-600 rounded-lg hover:border-white mb-3"
        >
          <div className="w-full xl:w-1/4 md:w-1/4">
            <div className="relative flex flex-col h-full p-8 ">
              <h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
                {post?.title}
              </h2>
              <h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
                {post?.id}
                
              </h2>
            </div>
          </div>

          <div className="m-10">
            <Link
			className="bg-[#255cd4]  hover:bg-[#2852ad] text-white rounded-default p-2 rounded-xl " 
              to={`/posts/${post.id}`}
            >
              View Post
            </Link>
          </div>
      <div
		  
      className="m-10"
		  >{deleteButton}</div>
        </div>
      </>
    )
  );
};

export default Post;
