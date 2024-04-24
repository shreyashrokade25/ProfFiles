import React, { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { TempStorage } from './TempStorage';
import "../components/viewstyles.css";


const ViewProfile = () => {
    const location = useLocation();
    const {
        personalDetails, currentCourseData, pastQualificationData,
        achievementData, internshipData, examData,
        clubData, eventData, communityServiceData, workshopData, projectData
    } = useContext(TempStorage);
    const combinedData = location.state?.combinedData || null;

    // Ensure Data are arrays
    const personalDetailsData = personalDetails || location.state?.personalDetails || {};
    const currentCourse = currentCourseData || location.state?.currentCourseData || {};
    const pastQualification = Array.isArray(pastQualificationData) ? pastQualificationData : [];
    const clubs = Array.isArray(clubData) ? clubData : [];
    const events = Array.isArray(eventData) ? eventData : [];
    const communityServices = Array.isArray(communityServiceData) ? communityServiceData : [];
    const workshops = Array.isArray(workshopData) ? workshopData : [];
    const achievements = Array.isArray(achievementData) ? achievementData : [];
    const internships = Array.isArray(internshipData) ? internshipData : [];
    const exams = Array.isArray(examData) ? examData : [];
    const projects = Array.isArray(projectData) ? projectData : [];

    if (!personalDetailsData
        && !currentCourse
        && !pastQualification.length
        && !achievements.length
        && !internships.length
        && !exams.length
        && !clubs.length
        && !events.length
        && !communityServices.length
        && !workshops.length
        && !projects.length) {
        return <div>No data submitted yet</div>;
    }

        const renderPersonalDetails = () => {
            const hasAnyField = Object.values(personalDetailsData).some(field => field);
            if (!hasAnyField) {
                return <div>No Personal data submitted yet</div>;
            }
            return (
                <div className="personal-details-container">
                    <h2>Personal Details</h2>
                    <p>Name: {personalDetailsData.studentName}</p>
                    <p>Date of Birth: {personalDetailsData.dob}</p>
                    {/* Add more fields as needed */}
                </div>
            );
        };

    const renderEducationDetails = () => {
        if (!currentCourse) {
            return <div>No Current Course data submitted yet</div>;
        }
        if (!pastQualification.length) {
            return <div>No Past Qualification data submitted yet</div>;
        }
        return (
            <div className="education-details-container">

                <div>
                    <h2>Current Course Details</h2>
                    <p>Admission Year: {currentCourse.admissionYear}</p>
                    <p>Institute State: {currentCourse.instituteState}</p>
                    {/* Add more fields as needed */}
                </div>
                <div>
                    <h2>Past Qualification Details</h2>
                    {pastQualification.map((qualification, index) => (
                        <div key={index}>
                            <h3> <u>Qualification {index + 1}</u></h3>
                            <p>Qualification Level: {qualification.qualificationLevel}</p>
                            <p>Stream: {qualification.stream}</p>
                            {/* Add more fields as needed */}
                        </div>
                    ))}
                </div>
            </div>

        );
    };

    const renderClubDetails = () => {
        if (!clubs.length) {
            return <div>No Club/Committee data submitted yet</div>;
        }
        return (
            <div className="club-details-container">   
                <h2>Club/Committee Details</h2>
                {clubs.map((club, index) => (
                    <div key={index}>
                        <h3><u>Field {index + 1}</u></h3>
                        <p>Club/Committee Name: {club.clubName}</p>
                        <p>Position Held: {club.positionHeld}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    const renderAchievementDetails = () => {
        if (!achievements.length) {
            return <div>No Achievement data submitted yet</div>;
        }
        return (
            
            <div className="achievement-details-container">
                <h2>Achievement/Certification Details</h2>
                {achievements.map((achievement, index) => (
                    <div key={index}>
                        <h3><u>Achievement {index + 1}</u></h3>
                        <p>Title: {achievement.title}</p>
                        <p>Description: {achievement.description}</p>
                        <p>Achievement type: {achievement.type}</p>
                        <p>Provider/Organization: {achievement.provider}</p>
                        <p>Achievement date: {achievement.date}</p>
                        <p>Duration: {achievement.duration}</p>
                        <p>Platform: {achievement.platform}</p>
                        <p>Certificate URL: {achievement.certificateURL}</p>
                        <p>Skills: {achievement.skills}</p>

                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    const renderInternshipDetails = () => {
        if (!internships.length) {
            return <div>No Internship data submitted yet</div>;
        }
        return (
            <div className="internship-details-container">
                <h2>Internship Details</h2>
                {internships.map((internship, index) => (
                    <div key={index}>
                        <h3><u>Internship {index + 1}</u></h3>
                        <p>Title: {internship.internshiptitle}</p>
                        <p>Company: {internship.company}</p>
                        <p>Start date: {internship.startDate}</p>
                        <p>End date: {internship.endDate}</p>
                        <p>Responsibilities: {internship.responsibilities}</p>
                        <p>Achievements: {internship.achievements}</p>
                        <p>Supervisor :{internship.supervisor}</p>
                        <p>Feedback :{internship.feedback}</p>
                        <p>Certificate: {internship.certificate}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    const renderExamDetails = () => {
        if (!exams.length) {
            return <div>No Exam data submitted yet</div>;
        }
        return (
            <div className="exam-details-container">
                <h2>Exam Details</h2>
                {exams.map((exam, index) => (
                    <div key={index}>
                        <h3><u>Exam {index + 1}</u></h3>
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

    const renderProjectDetails = () => {
        if (!projects.length) {
            return <div>No Project data submitted yet</div>;
        }
        return (
            <div className="project-details-container">
                <h2>Project Details</h2>
                {projects.map((project, index) => (
                    <div key={index}>
                        <h3><u>Project {index + 1}</u></h3>
                        <p>Project Title: {project.projectTitle}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="form-container">
            <h1><b>Profile Details</b></h1>
            {renderPersonalDetails()}
            {renderEducationDetails()}
            {renderClubDetails()}
            {renderAchievementDetails()}
            {renderInternshipDetails()}
            {renderExamDetails()}
            {renderProjectDetails()}
        </div>
    );
};

export default ViewProfile;
