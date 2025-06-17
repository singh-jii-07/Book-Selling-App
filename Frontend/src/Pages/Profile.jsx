import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Profile/Sidebar';
import Favourites from '../Components/Profile/Favourites'

const Profile = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:4020/website/api/user/user-info", { headers });
        console.log(res.data.data);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      }
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-3 md:px-12 flex flex-col md:flex-row  py-8 text-white'>
      {!profile && !error && (
        <p className='w-full h-full flex items-center justify-center'>
          Loading...
        </p>
      )}
      {error && (
        <p className='text-red-500 w-full h-full flex items-center justify-center'>
          {error}
        </p>
      )}
      {profile && (
        <>
          <div className='w-full md:w-1/6'>
            <Sidebar data={profile} />
          </div>
          <div className='w-full md:w-5/6'>
           <Favourites/>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
