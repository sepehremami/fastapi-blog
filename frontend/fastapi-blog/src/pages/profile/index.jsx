import React, { useEffect,useState } from 'react';
import axios from 'axios';
import FastAPIClient from '../../client';
import config from '../../config';
import ImageViewer from '../../components/image/Image';
import DashboardHeader from '../../components/DashboardHeader'

const client = new FastAPIClient(config);

// Sample User object
const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    image: 'https://example.com/images/johndoe.jpg'
  };
  

function MyProfile() {
    // State variables to keep track of form data and uploaded image
    const [formData, setFormData] = useState({
      image: null
    });
    const [uploadedImage, setUploadedImage] = useState(user.image);
  
    // On form submit, prevent default behavior, upload file and update uploadedImage state
    function handleSubmit(event) {
      event.preventDefault();
      const formDataObj = new FormData();
      formDataObj.append('image', formData.image);
      client.put('/api/save-image', formDataObj)
        .then(response => {
          setUploadedImage(response.data.imageURL);
        })
        .catch(error => {
          console.log(error);
        });
    }
  
    // On form change, update formData state
    function handleInputChange(event) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0]
      });
    }
  
    // useEffect to update user image when uploadedImage state changes
    useEffect(() => {
      // call backend API to update the user object with the new image URL
      axios.put('/api/user', { image: uploadedImage })
        .then(response => {
          // update the user object with the new image URL
          user.image = uploadedImage;
        })
        .catch(error => {
          console.log(error);
        });
    }, [uploadedImage]);
  
    return (
      <div className="container items-center p-4">
      <DashboardHeader />
        {user.image && (
          <div className="mr-4">
            <img className="h-64 w-64 rounded-full object-cover" src={user.image} alt={`Profile image for ${user.username}`} />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        {uploadedImage && (
          <div className="ml-4">
            <img className="h-64 w-64 rounded-full object-cover" src={uploadedImage} alt="Uploaded image" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="my-4">
          <input type="file" name="image" onChange={handleInputChange} className="text-gray-800" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">Upload</button>
        </form>
          <ImageViewer/>
        
      </div>
    );
  }
  
export default MyProfile;