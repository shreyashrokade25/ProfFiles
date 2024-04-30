import React, { useState, useContext } from "react";
import "../styles/styles.css";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { TempStorage } from "../TempStorage";
import Label from "../layout/Label";

function AchievementForm() {
  const { setAchievementData, setInternshipData, setExamData } = useContext(TempStorage); 
  const navigate = useNavigate();

  const [achievementCertificate, setAchievementCertificate] = useState(null);
  const [internshipCertificate, setInternshipCertificate] = useState(null);
  const [examCertificate, setExamCertificate] = useState(null);

  const initialValues = {
    achievements: [
      {
        title: "",
        description: "",
        type: "",
        provider: "",
        date: "",
        duration: "",
        platform: "",
        skills: "",
        achievementCertificate: null,
        certificateURL: "",
      },
    ],
    internships: [
      {
        internshiptitle: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        achievements: "",
        supervisor: "",
        feedback: "",
        internshipCertificate: null,
      },
    ],
    exams: [
      {
        examName: "",
        examDate: "",
        score: "",
        rank: "",
        percentile: "",
        examCertificate: null,
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    // achievementscertificate: Yup.array().of(
    //   Yup.object().shape({
    //     title: Yup.string()
    //       .required("Title is required")
    //       .min(2, "Title must be at least 2 characters")
    //       .max(20, "Title must be less than 20 characters"),
    //     description: Yup.string()
    //       .required("Achievement Description is required")
    //       .max(50, "Description should contain less than 50 characters."),
    //     type: Yup.string().required("Type of achievement is required"),
    //     provider: Yup.string().required("Provider is required"),
    //     date: Yup.date()
    //       .required("Date of achievement is required")
    //       .max(
    //         new Date(),
    //         "Achievement/Certification/Course completion date cannot be in the future"
    //       ),
    //     duration: Yup.string()
    //       .required("Duration is required")
    //       .max(8, "Duration must be less than 8 characters"),
    //     platform: Yup.string().required("Platform is required"),
    //     certificateURL: Yup.string()
    //       .required("Certificate URL is required.")
    //       .url("Invalid URL format"),
    //     skills: Yup.string()
    //       .required("Skill is required")
    //       .min(3, "Add at least one skill."),
    //   })
    // ),
    // internships: Yup.array().of(
    //   Yup.object().shape({
    //     internshiptitle: Yup.string()
    //       .required("Internship title is required")
    //       .min(2, "Title must be at least 2 characters"),
    //     company: Yup.string()
    //       .required("Company Name is required")
    //       .min(2, "company name must contain 2 character."),
    //     startDate: Yup.date()
    //       .required("Please enter start date")
    //       .max(Yup.ref("endDate"), "Start date must be before end date")
    //       .max(new Date(), "Date must be in past"),
    //     endDate: Yup.date()
    //       .required("Please enter end date")
    //       .min(Yup.ref("startDate"), "End date must be after start date")
    //       .max(new Date(), "Date must be in past"),
    //     responsibilities: Yup.string().required(
    //       "Roles/Responsibilities is required"
    //     ),
    //     achievements: Yup.string()
    //       .required("Achievement is required")
    //       .min(2, "Achievements must contain 2 characters."),
    //     supervisor: Yup.string()
    //       .required("Supervisor name is required")
    //       .min(2, "Supervisor name should be at least 2 character."),
    //     feedback: Yup.string()
    //       .required("Feedback is required")
    //       .min(5, "feedback must contain 5 character.")
    //       .max(20, "Feedback must be less than 20 character."),
    //     certificate: Yup.mixed().required("Certificate is required"),
    //   })
    // ),
    // exams: Yup.array().of(
    //   Yup.object().shape({
    //     examName: Yup.string()
    //     .required("Exam Name is required")
    //     .min(2, "Exam Name must contain 2 character."),
    //   examDate: Yup.date()
    //     .required("Exam Date is required")
    //     .max(new Date(), "Date must be in past."),
    //   score: Yup.number()
    //     .typeError('Score must be a number')
    //.min(0, 'Score must be greater than or equal to 0')

    //.required('Score is required'),
    //   rank: Yup.number()
    //     .typeError('Rank must be a number')
   // .positive('Rank must be a positive number')
    //.integer('Rank must be an integer')
    //.required('Rank is required'),
    //   percentile: Yup.number()
    //     .typeError('Percentage must be a number')
    //.min(0, 'Percentage must be greater than or equal to 0')
    //.max(100, 'Percentage must be less than or equal to 100')
    //.required('Percentage is required'),
    //   })
    // ),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const updatedAchievements = values.achievements.map((achievement, index) => {
        if (values.achievements[index].achievementCertificate) {
          const achievementCertificateUrl = URL.createObjectURL(values.achievements[index].achievementCertificate);
          return { ...achievement, achievementCertificate: achievementCertificateUrl };
        }
        return achievement;
      });
      const updatedInternship = values.internships.map((internship, index) => {
        if (values.internships[index].internshipCertificate) {
          const internshipCertificateUrl = URL.createObjectURL(values.internships[index].internshipCertificate);
          return { ...internship, internshipCertificate: internshipCertificateUrl };
        }
        return internship;
      });
      const updatedExams = values.exams.map((exam, index) => {
        if (values.exams[index].examCertificate) {
          const examCertificateUrl = URL.createObjectURL(values.exams[index].examCertificate);
          return { ...exam, examCertificate: examCertificateUrl };
        }
        return exam;
      });

      const combinedData = {
        achievementsCertificates: updatedAchievements,
        internships: updatedInternship,
        exams: updatedExams,
      };
      
      // Update the context with all combined data
      console.log("Achievement/Certification Details: ", values);
      setAchievementData(combinedData.achievementsCertificates);
      setAchievementCertificate(null);
      setInternshipData(combinedData.internships); // Assuming you have setInternshipData in your context
      setInternshipCertificate(null); 
      setExamData(combinedData.exams); // Assuming you have setExamData in your context
      setExamCertificate(null);

      // Pass all combined data in the navigation state
      navigate("/add-ProjectDetails", { state: { combinedData } });
    } catch (error) {
      console.error("Achievement submission failed", error);
      setSubmitting(false);
      setErrors({ submit: "Achievement submission failed" });
    }
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          values,
          errors,
          touched,
          setFieldValue,
          handleBlur,
          handleChange,
        }) => (
          <Form>
            <FieldArray name="achievements">
              {({ push, remove }) => (
                <fieldset className="fieldset">
                  <h3>Achievements and Certifications</h3>
                  <legend>
                    <u>Achievement/Certification Details</u>
                  </legend>
                  {values.achievements.map((achievement, index) => (
                    <div key={index}>
                      <div>
                        <label>{`Achievement Title ${index + 1}:`}</label>
                        <Field
                          type="text"
                          name={`achievements[${index}].title`}
                          value={achievement.title || ""}
                          autoComplete="off"
                          placeholder="Enter title of achievement or certificate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].title &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].title ? (
                          <p className="text-danger">
                            {errors.achievements[index].title}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Achievement Description:</label>
                        <Field
                          as="textarea"
                          name={`achievements[${index}].description`}
                          value={achievement.description}
                          autoComplete="off"
                          placeholder="Describe the achievement or certificate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].description &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].description ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].description}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Type of Achievement/Certification:</label>
                        <Field
                          type="text"
                          name={`achievements[${index}].type`}
                          value={achievement.type}
                          autoComplete="off"
                          placeholder="Enter type (e.g., competition, certification)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].type &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].type ? (
                          <p className="text-danger">
                            {errors.achievements[index].type}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Provider/Organizer:</label>
                        <Field
                          type="text"
                          name={`achievements[${index}].provider`}
                          value={achievement.provider}
                          autoComplete="off"
                          placeholder="Enter provider (e.g., school, organization)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].provider &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].type ? (
                          <p className="text-danger">
                            {errors.achievements[index].provider}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Date of Achievement:</label>
                        <Field
                          type="date"
                          name={`achievements[${index}].date`}
                          value={achievement.date}
                          autoComplete="off"
                          placeholder="Enter date of achievement or certification"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].date &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].date ? (
                          <p className="text-danger">
                            {errors.achievements[index].date}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Duration (for courses):</label>
                        <Field
                          type="text"
                          name={`achievements[${index}].duration`}
                          value={achievement.duration}
                          autoComplete="off"
                          placeholder="Enter duration (for e.g. 1 month,1 year)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].duration &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].duration ? (
                          <p className="text-danger">
                            {errors.achievements[index].duration}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Platform/Website:</label>
                        <Field
                          type="text"
                          name={`achievements[${index}].platform`}
                          value={achievement.platform}
                          autoComplete="off"
                          placeholder="Enter platform or context"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].platform &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].platform ? (
                          <p className="text-danger">
                            {errors.achievements[index].platform}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label>Skills/Knowledge Gained:</label>
                        <Field
                          as="textarea"
                          name={`achievements[${index}].skills`}
                          value={achievement.skills}
                          autoComplete="off"
                          placeholder="List relevant skills acquired"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].skills &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index].skills ? (
                          <p className="text-danger">
                            {errors.achievements[index].skills}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label>Certificate URL:</label>
                        <Field
                          type="url"
                          name={`achievements[${index}].certificateURL`}
                          value={achievement.certificateURL}
                          autoComplete="off"
                          placeholder="Enter certificate URL"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievements &&
                        errors.achievements[index] &&
                        errors.achievements[index].certificateURL &&
                        touched.achievements &&
                        touched.achievements[index] &&
                        touched.achievements[index]
                          .certificateURL ? (
                          <p className="text-danger">
                            { errors.achievements[index].certificateURL }
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <Label required={false}>Achievement Certificate: </Label>
                        <input
                          type="file"
                          id={`achievements.[${index}].achievementCertificate`}
                          name={`achievements.[${index}].achievementCertificate`}
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => {
                            const achievementCertificate = e.currentTarget.files[0];
                            setFieldValue(`achievements.[${index}].achievementCertificate`, achievementCertificate);
                          }}
                          className="input-field-small"
                        />

                        <ErrorMessage name={`achievements[${index}].achievementCertificate`} component="div" className="text-danger" /> {/* Corrected */}
                        {achievementCertificate && <img src={achievementCertificate} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                      </div>

                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        title: "",
                        description: "",
                        type: "",
                        provider: "",
                        date: "",
                        duration: "",
                        platform: "",
                        skills: "",
                        achievementCertificate: null,
                        certificateURL: "",
                      })
                    }
                  >
                    Add Achievement
                  </button>
                </fieldset>
              )}
            </FieldArray>
            <br />
            <FieldArray name="internships">
              {({ push, remove }) => (
                <fieldset className="fieldset">
                  <legend>
                    <u>Intership Details</u>
                  </legend>
                  {values.internships.map((internship, index) => (
                    <div key={index}>
                      <div>
                        <label>{`Internship Title ${index + 1}:`}</label>
                        <Field
                          type="text"
                          name={`internships[${index}].internshiptitle`}
                          value={internship.internshiptitle}
                          autoComplete="off"
                          placeholder="Enter internship title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.internships &&
                        errors.internships[index] &&
                        errors.internships[index].internshiptitle &&
                        touched.internships &&
                        touched.internships[index] &&
                        touched.internships[index].internshiptitle ? (
                          <p className="text-danger">
                            {errors.internships[index].internshiptitle}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Company/Organization:</label>
                        <Field
                          type="text"
                          name={`internships[${index}].company`}
                          value={internship.company}
                          autoComplete="off"
                          placeholder="Enter company or organization name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.internships &&
                        errors.internships[index] &&
                        errors.internships[index].company &&
                        touched.internships &&
                        touched.internships[index] &&
                        touched.internships[index].company ? (
                          <p className="text-danger">
                            {errors.internships[index].company}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Internship Duration:</label>
                        <div>
                          <label>Start Date</label>
                          <Field
                            type="date"
                            name={`internships[${index}].startDate`}
                            value={internship.startDate}
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.internships &&
                          errors.internships[index] &&
                          errors.internships[index].startDate &&
                          touched.internships &&
                          touched.internships[index] &&
                          touched.internships[index].startDate ? (
                            <p className="text-danger">
                              {errors.internships[index].startDate}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label>End Date</label>
                          <Field
                            type="date"
                            name={`internships[${index}].endDate`}
                            value={internship.endDate}
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.internships &&
                          errors.internships[index] &&
                          errors.internships[index].endDate &&
                          touched.internships &&
                          touched.internships[index] &&
                          touched.internships[index].endDate ? (
                            <p className="text-danger">
                              {errors.internships[index].endDate}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <label>Role/Responsibilities:</label>
                        <Field
                          as="textarea"
                          name={`internships[${index}].responsibilities`}
                          value={internship.responsibilities}
                          autoComplete="off"
                          placeholder="Describe responsibilities"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.internships &&
                        errors.internships[index] &&
                        errors.internships[index].responsibilities &&
                        touched.internships &&
                        touched.internships[index] &&
                        touched.internships[index].responsibilities ? (
                          <p className="text-danger">
                            {errors.internships[index].responsibilities}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Achievements:</label>
                        <Field
                          as="textarea"
                          name={`internships[${index}].achievements`}
                          value={internship.achievements}
                          autoComplete="off"
                          placeholder="List achievements during internship"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.internships &&
                        errors.internships[index] &&
                        errors.internships[index].achievements &&
                        touched.internships &&
                        touched.internships[index] &&
                        touched.internships[index].achievements ? (
                          <p className="text-danger">
                            {errors.internships[index].achievements}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Supervisor/Mentor:</label>
                        <Field
                          type="text"
                          name={`internships[${index}].supervisor`}
                          value={internship.supervisor}
                          autoComplete="off"
                          placeholder="Enter supervisor's name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.internships &&
                        errors.internships[index] &&
                        errors.internships[index].supervisor &&
                        touched.internships &&
                        touched.internships[index] &&
                        touched.internships[index].supervisor ? (
                          <p className="text-danger">
                            {errors.internships[index].supervisor}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Feedback or Evaluation:</label>
                        <Field
                          as="textarea"
                          name={`internships[${index}].feedback`}
                          value={internship.feedback}
                          autoComplete="off"
                          placeholder="Provide feedback or evaluation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.internships &&
                        errors.internships[index] &&
                        errors.internships[index].feedback &&
                        touched.internships &&
                        touched.internships[index] &&
                        touched.internships[index].feedback ? (
                          <p className="text-danger">
                            {errors.internships[index].feedback}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <Label required={false}>Internship Certificate: </Label>
                        <input
                          type="file"
                          id={`internships.[${index}].internshipCertificate`}
                          name={`internships.[${index}].internshipCertificate`}
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => {
                            const internshipCertificate = e.currentTarget.files[0];
                            setFieldValue(`internships.[${index}].internshipCertificate`, internshipCertificate);
                          }}
                          className="input-field-small"
                        />

                        <ErrorMessage name={`internships[${index}].internshipCertificate`} component="div" className="text-danger" />
                        {internshipCertificate && <img src={internshipCertificate} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                      </div>

                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        internshiptitle: "",
                        company: "",
                        startDate: "",
                        endDate: "",
                        responsibilities: "",
                        achievement: "",
                        supervisor: "",
                        feedback: "",
                        internshipCertificate: null,
                      })
                    }
                  >
                    Add Internship
                  </button>
                </fieldset>
              )}
            </FieldArray>

            <br />
            <FieldArray name="exams">
              {({ push, remove }) => (
                <fieldset className="fieldset">
                  <legend>
                    <u>Entrance Exam Details</u>
                  </legend>

                  {values.exams.map((exam, index) => (
                    <div key={index}>
                      <div>
                        <label>{`Exam Name  ${index + 1}:`}</label>
                        <Field
                          type="text"
                          name={`exams[${index}].examName`}
                          value={exam.examName}
                          autoComplete="off"
                          placeholder="Enter exam name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.exams &&
                        errors.exams[index] &&
                        errors.exams[index].examName &&
                        touched.exams &&
                        touched.exams[index] &&
                        touched.exams[index].examName ? (
                          <p className="text-danger">
                            {errors.exams[index].examName}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Exam Date:</label>
                        <Field
                          type="date"
                          name={`exams[${index}].examDate`}
                          value={exam.examDate}
                          autoComplete="off"
                          placeholder="Enter exam date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.exams &&
                        errors.exams[index] &&
                        errors.exams[index].examDate &&
                        touched.exams &&
                        touched.exams[index] &&
                        touched.exams[index].examDate ? (
                          <p className="text-danger">
                            {errors.exams[index].examDate}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Score:</label>
                        <Field
                          type="text"
                          name={`exams[${index}].score`}
                          value={exam.score}
                          autoComplete="off"
                          placeholder="Enter score obtained"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.exams &&
                        errors.exams[index] &&
                        errors.exams[index].score &&
                        touched.exams &&
                        touched.exams[index] &&
                        touched.exams[index].score ? (
                          <p className="text-danger">
                            {errors.exams[index].score}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Rank (required):</label>
                        <Field
                          type="text"
                          name={`exams[${index}].rank`}
                          value={exam.rank}
                          autoComplete="off"
                          placeholder="Enter rank"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.exams &&
                        errors.exams[index] &&
                        errors.exams[index].rank &&
                        touched.exams &&
                        touched.exams[index] &&
                        touched.exams[index].rank ? (
                          <p className="text-danger">
                            {errors.exams[index].rank}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Percentile (required):</label>
                        <Field
                          type="text"
                          name={`exams[${index}].percentile`}
                          value={exam.percentile}
                          autoComplete="off"
                          placeholder="Enter percentiles"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.exams &&
                        errors.exams[index] &&
                        errors.exams[index].percentile &&
                        touched.exams &&
                        touched.exams[index] &&
                        touched.exams[index].percentile ? (
                          <p className="text-danger">
                            {errors.exams[index].percentile}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <Label required={false}>Exam Certificate: </Label>
                        <input
                          type="file"
                          id={`exams.[${index}].examCertificate`}
                          name={`exams.[${index}].examCertificate`}
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => {
                            const examCertificate = e.currentTarget.files[0];
                            setFieldValue(`exams.[${index}].examCertificate`, examCertificate);
                          }}
                          className="input-field-small"
                        />

                        <ErrorMessage name={`exams[${index}].examCertificate`} component="div" className="text-danger" />
                        {examCertificate && <img src={examCertificate} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                      </div>

                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        examName: "",
                        examDate: "",
                        score: "",
                        rank: "",
                        percentile: "",
                        examCertificate: null,
                      })
                    }
                  >
                    Add Exams
                  </button>
                </fieldset>
              )}
            </FieldArray>

            <br />
            <button type="submit" disabled={isSubmitting} className="submit-button">
            Save & Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AchievementForm;
