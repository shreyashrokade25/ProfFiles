import React, { useContext } from "react";
import "../components/styles.css";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { TempStorage } from './TempStorage';
import Label from './Label';

function AchievementForm() {
  const {setAchievementData, setInternshipData, setExamData } = useContext(TempStorage); // Use the context
  const navigate = useNavigate();

  const initialValues = {
    achievementscertificate: [
      {
        title: "",
        description: "",
        type: "",
        provider: "",
        date: "",
        duration: "",
        platform: "",
        certificateURL: "",
        skills: "",
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
        certificate: "",
      },
    ],
    exams: [{

      examName: "",
      examDate: "",
      score: "",
      rank: "",
      percentile: "",

    },],

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
    //   score: Yup.string()
    //     .required("Score is required")
    //     .matches(/^\d+$/, "Score only numbers are allowed"),
    //   rank: Yup.string()
    //     .required("Rank is required")
    //     .matches(/^\d+$/, "Rank only numbers are allowed"),
    //   percentile: Yup.string()
    //     .required("Percentile is required")
    //     .matches(/^\d+$/, "Percentage only numbers are allowed")
    //     .min(0, "Percentage cannot be less than 0")
    //     .max(100, "Percentage cannot be greater than 100"),
    //   })
    // ),

  });

 const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log("Achievement/Certification Details: ", values);
    // console.log("Achievement Data", achievementData);

    try {
      const combinedData = {
        achievementsCertificates: values.achievementscertificate,
        internships: values.internships,
        exams: values.exams,
       };
       
       // Update the context with all combined data
       setAchievementData(combinedData.achievementsCertificates);
       setInternshipData(combinedData.internships); // Assuming you have setInternshipData in your context
       setExamData(combinedData.exams); // Assuming you have setExamData in your context
       
       // Pass all combined data in the navigation state
       navigate('/add-ProjectDetails', { state: { combinedData } });
       
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
        {({ isSubmitting, values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <FieldArray name="achievementscertificate">
              {({ push, remove }) => (
                <fieldset className="fieldset">
                  <legend>
                    <u>Achievement/Certification Details</u>
                  </legend>
                  {values.achievementscertificate.map((achievement, index) => (
                    <div key={index}>

                      <div>
                        <label>{`Achievement Title ${index + 1}:`}</label>
                        <Field
                          type="text"
                          name={`achievementscertificate[${index}].title`}
                          value={achievement.title || ""}
                          autoComplete="off"
                          placeholder="Enter title of achievement or certificate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].title &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].title ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].title}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Achievement Description:</label>
                        <Field
                          as="textarea"
                          name={`achievementscertificate[${index}].description`}
                          value={achievement.description}
                          autoComplete="off"
                          placeholder="Describe the achievement or certificate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].description &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].description ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].description}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Type of Achievement/Certification:</label>
                        <Field
                          type="text"
                          name={`achievementscertificate[${index}].type`}
                          value={achievement.type}
                          autoComplete="off"
                          placeholder="Enter type (e.g., competition, certification)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].type &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].type ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].type}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Provider/Organizer:</label>
                        <Field
                          type="text"
                          name={`achievementscertificate[${index}].provider`}
                          value={achievement.provider}
                          autoComplete="off"
                          placeholder="Enter provider (e.g., school, organization)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].provider &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].type ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].provider}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Date of Achievement:</label>
                        <Field
                          type="date"
                          name={`achievementscertificate[${index}].date`}
                          value={achievement.date}
                          autoComplete="off"
                          placeholder="Enter date of achievement or certification"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].date &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].date ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].date}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Duration (for courses):</label>
                        <Field
                          type="text"
                          name={`achievementscertificate[${index}].duration`}
                          value={achievement.duration}
                          autoComplete="off"
                          placeholder="Enter duration (for e.g. 1 month,1 year)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].duration &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].duration ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].duration}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Platform/Website:</label>
                        <Field
                          type="text"
                          name={`achievementscertificate[${index}].platform`}
                          value={achievement.platform}
                          autoComplete="off"
                          placeholder="Enter platform or context"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].platform &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].platform ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].platform}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Certificate URL:</label>
                        <Field
                          type="url"
                          name={`achievementscertificate[${index}].certificateURL`}
                          value={achievement.certificateURL}
                          autoComplete="off"
                          placeholder="Enter certificate URL"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].certificateURL &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index]
                            .certificateURL ? (
                          <p className="text-danger">
                            {
                              errors.achievementscertificate[index]
                                .certificateURL
                            }
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Skills/Knowledge Gained:</label>
                        <Field
                          as="textarea"
                          name={`achievementscertificate[${index}].skills`}
                          value={achievement.skills}
                          autoComplete="off"
                          placeholder="List relevant skills acquired"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.achievementscertificate &&
                          errors.achievementscertificate[index] &&
                          errors.achievementscertificate[index].skills &&
                          touched.achievementscertificate &&
                          touched.achievementscertificate[index] &&
                          touched.achievementscertificate[index].skills ? (
                          <p className="text-danger">
                            {errors.achievementscertificate[index].skills}
                          </p>
                        ) : null}
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
                        certificateURL: "",
                        skills: "",
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
                        <label>Certificate (required):</label>
                        <Field
                          type="file"
                          name={`internships[${index}].certificate`}
                          value={internship.certificate}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.internships &&
                          errors.internships[index] &&
                          errors.internships[index].certificate &&
                          touched.internships &&
                          touched.internships[index] &&
                          touched.internships[index].certificate ? (
                          <p className="text-danger">
                            {errors.internships[index].certificate}
                          </p>
                        ) : null}
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
                        certificate: "",
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

                      })
                    }
                  >
                    Add Exams
                  </button>

                </fieldset>

              )}

            </FieldArray>

            <br />
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AchievementForm;
