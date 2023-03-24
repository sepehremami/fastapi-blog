import Post from "../Recipe";
import React, {useState} from "react";
import PopupModal from "../Modal/PopupModal";
import FormInput from "../FormInput/FormInput";

const RecipeTable = ({blogs}) => {

  	const [postInfoModal, setPostInfoModal] = useState(false)

    return (
      <>
        <div className="sections-list">
			<div>{(blogs.map((blog) => (console.log(blog))))}</div>
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
        {postInfoModal && <PopupModal
						modalTitle={"Recipe Info"}
						onCloseBtnPress={() => {
						setPostInfoModal(false);
						}}
					>
						<div className="mt-4 text-left">
							<form className="mt-5">
								<div 
									disabled
									type={"text"}
									name={"label"}
									label={"Label"}
									value={postInfoModal?.label}
								/>
								<FormInput
									disabled
									type={"text"}
									name={"url"}
									label={"Url"}
									value={postInfoModal?.url}
								/>
								<FormInput
									disabled
									type={"text"}
									name={"source"}
									label={"Source"}
									value={postInfoModal?.source}
								/>
							</form>
						</div>
					</PopupModal>}
      </>
    )
}

export default RecipeTable;