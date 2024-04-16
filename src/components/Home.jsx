// Home.jsx
import React from 'react';
import ActivityForm from './ActivityForm'; // Import the AchievementForm component

function Home({ showForm }) {
  return (
    <div>
      <h1></h1>
      {showForm && <ActivityForm />} {/* Render the AchievementForm component if showForm is true */}
    </div>
  );
}

export default Home;
