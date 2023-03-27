import DashboardHeader from "../../components/DashboardHeader";
import RecipeTable from "../../components/RecipeTable";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import FastAPIClient from "../../client";
import config from "../../config";
import jwtDecode from "jwt-decode";
import * as moment from "moment";

const client = new FastAPIClient(config);


const ProfileView = ({ blogs }) => {
    const [posts, setposts] = useState(blogs);

   
	return (
		<>
        
			<RecipeTable
				blogs={ blogs }
				showUpdate={true}
			/>
			
		</>
	);
};

const MyProfile = () => {
    const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState({ label: "", url: "", source: "" });
    const [showForm, setShowForm] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    function handleChange(){
        console.log('')
    }
    


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
	}, []);

    const fetchUserPosts = () => {
        setLoading(true);
        client.getUserPosts()
        .then(  (response) => {
            
                setRefreshing(false);
                setBlogs(response)
                setLoading(false)
            },
                (error)=>{setError(error)})};
    
    return ( 
        <div>
            <DashboardHeader/>
        <section
        className=""
        style={{ minHeight: "100vh" }}
        >

        
        <div className="container">
           
                {/*TODO - move to component*/}
            <h1>
                Recipes - Better than all the REST
            </h1>
            {loading && (<div><p>Loading...</p></div>)}
            {blogs && (
            <div className="">
                
                {blogs.length && (
                    <ProfileView
                    blogs={ blogs }
                    
                    />)}
            </div>)}

            
        </div>
    
        <Footer />
    </section>
    </div>
     );
}
 
export default MyProfile;