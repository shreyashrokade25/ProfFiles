import React, { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { AchievementContext } from './AchievementContext';

const ActivityView = () => {
    const location = useLocation();
    const { achievementData, projectData, internshipData, examData, clubData, eventData, communityServiceData, workshopData} = useContext(AchievementContext);
    const combinedData = location.state?.combinedData || null;

    // Ensure achievementData, projectData, and internshipData are arrays
    const achievements = Array.isArray(combinedData?.achievements) ? combinedData.achievements : (Array.isArray(achievementData) ? achievementData : []);
    const projects = Array.isArray(combinedData?.projects) ? combinedData.projects : (Array.isArray(projectData) ? projectData : []);
    const internships = Array.isArray(internshipData) ? internshipData : [];
    const exams = Array.isArray(examData) ? examData : [];
    const clubs = Array.isArray(clubData) ? clubData : [];
    const events = Array.isArray(eventData) ? eventData : [];
    const communityServices = Array.isArray(communityServiceData) ? communityServiceData : [];
    const workshops = Array.isArray(workshopData) ? workshopData : [];


    if (!achievements.length && !projects.length && !internships.length && !exams.length && !clubs.length && !events.length && !communityServices.length && !workshops.length ) {
        return <div>No data submitted yet</div>;
    }

    const renderProjectDetails = () => {
        if (!projects.length) {
            return <div>No project data submitted yet</div>;
        }
        return (
            <div>
                <h2>Project Details</h2>
                {projects.map((project, index) => (
                    <div key={index}>
                        <h3>Project {index + 1}</h3>
                        <p>Project Title: {project.projectTitle}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    const renderAchievementDetails = () => {
        if (!achievements.length) {
            return <div>No achievement data submitted yet</div>;
        }
        return (
            <div>
                <h2>Achievement/Certification Details</h2>
                {achievements.map((achievement, index) => (
                    <div key={index}>
                        <h3>Achievement {index + 1}</h3>
                        <p>Title: {achievement.title}</p>
                        <p>Description: {achievement.description}</p>
                        <p>Certificate URL: {achievement.certificateURL}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    const renderInternshipDetails = () => {
        if (!internships.length) {
            return <div>No internship data submitted yet</div>;
        }
        return (
            <div>
                <h2>Internship Details</h2>
                {internships.map((internship, index) => (
                    <div key={index}>
                        <h3>Internship {index + 1}</h3>
                        <p>Title: {internship.internshiptitle}</p>
                        <p>Company: {internship.company}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    const renderExamDetails = () => {
        if (!exams.length) {
            return <div>No exam data submitted yet</div>;
        }
        return (
            <div>
                <h2>Exam Details</h2>
                {exams.map((exam, index) => (
                    <div key={index}>
                        <h3>Exam {index + 1}</h3>
                        <p>Name: {exam.examName}</p>
                        <p>Date: {exam.examDate}</p>
                        <p>Score: {exam.score}</p>
                        <p>Rank: {exam.rank}</p>
                        <p>Percentile: {exam.percentile}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    const renderClubDetails = () => {
        if (!clubs.length) {
            return <div>No Club/Committee data submitted yet</div>;
        }
        return (
            <div>
                <h2>Club/Committee Details</h2>
                {clubs.map((club, index) => (
                    <div key={index}>
                        <h3>Field {index + 1}</h3>
                        <p>Club/Committee Name: {club.clubName}</p>
                        <p>Position Held: {club.positionHeld}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };
    
    return (
        <div className="form-container">
            <h2>Submitted Details</h2>
            {renderAchievementDetails()}
            {renderInternshipDetails()}
            {renderExamDetails()}
            {renderProjectDetails()}
            {renderClubDetails()}

        </div>
    );
};

export default ActivityView;
