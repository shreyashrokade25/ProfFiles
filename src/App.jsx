import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import ActivityView from './components/ActivityView';
import AchievementForm from './components/AchievementForm';
import Project from './components/Project';

function App() {
  return (
    <Router>
      <div className='grid-container'>
        <Header />
        <Sidebar />
        <Routes>

          
          <Route path="/add-achievements" element={<AchievementForm/>} />
          <Route path="/" element={<ActivityView />}/>
          <Route path="/project" element={<Project/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
