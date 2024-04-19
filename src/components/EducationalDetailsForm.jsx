import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./styles.css";

function EducationalDetailsForm() {
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
    admissionYear: Yup.string()
      .required("Admission Year is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .required("Admission Year is required"),

    instituteState: Yup.string().required("Institute State is required"),
    instituteDistrict: Yup.string().required("Institute District is required"),
    instituteTaluka: Yup.string().required("Institute Taluka is required"),
    qualificationLevel: Yup.string().required(
      "Qualification Level is required"
    ),
    stream: Yup.string().required("Stream is required"),
    collegeName: Yup.string().required("College Name is required"),
    courseName: Yup.string().required("Course Name is required"),
    cetMeritPercentageClatScore: Yup.string()
      .required("CET/Merit Percentage/CLAT Score is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed"),
    applicationId: Yup.string()
      .required(
        "Application Admission ID/CAP ID/CLAT Admit Card No is required"
      )
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .required("Admission Year is required"),
    yearOfStudy: Yup.string().required("Year Of Study is required"),
    completedOrContinue: Yup.string().required(
      "Completed Or Pursuing is required"
    ),
    gapYears: Yup.string()
      .required("Gap Years is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed"),
    mode: Yup.string().required("Mode is required"),
    pastQualifications: Yup.array().of(
      Yup.object().shape({
        qualificationLevel: Yup.string().required(
          "Qualification Level is required"
        ),
        stream: Yup.string().required("Stream is required"),
        instituteState: Yup.string().required("Institute State is required"),
        instituteDistrict: Yup.string().required(
          "Institute District is required"
        ),
        instituteTaluka: Yup.string().required("Institute Taluka is required"),
        collegeName: Yup.string().required("College Name is required"),
        course: Yup.string().required("Course is required"),
        boardUniversity: Yup.string().required("Board/University is required"),
        mode: Yup.string().required("Mode is required"),
        admissionYear: Yup.string()
          .required("Admission Year is required")
          .matches(/^[0-9]+$/, "Only numbers are allowed"),
        passingYear: Yup.string().required("Passing Year is required"),
        result: Yup.mixed().required("Result is required"),
        percentage: Yup.string()
          .required("Percentage is required")
          .matches(/^[0-9]+$/, "Only numbers are allowed"),
        attempts: Yup.string()
          .required("Attempts is required")
          .matches(/^[0-9]+$/, "Only numbers are allowed"),
        marksheet: Yup.mixed().required("Marksheet is required"),
        gap: Yup.string().required("Gap is required"),
      })
    ),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("handleSubmit function triggered");
    console.log("Form values:", values);
    axios
      .post("/api/formdata", values)
      .then((response) => {
        console.log("Form data submitted successfully:", response.data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
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
                <input
                  type="text"
                  name="admissionYear"
                  value={values.admissionYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.admissionYear && touched.admissionYear ? (
                  <p className="text-danger">{errors.admissionYear}</p>
                ) : null}
              </div>
              <div>
                <label>Institute State:</label>
                <input
                  type="text"
                  name="instituteState"
                  value={values.instituteState}
                  onChange={handleChange}
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
                  name="instituteDistrict"
                  value={values.instituteDistrict}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.instituteDistrict && touched.instituteDistrict ? (
                  <p className="text-danger">{errors.instituteDistrict}</p>
                ) : null}
              </div>
              <div>
                <label>Institute Taluka:</label>
                <input
                  type="text"
                  name="instituteTaluka"
                  value={values.instituteTaluka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.instituteTaluka && touched.instituteTaluka ? (
                  <p className="text-danger">{errors.instituteTaluka}</p>
                ) : null}
              </div>
              <div>
                <label>Qualification Level:</label>
                <input
                  type="text"
                  name="qualificationLevel"
                  value={values.qualificationLevel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.qualificationLevel && touched.qualificationLevel ? (
                  <p className="text-danger">{errors.qualificationLevel}</p>
                ) : null}
              </div>
              <div>
                <label>Stream:</label>
                <input
                  type="text"
                  name="stream"
                  value={values.stream}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.stream && touched.stream ? (
                  <p className="text-danger">{errors.stream}</p>
                ) : null}
              </div>
              <div>
                <label>College Name / School Name:</label>
                <input
                  type="text"
                  name="collegeName"
                  value={values.collegeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.collegeName && touched.collegeName ? (
                  <p className="text-danger">{errors.collegeName}</p>
                ) : null}
              </div>
              <div>
                <label>Course Name:</label>
                <input
                  type="text"
                  name="courseName"
                  value={values.courseName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.courseName && touched.courseName ? (
                  <p className="text-danger">{errors.courseName}</p>
                ) : null}
              </div>
              <div>
                <label>CET / Merit Percentage / CLAT Score:</label>
                <input
                  type="text"
                  name="cetMeritPercentageClatScore"
                  value={values.cetMeritPercentageClatScore}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cetMeritPercentageClatScore &&
                touched.cetMeritPercentageClatScore ? (
                  <p className="text-danger">
                    {errors.cetMeritPercentageClatScore}
                  </p>
                ) : null}
              </div>
              <div>
                <label>
                  Application Admission ID/CAP ID/CLAT Admit Card No:
                </label>
                <input
                  type="text"
                  name="applicationId"
                  value={values.applicationId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.applicationId && touched.applicationId ? (
                  <p className="text-danger">{errors.applicationId}</p>
                ) : null}
              </div>
              <div>
                <label>Year Of Study:</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={values.yearOfStudy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.yearOfStudy && touched.yearOfStudy ? (
                  <p className="text-danger">{errors.yearOfStudy}</p>
                ) : null}
              </div>
              <div>
                <label>Completed Or Pursuing:</label>
                <br />
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px", fontWeight: "normal" }}>
                    <input
                      type="radio"
                      name="completedOrContinue"
                      value="completed"
                      checked={values.completedOrContinue === "completed"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Completed
                  </label>
                  <label style={{ fontWeight: "normal" }}>
                    <input
                      type="radio"
                      name="completedOrContinue"
                      value="pursuing"
                      checked={values.completedOrContinue === "pursuing"}
                      onChange={handleChange}
                    />
                    Pursuing
                  </label>
                </div>
                {errors.completedOrContinue && touched.completedOrContinue ? (
                  <p className="text-danger">{errors.completedOrContinue}</p>
                ) : null}
                <br />
                <label>Gap Years:</label>
                <input
                  type="text"
                  name="gapYears"
                  value={values.gapYears}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.gapYears && touched.gapYears ? (
                  <p className="text-danger">{errors.gapYears}</p>
                ) : null}
              </div>
              <div>
                <label>Mode (Regular/Distance):</label>
                <br />
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px", fontWeight: "normal" }}>
                    <input
                      type="radio"
                      name="mode"
                      value="Regular"
                      checked={values.mode === "Regular"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Regular
                  </label>
                  <label style={{ fontWeight: "normal" }}>
                    <input
                      type="radio"
                      name="mode"
                      value="Distance"
                      checked={values.mode === "Distance"}
                      onChange={handleChange}
                    />
                    Distance
                  </label>
                </div>
                {errors.mode && touched.mode ? (
                  <p className="text-danger">{errors.mode}</p>
                ) : null}
              </div>
              <br />
              <div>
                <label>Results (Sem wise with Image):</label>
                <input
                  type="file"
                  name="result"
                  accept=".pdf,.jpg,.jpeg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.result && touched.result ? (
                  <p className="text-danger">{errors.result}</p>
                ) : null}
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
                          name={`pastQualifications[${index}].courseName`}
                          value={qualification.course}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={handleBlur}
                        />
                        {errors.courseName && touched.courseName ? (
                          <p className="text-danger">{errors.courseName}</p>
                        ) : null}
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
                        {errors.boardUniversity && touched.boardUniversity ? (
                          <p className="text-danger">
                            {errors.boardUniversity}
                          </p>
                        ) : null}
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
                        {errors.pastQualifications &&
                        errors.pastQualifications[index] &&
                        errors.pastQualifications[index].passingYear &&
                        touched.pastQualifications &&
                        touched.pastQualifications[index] &&
                        touched.pastQualifications[index].passingYear ? (
                          <p className="text-danger">
                            {errors.pastQualifications[index].passingYear}
                          </p>
                        ) : null}
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
                        {errors.pastQualifications &&
                        errors.pastQualifications[index] &&
                        errors.pastQualifications[index].result &&
                        touched.pastQualifications &&
                        touched.pastQualifications[index] &&
                        touched.pastQualifications[index].result ? (
                          <p className="text-danger">
                            {errors.pastQualifications[index].result}
                          </p>
                        ) : null}
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
                        {errors.pastQualifications &&
                        errors.pastQualifications[index] &&
                        errors.pastQualifications[index].percentage &&
                        touched.pastQualifications &&
                        touched.pastQualifications[index] &&
                        touched.pastQualifications[index].percentage ? (
                          <p className="text-danger">
                            {errors.pastQualifications[index].percentage}
                          </p>
                        ) : null}
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
                        {errors.pastQualifications &&
                        errors.pastQualifications[index] &&
                        errors.pastQualifications[index].attempts &&
                        touched.pastQualifications &&
                        touched.pastQualifications[index] &&
                        touched.pastQualifications[index].attempts ? (
                          <p className="text-danger">
                            {errors.pastQualifications[index].attempts}
                          </p>
                        ) : null}
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
                        {errors.pastQualifications &&
                        errors.pastQualifications[index] &&
                        errors.pastQualifications[index].marksheet &&
                        touched.pastQualifications &&
                        touched.pastQualifications[index] &&
                        touched.pastQualifications[index].marksheet ? (
                          <p className="text-danger">
                            {errors.pastQualifications[index].marksheet}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label>Was any Gap in this Qualification/Course?</label>
                        <br />
                        <label
                          style={{ marginRight: "10px", fontWeight: "normal" }}
                        >
                          <input
                            type="radio"
                            name={`pastQualifications[${index}].wasgap`}
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
                      {errors.pastQualifications &&
                      errors.pastQualifications[index] &&
                      errors.pastQualifications[index].gap &&
                      touched.pastQualifications &&
                      touched.pastQualifications[index] &&
                      touched.pastQualifications[index].gap ? (
                        <p className="text-danger">
                          {errors.pastQualifications[index].gap}
                        </p>
                      ) : null}
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
