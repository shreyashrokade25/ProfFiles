// Home.jsx
import React from 'react';
import ActivityForm from './ActivityForm'; // Import the AchievementForm component
import PersonalDetailsPage from './PersonalDetailsPage';

function Home({ showForm }) {
  return (
    <div>
      <h1></h1>
      {showForm && <ActivityForm />} 
      {showForm && <PersonalDetailsPage />}
          </div>
  );
}

export default Home;
