import DashboardHeader from "../../components/DashboardHeader";
import RecipeTable from "../../components/RecipeTable";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import FastAPIClient from "../../client";
import config from "../../config";
const client = new FastAPIClient(config);


const ProfileView = ({ recipes }) => {
	return (
		<>
			<RecipeTable
				recipes={recipes}
				
				showUpdate={true}
			/>
			
		</>
	);
};

const MyProfile = () => {
    const [recipes, setRecipes] = useState([{
        "id": 1,
        "label": "Chicken Vesuvio",
        "source": "Serious Eats",
        "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
    }]);

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(true);
    const fetchUserRecipes = () => {
		client.getUserRecipes().then((data) => {
			setRefreshing(false);
			setRecipes(data?.results);
		});
	};
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

            <button
                className=""
                onClick={() => {
                    setShowForm(!showForm);
                }}
            >
                Create Recipe
            </button>

            <p className="">Latest recipes</p>
            <div className="">
                {recipes.length && (
                    <ProfileView
                        recipes={recipes}
                        fetchUserRecipes={fetchUserRecipes}
                    />
                )}
            </div>
        </div>

        <Footer />
    </section>
     );
}
 
export default MyProfile;