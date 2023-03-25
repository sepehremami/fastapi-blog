import React from 'react';
import FastAPIClient from '../../client';
import DashboardHeader from '../../components/DashboardHeader';
import config from '../../config';

const client = new FastAPIClient(config)

const ProfileView = () => {
    
    const user = client.fetchUser();
    console.log(user)

    return ( 
   
        <div>
            <DashboardHeader />
            <p>king</p>
        </div>
     );
}
 
export default ProfileView;