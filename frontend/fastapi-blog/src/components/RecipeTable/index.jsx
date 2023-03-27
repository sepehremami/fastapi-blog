import Post from "../Post";
import React, {useState} from "react";
import PopupModal from "../Modal/PopupModal";
import FormInput from "../FormInput/FormInput";

const RecipeTable = ({blogs}) => {

  	const [postInfoModal, setPostInfoModal] = useState(false)

    return (
      <>
        <div className="grid sections-list">
			<div>{(blogs.map((blog)=> {}))}</div>
          {blogs.length && (
              blogs.map((blog) => (
				<Post
				  	showPostInfoModal={() => setPostInfoModal(blog)}
					key={blog.id}
					blog={blog} />
				  ))
				)}
				  
		  
          {!blogs.length && (
              <p>No recipes found!</p>
          )}
        </div>
      </>
    )
}

export default RecipeTable;