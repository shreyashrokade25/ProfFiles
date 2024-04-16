import React, { useState } from 'react';

const Project = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [githubRepoURL, setGithubRepoURL] = useState('');
  const [technologiesUsed, setTechnologiesUsed] = useState('');
  const [otherTechnologies, setOtherTechnologies] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [projectGoals, setProjectGoals] = useState('');
  const [challengesFaced, setChallengesFaced] = useState('');
  const [license, setLicense] = useState('');
  const [references, setReferences] = useState('');

  const handleProjectCategoryChange = (event) => {
    const { value } = event.target;
    setProjectCategory(value);
    if (value !== 'other') {
      setOtherCategory('');
    }
  };

  const handleTechnologiesUsedChange = (event) => {
    const { value } = event.target;
    setTechnologiesUsed(value);
    if (value !== 'other') {
      setOtherTechnologies('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      projectTitle,
      projectDescription,
      projectCategory,
      otherCategory,
      githubRepoURL,
      technologiesUsed,
      otherTechnologies,
      startDate,
      endDate,
      projectDuration,
      teamMembers,
      projectGoals,
      challengesFaced,
      license,
      references
    });
  };

  return (
    <div className="form-container">
      <h2>Add Project Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Title:</label>
          <input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
        </div>
        <div>
          <label>Project Description:</label>
          <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        </div>
        <div>
          <label>Project Category:</label>
          <select value={projectCategory} onChange={handleProjectCategoryChange}>
            <option value="software">Software</option>
            <option value="ai">AI</option>
            <option value="ml">ML</option>
            <option value="iot">IoT</option>
            <option value="other">Other</option>
          </select>
          {projectCategory === 'other' && (
            <input type="text" value={otherCategory} onChange={(e) => setOtherCategory(e.target.value)} placeholder="Specify other category" />
          )}
        </div>
        <div>
          <label>GitHub Repository URL:</label>
          <input type="url" value={githubRepoURL} onChange={(e) => setGithubRepoURL(e.target.value)} />
        </div>
        <div>
          <label>Technologies Used:</label>
          <select value={technologiesUsed} onChange={handleTechnologiesUsedChange}>
            <option value="programming_languages">Programming Languages</option>
            <option value="frameworks">Frameworks</option>
            <option value="tools">Tools</option>
            <option value="other">Other</option>
          </select>
          {technologiesUsed === 'other' && (
            <input type="text" value={otherTechnologies} onChange={(e) => setOtherTechnologies(e.target.value)} placeholder="Specify other technologies" />
          )}
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label>Project Team:</label>
          <textarea value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} />
        </div>
        <div>
          <label>Project Goals and Objectives:</label>
          <textarea value={projectGoals} onChange={(e) => setProjectGoals(e.target.value)} />
        </div>
        <div>
          <label>Challenges Faced:</label>
          <textarea value={challengesFaced} onChange={(e) => setChallengesFaced(e.target.value)} />
        </div>
        <div>
          <label>License:</label>
          <input type="text" value={license} onChange={(e) => setLicense(e.target.value)} />
        </div>
        <div>
          <label>References or Citations:</label>
          <textarea value={references} onChange={(e) => setReferences(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Project;
