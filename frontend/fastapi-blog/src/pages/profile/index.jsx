import React, { useEffect,useState } from 'react';
import axios from 'axios';
import FastAPIClient from '../../client';
import config from '../../config';
import ImageViewer from '../../components/image/Image';
import DashboardHeader from '../../components/DashboardHeader'

const client = new FastAPIClient(config);

function MyProfile() {
    client.fetchUser()
    const user = localStorage.getItem('user');
    console.log(user.slice(0,5))
   
    const [formData, setFormData] = useState({image: null});
    const [uploadedImage, setUploadedImage] = useState(null);
    
    // On form submit, prevent default behavior, upload file and update uploadedImage state
    function handleSubmit(event) {
      event.preventDefault();
      const formDataObj = new FormData();
      formDataObj.append('image', formData.image);
      client.sendImage('/user/image', formDataObj)
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
      client.sendImage({ image: uploadedImage })
        .then(response => {
          // update the user object with the new image URL
          console.log(data)
        })
        .catch(error => {
          console.log(error);
        });
    }, [uploadedImage]);
  
    return (
      <div className="container items-center p-4">
      <DashboardHeader />
        {user && (
          <div className="mr-4 h-64 w-64 rounded-full object-cover overflow: hidden;">
            <ImageViewer id={user.id} className=""/>
          </div>
        )}
        {user && (<div>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>)}
        {uploadedImage && (
          <div className="ml-4">
            <img className="" src={uploadedImage} alt="Uploaded image" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="my-4">
          <input type="file" name="image" onChange={handleInputChange} className="text-gray-800" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">Upload</button>
        </form>
       
      </div>
    );
  }
  
export default MyProfile;