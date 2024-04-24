import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ViewProfile from './components/ViewProfile';
import EducationalDetailsForm from "./components/EducationalDetailsForm";
import AchievementForm from './components/AchievementForm';
import Curricular from './components/Curricular';
import Project from './components/Project';
import PersonalDetailsPage from "./components/PersonalDetailsPage";
import { AchievementProvider } from './components/TempStorage'; // Import the AchievementProvider


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
      const body = document.querySelector('#root');

      body.scrollIntoView({
          behavior: 'smooth'
      });
  }, [pathname]);

  return null;
}

function App() {

 return (
    <AchievementProvider> {/* Wrap the app with the AchievementProvider */}
      <Router>
        <div className='grid-container'>
          <Sidebar />
          <Header />
          <ScrollToTop />

             <Routes>
               {/* Route for PersonalDetailsForm */}
             <Route
            path="/add-PersonalDetails" 
            element={<PersonalDetailsPage />}
            />
               {/* Route for EducationForm */}
             <Route
            path="/add-EducationalDetails" 
            element={<EducationalDetailsForm />}
            />
            {/* Route for CurricularForm */}
            <Route
              path="/add-CurricularDetails"
              element={<Curricular />}
            />
            {/* Route for AchievementForm */}
            <Route
              path="/add-AchievementDetails"
              element={<AchievementForm />}
            />
            {/* Route for Project */}
            <Route
              path="/add-ProjectDetails"
              element={<Project />}
            />
            {/* Route for ActivityView */}
            <Route
              path="/view-Profile"
              element={<ViewProfile />}
            />
          </Routes>
        </div>
      </Router>
    </AchievementProvider>
 );

}

export default App;
