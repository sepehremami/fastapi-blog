import React from "react";
import FastAPIClient from "../../client";
import config from "../../config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const client = new FastAPIClient(config);

const Post = ({ blog,  showPostInfoModal }) => {
	const [post, setPost] = useState(blog);
	const [loading, setLoading] = useState(false);
	

	const handleDelete = (id) => {
		client.deletePost(id)
		setPost(null)
      } 


	return (
		post && (

			<>
			<Link to={`/posts/${post.id}`} >
				<div
					
					// onClick={(e) => {showPostInfoModal() ; e.stopPropagation()}} 
					className="flex flex-wrap items-end justify-between w-full transition duration-500 ease-in-out transform bg-black border-2 border-gray-600 rounded-lg hover:border-white mb-3"
				>
					
					<div className="w-full xl:w-1/4 md:w-1/4">
						<div className="relative flex flex-col h-full p-8 ">
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								{post?.title}
							</h2>
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								{post?.id}
							</h2>
							<div className="flex flex-col md:flex-row">
								<button
								onClick={() => handleDelete(post.id)}
								className="delete bg-red-300">
								delete post
								</button>
							</div>
						</div>
					</div>
				</div>
			</Link>
			</>
		)
	);
};

export default Post;
