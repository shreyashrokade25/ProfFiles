import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ActivityForm from './components/ActivityForm';
import ActivityView from './components/ActivityView';

function App() {
  return (
    <Router>
      <div className='grid-container'>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/add-activity" element={<ActivityForm/>} />
          <Route path="/view-activity" element={<ActivityView />}/>

          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
