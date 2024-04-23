import React, { useContext } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { TempStorage } from './TempStorage';

function EducationalDetailsForm() {

  const { setCurrentCourseData, setPastQualificationData } = useContext(TempStorage)
  const navigate = useNavigate();

  const initialValues = {

    admissionYear: "",
    instituteState: "",
    instituteDistrict: "",
    instituteTaluka: "",
    qualificationLevel: "",
    stream: "",
    collegeName: "",
    courseName: "",
    cetMeritPercentageClatScore: "",
    applicationId: "",
    yearOfStudy: "",
    completedOrContinue: "",
    gapYears: "",
    mode: "",
    result: "",

    pastQualifications: [
      {
        qualificationLevel: "",
        stream: "",
        instituteState: "",
        instituteDistrict: "",
        instituteTaluka: "",
        collegeName: "",
        course: "",
        boardUniversity: "",
        mode: "",
        admissionYear: "",
        passingYear: "",
        result: "",
        percentage: "",
        attempts: "",
        marksheet: "",
        gap: "",
      },
    ],
  };


  const validationSchema = Yup.object().shape({
    // admissionYear: Yup.string()
    // .required("Admission Year is required")
    // .matches(/^[0-9]{4}$/, "Only numbers allowed and must eactly be four digits"),

    // instituteState: Yup.string().required("Institute State is required"),
    // instituteDistrict: Yup.string().required("Institute District is required"),
    // instituteTaluka: Yup.string().required("Institute Taluka is required"),
    // qualificationLevel: Yup.string().required(
    //   "Qualification Level is required"
    // ),
    // stream: Yup.string().required("Stream is required"),
    // collegeName: Yup.string().required("College Name is required"),
    // courseName: Yup.string().required("Course Name is required"),
    // cetMeritPercentageClatScore: Yup.string()
    //   .required("Cet Merit Percentage/Clat Score is required")
    //   .matches(
    //     /^\d+(\.\d{1,7})?$/,
    //     "Only numbers with up to seven decimal points allowed"
    //   ),
    // applicationId: Yup.string()
    //   .required(
    //     "Application Admission ID/CAP ID/CLAT Admit Card No is required"
    //   )
    //   .matches(/^[0-9]+$/, "Only numbers are allowed")
    //   .required("Admission Year is required"),
    // yearOfStudy: Yup.string()
    //   .required("Year Of Study is required"),

    // completedOrContinue: Yup.string().required(
    //   "Completed Or Pursuing is required"
    // ),
    // gapYears: Yup.string()
    //   .required("Gap Years is required")
    //   .matches(/^[0-9]+$/, "Only numbers are allowed"),
    // mode: Yup.string().required("Mode is required"),
    // result: Yup.string().required("Sem wise results are required"),
    // pastQualifications: Yup.array().of(
    //   Yup.object().shape({
    //     qualificationLevel: Yup.string().required(
    //       "Qualification Level is required"
    //     ),
    //     stream: Yup.string().required("Stream is required"),
    //     instituteState: Yup.string().required("Institute State is required"),
    //     instituteDistrict: Yup.string().required(
    //       "Institute District is required"
    //     ),
    //     instituteTaluka: Yup.string().required("Institute Taluka is required"),
    //     collegeName: Yup.string().required("College Name is required"),
    //     course: Yup.string().required("Course is required"),
    //     boardUniversity: Yup.string().required("Board/University is required"),
    //     mode: Yup.string().required("Mode is required"),
    //     admissionYear: Yup.string()
    //     .required("Admission Year is required")
    //     .matches(/^[0-9]+$/, "Only numbers are allowed")
    //     .matches(/^\d{4}$/, "Admission Year must be exactly 4 digits"),
    //       passingYear: Yup.string()
    //       .required("Passing Year is required")
    //       .matches(/^[0-9]+$/, "Only numbers are allowed")
    //       .matches(/^\d{4}$/, "Passing Year must be exactly 4 digits"),

    //       result: Yup.mixed().required("Result is required"),

    //     percentage: Yup.number()
    //       .typeError("Only numbers are allowed")
    //       .required("Percentage is required")
    //       .max(100, "Percentage should not exceed 100"),

    //     attempts: Yup.string()
    //       .required("Attempts is required")
    //       .matches(/^[0-9]+$/, "Only numbers are allowed"),
    //     marksheet: Yup.mixed().required("Marksheet is required"),
    //     gap: Yup.string().required("Gap is required"),
    //   })
    // ),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      const combinedData = {
        currentCourse: values,
        pastQualifications: values.pastQualifications,
      };

      // Update the context with all combined data
      console.log("Education Details:", values);
      setCurrentCourseData(combinedData.currentCourse); // This is a simplified example. Adjust according to your actual data structure.
      setPastQualificationData(combinedData.pastQualifications);
      navigate('/add-CurricularDetails', { state: { combinedData } });
    }
    catch (e) {
      console.log(e);
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
          errors,
          touched,
          handleBlur,
          values,
          handleChange,
          isSubmitting,
        }) => (
          <Form>
            {/* Current Course */}
            <fieldset className="fieldset">
              <legend>Current Course</legend>
              <div>
                <label>Admission Year In Current Course:</label>
                <Field type="text" name="admissionYear" className="input-field" />
                <ErrorMessage name="admissionYear" component="div" className="text-danger" />
              </div>
              <div>
                <label>Institute State:</label>
                <Field type="text" name="instituteState" className="input-field" />
                <ErrorMessage name="instituteState" component="div" className="text-danger" />
              </div>
              <div>
                <label>Institute District:</label>
                <Field type="text" name="instituteDistrict" className="input-field" />
                <ErrorMessage name="instituteDistrict" component="div" className="text-danger" />
              </div>
              <div>
                <label>Institute Taluka:</label>
                <Field type="text" name="instituteTaluka" className="input-field" />
                <ErrorMessage name="instituteTaluka" component="div" className="text-danger" />
              </div>
              <div>
                <label>Qualification Level:</label>
                <Field type="text" name="qualificationLevel" className="input-field" />
                <ErrorMessage name="qualificationLevel" component="div" className="text-danger" />
              </div>
              <div>
                <label>Stream:</label>
                <Field type="text" name="stream" className="input-field" />
                <ErrorMessage name="stream" component="div" className="text-danger" />
              </div>
              <div>
                <label>College Name / School Name:</label>
                <Field type="text" name="collegeName" className="input-field" />
                <ErrorMessage name="collegeName" component="div" className="text-danger" />
              </div>
              <div>
                <label>Course Name:</label>
                <Field type="text" name="courseName" className="input-field" />
                <ErrorMessage name="courseName" component="div" className="text-danger" />
              </div>
              <div>
                <label>CET / Merit Percentage / CLAT Score:</label>
                <Field type="text" name="cetMeritPercentageClatScore" className="input-field" />
                <ErrorMessage name="cetMeritPercentageClatScore" component="div" className="text-danger" />
              </div>
              <div>
                <label>Application Admission ID/CAP ID/CLAT Admit Card No:</label>
                <Field type="text" name="applicationId" className="input-field" />
                <ErrorMessage name="applicationId" component="div" className="text-danger" />
              </div>
              <div>
                <label>Year Of Study:</label>
                <Field type="text" name="yearOfStudy" className="input-field" />
                <ErrorMessage name="yearOfStudy" component="div" className="text-danger" />
              </div>
              <div>
                <label>Completed Or Pursuing:</label>
                <Field type="radio" as="select" name="completedOrContinue" className="input-field">
                  <option value="completed">Completed</option>
                  <option value="pursuing">Pursuing</option>
                </Field>
                <ErrorMessage name="completedOrContinue" component="div" className="text-danger" />
              </div>
              <div>
                <label>Gap Years:</label>
                <Field type="text" name="gapYears" className="input-field" />
                <ErrorMessage name="gapYears" component="div" className="text-danger" />
              </div>
              <div>
                <label>Mode (Regular/Distance):</label>
                <Field type="radio" as="select" name="mode" className="input-field">
                  <option value="Regular">Regular</option>
                  <option value="Distance">Distance</option>
                </Field>
                <ErrorMessage name="mode" component="div" className="text-danger" />
              </div>
              <div>
                <label>Results (Sem wise with Image):</label>
                <Field type="file" name="result" accept=".pdf,.jpg,.jpeg" className="input-field" />
                <ErrorMessage name="result" component="div" className="text-danger" />
              </div>
            </fieldset>

            <br />

            <FieldArray name="pastQualifications">
              {({ push, remove }) => (
                <fieldset className="fieldset">
                  <legend>Past Qualifications</legend>
                  <label className="instruction">
                    Fill in the SSC, HSC, and Graduation details.
                  </label>
                  <br />
                  <label className="instruction">
                    Click on "Add Qualifications" everytime to add
                    qualifications.
                  </label>
                  <br />
                  {values.pastQualifications.map((qualification, index) => (
                    <div key={index}>
                      <div>
                        <label>Qualification Level:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].qualificationLevel`}
                          value={qualification.qualificationLevel}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.qualificationLevel &&
                          touched.qualificationLevel ? (
                          <p className="text-danger">
                            {errors.qualificationLevel}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Stream:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].stream`}
                          value={qualification.stream}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.stream && touched.stream ? (
                          <p className="text-danger">{errors.stream}</p>
                        ) : null}
                      </div>
                      <div>
                        <label>Institute State:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].instituteState`}
                          value={qualification.instituteState}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.instituteState && touched.instituteState ? (
                          <p className="text-danger">{errors.instituteState}</p>
                        ) : null}
                      </div>
                      <div>
                        <label>Institute District:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].instituteDistrict`}
                          value={qualification.instituteDistrict}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.instituteDistrict &&
                          touched.instituteDistrict ? (
                          <p className="text-danger">
                            {errors.instituteDistrict}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Institute Taluka:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].instituteTaluka`}
                          value={qualification.instituteTaluka}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.instituteTaluka && touched.instituteTaluka ? (
                          <p className="text-danger">
                            {errors.instituteTaluka}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>College Name / School Name:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].collegeName`}
                          value={qualification.collegeName}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.collegeName && touched.collegeName ? (
                          <p className="text-danger">{errors.collegeName}</p>
                        ) : null}
                      </div>
                      <div>
                        <label>Course:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].course`}
                          value={qualification.course}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {/* Access errors for the specific field */}
                        {errors.pastQualifications &&
                          errors.pastQualifications[index] &&
                          errors.pastQualifications[index].course && (
                            // Correct way to access errors
                            <p className="text-danger">
                              {errors.pastQualifications[index].course}
                            </p>
                          )}
                      </div>
                      <div>
                        <label>Board/University:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].boardUniversity`}
                          value={qualification.boardUniversity}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {/* Access errors for the specific field */}
                        {errors.pastQualifications &&
                          errors.pastQualifications[index] &&
                          errors.pastQualifications[index].boardUniversity && (
                            // Correct way to access errors
                            <p className="text-danger">
                              {errors.pastQualifications[index].boardUniversity}
                            </p>
                          )}
                      </div>
                      <div>
                        <label>Mode (Regular/Distance):</label>
                        <br />
                        <label
                          style={{ marginRight: "10px", fontWeight: "normal" }}
                        >
                          <input
                            type="radio"
                            name={`pastQualifications[${index}].mode`}
                            value="Regular"
                            checked={qualification.mode === "Regular"}
                            onChange={(e) => handleChange(e, index)}
                            onBlur={handleBlur}
                          />
                          Regular
                        </label>
                        <label style={{ fontWeight: "normal" }}>
                          <input
                            type="radio"
                            name={`pastQualifications[${index}].mode`}
                            value="Distance"
                            checked={qualification.mode === "Distance"}
                            onChange={(e) => handleChange(e, index)}
                          />
                          Distance
                        </label>
                        {errors.mode && touched.mode ? (
                          <p className="text-danger">{errors.mode}</p>
                        ) : null}
                      </div>
                      <div>
                        <label>Admission Year:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].admissionYear`}
                          value={qualification.admissionYear}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.admissionYear && touched.admissionYear ? (
                          <p className="text-danger">{errors.admissionYear}</p>
                        ) : null}
                      </div>
                      <div>
                        <label>Passing Year:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].passingYear`}
                          value={qualification.passingYear}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {/* Access errors for the specific field */}
                        {errors.pastQualifications &&
                          errors.pastQualifications[index] &&
                          errors.pastQualifications[index].passingYear && (
                            // Correct way to access errors
                            <p className="text-danger">
                              {errors.pastQualifications[index].passingYear}
                            </p>
                          )}
                      </div>
                      <div>
                        <label>Result:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].result`}
                          value={qualification.result}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {/* Access errors for the specific field */}
                        {errors.pastQualifications &&
                          errors.pastQualifications[index] &&
                          errors.pastQualifications[index].result && (
                            // Correct way to access errors
                            <p className="text-danger">
                              {errors.pastQualifications[index].result}
                            </p>
                          )}
                      </div>
                      <div>
                        <label>Percentage:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].percentage`}
                          value={qualification.percentage}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {/* Access errors for the specific field */}
                        {errors.pastQualifications &&
                          errors.pastQualifications[index] &&
                          errors.pastQualifications[index].percentage && (
                            // Correct way to access errors
                            <p className="text-danger">
                              {errors.pastQualifications[index].percentage}
                            </p>
                          )}
                      </div>
                      <div>
                        <label>Attempts:</label>
                        <input
                          type="text"
                          name={`pastQualifications[${index}].attempts`}
                          value={qualification.attempts}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {/* Access errors for the specific field */}
                        {errors.pastQualifications &&
                          errors.pastQualifications[index] &&
                          errors.pastQualifications[index].attempts && (
                            // Correct way to access errors
                            <p className="text-danger">
                              {errors.pastQualifications[index].attempts}
                            </p>
                          )}
                      </div>
                      <div>
                        <label>Upload Marksheet:</label>
                        <input
                          type="file"
                          name={`pastQualifications[${index}].marksheet`}
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {/* Access errors for the specific field */}
                        {errors.pastQualifications &&
                          errors.pastQualifications[index] &&
                          errors.pastQualifications[index].marksheet && (
                            // Correct way to access errors
                            <p className="text-danger">
                              {errors.pastQualifications[index].marksheet}
                            </p>
                          )}
                      </div>
                      <div>
                        <label>Was any Gap in this Qualification/Course?</label>
                        <br />
                        <label
                          style={{ marginRight: "10px", fontWeight: "normal" }}
                        >
                          <input
                            type="radio"
                            name={`pastQualifications[${index}].gap`}
                            value="Yes"
                            checked={qualification.gap === "Yes"}
                            onChange={(e) => handleChange(e, index)}
                            onBlur={handleBlur}
                          />
                          Yes
                        </label>
                        <label style={{ fontWeight: "normal" }}>
                          <input
                            type="radio"
                            name={`pastQualifications[${index}].gap`}
                            value="No"
                            checked={qualification.gap === "No"}
                            onChange={(e) => handleChange(e, index)}
                          />
                          No
                        </label>
                      </div>
                      {/* Access errors for the specific field */}
                      {errors.pastQualifications &&
                        errors.pastQualifications[index] &&
                        errors.pastQualifications[index].gap && (
                          // Correct way to access errors
                          <p className="text-danger">
                            {errors.pastQualifications[index].gap}
                          </p>
                        )}
                      <br />
                      <button
                        className="btn"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <br />
                  <button
                    className="btn"
                    type="button"
                    onClick={() => push({})}
                  >
                    Add Qualification
                  </button>
                </fieldset>
              )}
            </FieldArray>
            <br />

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting" : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EducationalDetailsForm;
