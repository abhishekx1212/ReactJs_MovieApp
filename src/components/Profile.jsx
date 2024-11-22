// Profile.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.movie);

  if (currentUser == null) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Your Profile</h2>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <Link to={"/home"} className='btn d-block btn-primary' style={{width:"80px"}}>BACK</Link>
      {/* Display other user data here */}
    </div>
  );
};

export default Profile;
