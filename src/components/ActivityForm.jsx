import React, { useState } from "react";
import axios from "axios";

function ActivityForm() {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [certificate, setCertificate] = useState("");

  const [errors, setErrors] = useState({}); // State to track form validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "courseName":
        setCourseName(value);
        break;
      case "courseDescription":
        setCourseDescription(value);
        break;
      case "schoolName":
        setSchoolName(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "certificate":
        setCertificate(value);
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: "", // Clear the error message for the field being modified
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit data
      const formData = {
        courseName,
        courseDescription,
        schoolName,
        startDate,
        endDate,
        duration,
        certificate,
      };
      // Send form data to backend
      axios.post("/api/formdata", formData)
        .then(response => {
          console.log("Form data submitted successfully:", response.data);

          setCourseName("");
          setCourseDescription("");
          setSchoolName("");
          setStartDate("");
          setEndDate("");
          setDuration("");
          setCertificate("");
        })
        .catch(error => {
          console.error("Error submitting form data:", error);
        });
    } else {
      // Form has errors, update state with errors
      setErrors(validationErrors);
    }
  };

  // Function to validate form fields
  const validateForm = (data) => {
    let errors = {};

    // Validate required fields
    if (!courseName) {
      errors.courseName = "Course Name is required";
    } else if (courseName.length > 20) {
      errors.courseName = "Course Name should be up to 20 characters";
    }
    if (!courseDescription) {
      errors.courseDescription = "Course Description is required";
    } else if (courseDescription.length > 30) {
      errors.courseDescription = "Course Description should be up to 30 characters";
    }

    if (!schoolName) {
      errors.schoolName = "School/Institution Name is required";
    } else if (schoolName.length > 40) {
      errors.schoolName = "School/Institution Name should be up to 40 characters";
    }
    if (!startDate) {
      errors.startDate = "Start Date is required";
    }
    if (!endDate) {
      errors.endDate = "End Date is required";
    }
    if (!duration) {
      errors.duration = "Duration is required";
    } else if (duration.length > 10) {
      errors.duration = "Duration should be up to 10 characters";
    }
    if (!certificate) {
      errors.certificate = "Certificate is required";
    }

    return errors;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name of the Course:</label>
          <input
            type="text"
            name="courseName"
            value={courseName}
            onChange={handleChange}
          />
          {errors.courseName && <div className="text-danger">{errors.courseName}</div>}
        </div>
        <div>
          <label>Course Description:</label>
          <textarea
            name="courseDescription"
            value={courseDescription}
            onChange={handleChange}
          />
          {errors.courseDescription && <div className="text-danger">{errors.courseDescription}</div>}
        </div>
        <div>
          <label>School/Institution Name:</label>
          <input
            type="text"
            name="schoolName"
            value={schoolName}
            onChange={handleChange}
          />
          {errors.schoolName && <div className="text-danger">{errors.schoolName}</div>}
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleChange}
          />
          {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleChange}
          />
          {errors.endDate && <div className="text-danger">{errors.endDate}</div>}
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={duration}
            onChange={handleChange}
          />
          {errors.duration && <div className="text-danger">{errors.duration}</div>}

        </div>
        <div>
          <label>Upload Certificate (PDF/JPG/JPEG):</label>
          <input
            type="file"
            name="certificate"
            value={certificate}
            accept=".pdf,.jpg,.jpeg"
            onChange={handleChange}
          />
          {errors.certificate && <div className="text-danger ">{errors.certificate}</div>}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ActivityForm;
