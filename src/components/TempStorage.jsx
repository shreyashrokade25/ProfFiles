import React, { createContext, useState } from 'react';

export const TempStorage = createContext();

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
 // State for PersonalDetails
 const [personalDetails, setPersonalDetails] = useState([]);
 // State for CurrentCourse Details
 const [currentCourseData, setCurrentCourseData] = useState([]);
 // State for Past Qualification Details
 const [pastQualificationData, setPastQualificationData] = useState([]);

     // Function to reset all context data
     const resetContextData = () => {
      setAchievementData([]);
      setProjectData([]);
      setInternshipData([]);
      setExamData([]);
      setClubData([]);
      setEventData([]);
      setCommunityServiceData([]);
      setWorkshopData([]);
      setPersonalDetails([]);
      setCurrentCourseData([]);
      setPastQualificationData([]);
  };

 // Value provided to the context consumers
 const value = {
    personalDetails, setPersonalDetails,
    currentCourseData, setCurrentCourseData,
    pastQualificationData, setPastQualificationData,
    achievementData,setAchievementData,
    internshipData,setInternshipData,
    examData,setExamData,
    projectData,setProjectData,
    clubData,setClubData,
    eventData,setEventData,
    communityServiceData,setCommunityServiceData,
    workshopData,setWorkshopData,
    resetContextData,
 };

 return (
    <TempStorage.Provider value={value}>
      {children}
    </TempStorage.Provider>
 );
};
