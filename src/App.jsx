import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ActivityView from './components/ActivityView';
import EducationalDetailsForm from "./components/EducationalDetailsForm";
import AchievementForm from './components/AchievementForm';
import Curricular from './components/Curricular';
import Project from './components/Project';
import { AchievementProvider } from './components/AchievementContext'; // Import the AchievementProvider

function App() {

 return (
    <AchievementProvider> {/* Wrap the app with the AchievementProvider */}
      <Router>
        <div className='grid-container'>
          <Sidebar />
          <Header />
             <Routes>
               {/* Route for EducationForm */}
             <Route
            path="/add-educationaldetails" 
            element={<EducationalDetailsForm />}
            />
            {/* Route for CurricularForm */}
            <Route
              path="/curricular"
              element={<Curricular />}
            />
            {/* Route for AchievementForm */}
            <Route
              path="/add-achievements"
              element={<AchievementForm />}
            />
            {/* Route for Project */}
            <Route
              path="/project"
              element={<Project />}
            />
            {/* Route for ActivityView */}
            <Route
              path="/activityview"
              element={<ActivityView />}
            />
          </Routes>
        </div>
      </Router>
    </AchievementProvider>
 );

}

export default App;
