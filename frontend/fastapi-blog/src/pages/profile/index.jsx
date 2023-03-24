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
	const [refreshing, setRefreshing] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState({ label: "", url: "", source: "" });
    const [showForm, setShowForm] = useState(false);
    
    function handleChange(){
        console.log('chero')
    }
    
    useEffect(() => {
        console.log('ppio')
        return () => {
            
        };
    }, [blogs]);
    

    useEffect(() => {
        const tokenString = localStorage.getItem("token");
		if (tokenString) {
            const token = JSON.parse(tokenString);
			const decodedAccessToken = jwtDecode(token.access_token);
			if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
                setIsLoggedIn(true);
                fetchUserPosts()
			}
            
		}
	}, []);

    const fetchUserPosts = () => {client.getUserPosts()
        .then(  (response) => {
           
                setRefreshing(false);
                setBlogs(response)
            },
                (error)=>{})};
    
    
    return ( 
        <section
        className=""
        style={{ minHeight: "100vh" }}
        >
        <DashboardHeader />
        <div className="container">
                {/*TODO - move to component*/}
            <h1>
                Recipes - Better than all the REST
            </h1>

            

            <p className="">Latest recipes</p>
            <div className="" onChange={handleChange}>
                {console.log(blogs)}
                {blogs.length && (
                    <ProfileView
                    blogs={ blogs }
                    
                    />
                )}
            </div>
        </div>

        <Footer />
    </section>
     );
}
 
export default MyProfile;