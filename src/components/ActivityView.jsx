import React from "react";
import { useLocation } from 'react-router-dom';

const ActivityView = () => {
    const location = useLocation();
    const combinedData = location.state?.combinedData || null;
    console.log("Combined Data in ActivityView:", combinedData);

    if (!combinedData) {
        return <div>No data submitted yet</div>;
    }

    const renderProjectDetails = () => {
        return (
            <div>
                <h2>Project Details</h2>
                <p>Project Title: {combinedData.projectTitle}</p>
                <p>Project Description: {combinedData.projectDescription}</p>
                <p>Project Category: {combinedData.projectCategory}</p>
                <p>GitHub Repo URL: {combinedData.githubRepoURL}</p>
                {/* Add more fields as needed */}
            </div>
        );
    };

    const renderAchievementDetails = () => {
        return (
            <div>
                <h2>Achievement/Certification Details</h2>
                <p>Title: {combinedData.title}</p>
                <p>Description: {combinedData.description}</p>
                {/* Add more fields as needed */}
            </div>
        );
    };

    return (
        <div>
            <h2>Submitted Details</h2>
            {renderProjectDetails()}
            {renderAchievementDetails()}
        </div>
    );
};

export default ActivityView;
