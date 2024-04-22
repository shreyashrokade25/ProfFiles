import React, { createContext, useState } from 'react';

export const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
 // State for achievements and certificates
 const [achievementData, setAchievementData] = useState([]);
 // State for projects
 const [projectData, setProjectData] = useState([]);
 // State for internships
 const [internshipData, setInternshipData] = useState([]);
 // State for exams
 const [examData, setExamData] = useState([]);
 // State for clubs
 const [clubData, setClubData] = useState([]);
 // State for events
 const [eventData, setEventData] = useState([]);
 // State for communityService
 const [communityServiceData, setCommunityServiceData] = useState([]);
 // State for workshop
 const [workshopData, setWorkshopData] = useState([]);

 // Value provided to the context consumers
 const value = {
    achievementData,setAchievementData,
    internshipData,setInternshipData,
    examData,setExamData,
    projectData,setProjectData,
    clubData,setClubData,
    eventData,setEventData,
    communityServiceData,setCommunityServiceData,
    workshopData,setWorkshopData,
 };

 return (
    <AchievementContext.Provider value={value}>
      {children}
    </AchievementContext.Provider>
 );
};
