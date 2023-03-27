import DashboardHeader from "../../components/DashboardHeader";
import RecipeTable from "../../components/RecipeTable";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import FastAPIClient from "../../client";
import config from "../../config";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import { CreateBlog } from "../CreatePost/createPost";

const client = new FastAPIClient(config);
const ProfileView = ({ posts }) => {

    return (
      <>
        <RecipeTable
          blogs={posts}
          showUpdate={true}
        />
      </>
    );
  };
  
  const UserProfileToggle = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState({ label: "", url: "", source: "" });
    const [showForm, setShowForm] = useState(false);
    const [createdPosts, setCreatedPosts] = useState([]);
  
    const fetchUserPosts = () => {
      setLoading(true);
      client.getUserPosts()
        .then(
          (response) => {
            setBlogs(response)
            setLoading(false)
          },
          (error) => { setError(error) });
    };
  
    useEffect(() => {
      const tokenString = localStorage.getItem("token");
      if (tokenString) {
        const token = JSON.parse(tokenString);
        const decodedAccessToken = jwtDecode(token.access_token);
        if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
          setIsLoggedIn(true);
          fetchUserPosts();
        }
    }
    fetchUserPosts()
}, []);
  
    const handleBlogCreated = (newPost) => {
      setShowForm(false);
      setCreatedPosts([...createdPosts, newPost]);
      fetchUserPosts(); // update the UI with the latest list of blog posts
    };

  return (
    <div>
      <DashboardHeader />
      <section className="" style={{ minHeight: "100vh" }}>
        <div className="container">
          {/*TODO - move to component*/}
          <h1>Recipes - Better than all the REST</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Hide Form" : "Create Blog Post"}
          </button>
          {showForm && <CreateBlog onBlogCreated={handleBlogCreated} />}
          {loading && <div><p>Loading...</p></div>}
          {blogs && (
            <div className="">
              {blogs.length && <ProfileView posts={blogs} />}
            </div>
          )}
        </div>
        <Footer />
      </section>
    </div>
  );
}

export default UserProfileToggle;
