import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FastAPIClient from "../../../client";
import config from "../../../config";
import DashboardHeader from "../../../components/DashboardHeader";
import Footer from "../../../components/Footer";

function getDateParts(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const string = `${year}/${month}/${day} ${hour}:${minute}`;
    return string
  }


const client = new FastAPIClient(config)

function PostView({ match }) {
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const {id} = useParams();
  
  
  
  useEffect(() => {
    client
      .getPost(id)
      .then((response) => {
        setProduct(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    client
      .leaveComment(id, 0, comment)
      .then((response) => {
        setComments([...comments, response.data]);
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="">
    <DashboardHeader />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {product ? (
        <div className="mt-8 p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-lg font-bold text-gray-800">{product.title}</h1>
          <div className="grid grid-cols-2 my-3">
            <div className="font-medium text-gray-500">Category ID:</div>
            <div>{product.category_id}</div>
          </div>
          <div className="grid grid-cols-2 my-3">
            <div className="font-medium text-gray-500">Created at:</div>
            <div>{new Date(product.created_at).toLocaleString()}</div>
          </div>
          <div className="grid grid-cols-2 my-3">
            <div className="font-medium text-gray-500">User ID:</div>
            
          <div>{product.user_id}</div>
          </div>
          <p className="text-base text-gray-600">{product.description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <div className="mt-8 p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold text-gray-800">Add a Comment</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <textarea
              className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              placeholder="Leave a comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Comment
          </button>
        </form>
      </div>

      <div className="mt-8 p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold text-gray-800">Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="mt-4 bg-white shadow-md rounded-lg">
            <div className="p-3">
              <p className="text-base text-gray-600">{comment.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default PostView;
