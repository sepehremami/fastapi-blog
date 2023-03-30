import DashboardHeader from "../DashboardHeader";
import Footer from "../Footer";
import SideBar from "../SideBar";
import {useState} from "react";
import MyPosts from "./index";
import FastAPIClient from "../../client";
import config from "../../config";
import {Link} from "react-router-dom";
import { CreateBlog } from "../../pages/CreatePost/createPost";

const  client = new FastAPIClient(config)

const myPosts = ({onBlogCreated}) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const [title, setTitle] = useState('');

    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setloading] = useState(false);
    const [createdPosts, setCreatedPosts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        const response = await client.createPost(title, body, 1).then();
        if (response.status === 201) {
            setloading(false);
            setMessage('Blog post created successfully!');
            onBlogCreated(response.data);
            setTitle('');
            setBody('');
        } else {
            setMessage('Error creating the blog post.');
        }
    }



    return(
      <div className={"font-body bg-slate-200 dark:bg-gradient-to-b dark:from-secondary-1 dark:to-primary"}>

          <div id="create_post" className={`text-left absolute ml-20p mt-40 w-full max-w-6xl  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ${toggleMenu ? "block" : "hidden"}`}>
              <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                  <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                  <div>
                      <label htmlFor="title"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                      <input type="text"
                             id="title"
                             value={title}
                             onChange={(e) => setTitle(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                             placeholder="Subject"
                             required/>
                  </div>
                  <div>
                      <label htmlFor="article"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article</label>
                      <textarea  id="body"
                                 value={body}
                                 onChange={(e) => setBody(e.target.value)}
                                 rows="8"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Article" required></textarea>
                  </div>

                  <label className="block mb-2 text-sm font-medium font-medium text-gray-900 dark:text-white"
                         htmlFor="user_avatar">Upload Pictures</label>
                  <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help" id="user_avatar" type="file" />



                      <label htmlFor="website-admin"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <div className="flex">
                          <span
                              className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            @
                          </span>
                          <input type="text" id="website-admin"
                                 className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 placeholder="Category"/>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                          <button type="submit"
                                  disabled={loading}
                                  className="col-span-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                              {loading ? 'Creating...' : 'Create Post'}
                          </button>

                          <button id="cancel"  onClick={() => setToggleMenu(!toggleMenu)}
                                  className="col-span-1 w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel
                          </button>
                      </div>
              </form>

          </div>

          <DashboardHeader/>

          <main className="grid grid-cols-5 ">
              <SideBar menu={"my-posts"}/>
              <div id="cards" className="col-span-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
                </div>
                   < CreateBlog/>
              </div>

          </main>

          <Footer/>
      </div>
  )
}

const UserPage = () => {
    const [showCreateBlog, setShowCreateBlog] = useState(false);
    const [createdPosts, setCreatedPosts] = useState([]);

    const handleToggleCreateBlog = () => {
        setShowCreateBlog(!showCreateBlog);
    };

    const handleBlogCreated = (newPost) => {

        setCreatedPosts([...createdPosts, newPost]);
    };

    return (
        <div>
            <button onClick={handleToggleCreateBlog} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
                {showCreateBlog ? 'Hide' : 'Create Blog Post'}
            </button>
            {showCreateBlog && <MyPosts onBlogCreated={handleBlogCreated} />}
            {createdPosts.length > 0 && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="font-bold mb-2">Created Posts:</h2>
                    {createdPosts.map(post => (
                        <div key={post.id} className="bg-white shadow-md p-4 rounded-lg mb-2">
                            <h3 className="font-bold mb-2">{post.title}</h3>
                            <p>{post.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export {UserPage};


export default myPosts;