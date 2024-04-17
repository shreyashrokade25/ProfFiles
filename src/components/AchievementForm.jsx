import React from "react";
import "../components/styles.css";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


function AchievementForm() {
  const initialValues = {
    title: "",
    description: "",
    type: "",
    provider: "",
    date: "",
    duration: "",
    platform: "",
    certificateURL: "",
    skills: "",
    internshiptitle: "",
    company: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
    achievements: "",
    supervisor: "",
    feedback: "",
    certificate: "",
    examName: "",
    examDate: "",
    score: "",
    rank: "",
    percentile: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Achievement Description is required"),
    type: Yup.string().required("Type of achievement is required"),
    provider: Yup.string().required("Provider is required"),
    date: Yup.date().required("Date of achievement is required"),
    duration: Yup.string().required("Duration is required"),
    platform: Yup.string().required("Platform is required"),
    certificateURL: Yup.string().url("Invalid URL"),
    skills: Yup.string().required("Skill is required"),
    internshiptitle: Yup.string().required("Internship title is required"),
    company: Yup.string().required("Company Name is required"),
    startDate: Yup.date().required("Please enter start date"),
    endDate: Yup.date().required("Please enter end date"),
    responsibilities: Yup.string().required("Roles/Responsibilities is required"),
    achievements: Yup.string().required("Achievement is required"),
    supervisor: Yup.string().required("Supervisor name is required"),
    feedback: Yup.string().required("Feedback is required"),
    certificate: Yup.mixed().required("Certificate is required"),
    examName: Yup.string().required("Exam Name is required"),
    examDate: Yup.date().required("Exam Date is required"),
    score: Yup.string().required("Score is required"),
    rank: Yup.string().required("Rank is required"),
    percentile: Yup.string().required("Percentile is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission, e.g., send data to backend
    console.log(values);
    // Reset the form after submission
    resetForm();
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <fieldset className="fieldset">
              <legend>Achievement/Certification Detail</legend>
              <div>
                <label>Achievement/Certification Title:</label>
                <input type="text" name="title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <div>
                <label>Achievement Description:</label>
                <input type="textarea" name="description" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Type of Achievement/Certification:</label>
                <input type="text" name="type" />
                <ErrorMessage name="type" component="div" className="error" />
              </div>
              <div>
                <label>Provider/Organizer:</label>
                <input type="text" name="provider" />
                <ErrorMessage
                  name="provider"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Date of Achievement:</label>
                <input type="date" name="date" />
                <ErrorMessage name="date" component="div" className="error" />
              </div>
              <div>
                <label>Duration (for courses):</label>
                <input type="text" name="duration" />
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Platform/Website:</label>
                <input type="text" name="platform" />
                <ErrorMessage
                  name="platform"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Certificate URL:</label>
                <input type="url" name="certificateURL" />
                <ErrorMessage
                  name="certificateURL"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Skills/Knowledge Gained:</label>
                <input type="textarea" name="skills" />
                <ErrorMessage
                  name="skills"
                  component="div"
                  className="error"
                />
              </div>
            </fieldset> <br />
            <fieldset className="fieldset">
              <legend>Intership Details</legend>
              <div>
                <label>Internship Title:</label>
                <input type="text" name="internshiptitle" />
                <ErrorMessage
                  name="internshiptitle"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Company/Organization:</label>
                <input type="text" name="company" />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Internship Duration:</label>
                <div>
                  <label>Start Date</label>
                  <input type="date" name="startDate" />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input type="date" name="endDate" />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div>
                <label>Role/Responsibilities:</label>
                <input type="textarea" name="responsibilities" />
                <ErrorMessage
                  name="responsibilities"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Achievements:</label>
                <input type="textarea" name="achievements" />
                <ErrorMessage
                  name="achievements"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Supervisor/Mentor:</label>
                <input type="text" name="supervisor" />
                <ErrorMessage
                  name="supervisor"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Feedback or Evaluation:</label>
                <input type="textarea" name="feedback" />
                <ErrorMessage
                  name="feedback"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Certificate (required):</label>
                <input type="file" name="certificate" />
                <ErrorMessage
                  name="certificate"
                  component="div"
                  className="error"
                />
              </div>
            </fieldset> <br />
            <fieldset className="fieldset">
              <legend>Entrance Exam Details</legend>
              <div>
                <label>Exam Name:</label>
                <input type="text" name="examName" />
                <ErrorMessage
                  name="examName"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Exam Date:</label>
                <input type="date" name="examDate" />
                <ErrorMessage
                  name="examDate"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Score:</label>
                <input type="text" name="score" />
                <ErrorMessage
                  name="score"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Rank (required):</label>
                <input type="text" name="rank" />
                <ErrorMessage
                  name="rank"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Percentile (required):</label>
                <input type="text" name="percentile" />
                <ErrorMessage
                  name="percentile"
                  component="div"
                  className="error"
                />
              </div>
            </fieldset>
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AchievementForm;
