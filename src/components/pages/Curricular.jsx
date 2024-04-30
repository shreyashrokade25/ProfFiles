import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Label from "../layout/Label"; // Import the Label component
import { useNavigate } from "react-router-dom";
import { TempStorage } from "../TempStorage";
import "../styles/styles.css";

function Curricular() {
  const {
    setClubData,
    setEventData,
    setCommunityServiceData,
    setWorkshopData,
  } = useContext(TempStorage); // Use the context
  const navigate = useNavigate();

  const [eventCertificate, setEventCertificate] = useState(null);
  const [csDocumentation, setCSDocumentation] = useState(null);
  const [workshopDocumentation, setWorkshopDocumentation] = useState(null);

  const initialValues = {
    clubs: [
      {
        clubName: "",
        positionHeld: "",
        activities: ""
      },
    ],
    events: [
      {
        eventName: "",
        eventType: "",
        otherEventType: "",
        participationLevel: "",
        achievement: "",
        yearParticipated: "",
        eventCertificate: null,
      },
    ],
    communityService: [
      {
        activityName: "",
        organization: "",
        description: "",
        duration: { from: "", to: "" },
        impact: "",
        csDocumentation: null,
      },
    ],
    workshops: [
      {
        title: "",
        organizer: "",
        description: "",
        dates: { from: "", to: "" },
        skills: "",
        workshopDocumentation: null,
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    // clubs: Yup.array().of(
    //     Yup.object().shape({
    //         clubName: Yup.string(),
    //         positionHeld: Yup.string(),
    //         activities: Yup.string(),
    //     })
    // ),
    // events: Yup.array().of(
    //     Yup.object().shape({
    //         eventName: Yup.string(),
    //         eventType: Yup.string(),
    //         otherEventType: Yup.string(),
    //         participationLevel: Yup.string(),
    //         achievement: Yup.string(),
    //         yearParticipated: Yup.string().matches(/^[0-9]+$/, 'Year participated should contain only numbers'),
    //         certificate: Yup.string(),
    //     })
    // ),
    // communityServices: Yup.array().of(
    //     Yup.object().shape({
    //         activityName: Yup.string(),
    //         organization: Yup.string(),
    //         description: Yup.string(),
    //         duration: Yup.object().shape({
    //             from: Yup.date(),
    //             to: Yup.date(),
    //         }),
    //         impact: Yup.string(),
    //         documentation: Yup.string(),
    //     })
    // ),
    // workshops: Yup.array().of(
    //     Yup.object().shape({
    //         title: Yup.string(),
    //         organizer: Yup.string(),
    //         description: Yup.string(),
    //         dates: Yup.object().shape({
    //             from: Yup.date(),
    //             to: Yup.date(),
    //         }),
    //         skills: Yup.string(),
    //         documentation: Yup.string(),
    //     })
    // ),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const updatedEvents = values.events.map((event, index) => {
        if (values.events[index].eventCertificate) {
          const eventCertificateUrl = URL.createObjectURL(values.events[index].eventCertificate);
          return { ...event, eventCertificate: eventCertificateUrl };
        }
        return event;
      });
      const updatedCommunityService = values.communityService.map((activity, index) => {
        if (values.communityService[index].csDocumentation) {
          const csDocumentationUrl = URL.createObjectURL(values.communityService[index].csDocumentation);
          return { ...activity, csDocumentation: csDocumentationUrl };
        }
        return activity;
      });
      const updatedWorkshop = values.workshops.map((workshop, index) => {
        if (values.workshops[index].workshopDocumentation) {
          const workshopDocumentationUrl = URL.createObjectURL(values.workshops[index].workshopDocumentation);
          return { ...workshop, workshopDocumentation: workshopDocumentationUrl };
        }
        return workshop;
      });

      const combinedData = {
        clubs: values.clubs,
        events: updatedEvents,
        communityService: updatedCommunityService,
        workshop: updatedWorkshop,
      };

      // Update the context with all combined data
      console.log("Curricular Details:", values);
      setClubData(combinedData.clubs);
      setEventData(combinedData.events);
      setEventCertificate(null);
      setCommunityServiceData(combinedData.communityService);
      setCSDocumentation(null);
      setWorkshopData(combinedData.workshop);
      setWorkshopDocumentation(null);

      // Pass all combined data in the navigation state
      navigate("/add-AchievementDetails", { state: { combinedData } });
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
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <FieldArray name="clubs">
              {(arrayHelpers) => (
                <fieldset className="fieldset">
                  <h3>Curricular & Co-curricular Details</h3>
                  <legend className="legend">
                    Section 1: Clubs & Committees:
                  </legend>
                  {values.clubs.map((club, index) => (
                    <div key={index}>
                      <Label required={false}>Club/Committee Name:</Label>
                      <Field
                        type="text"
                        name={`clubs.${index}.clubName`}
                        placeholder="Club/Committee Name"
                      />
                      <ErrorMessage
                        name={`clubs.${index}.clubName`}
                        component="div"
                        className="error"
                      />

                      <Label required={false}>Position Held:</Label>
                      <Field
                        type="text"
                        name={`clubs.${index}.positionHeld`}
                        placeholder="Position Held"
                      />

                      <Label required={false}>Activities/Contributions:</Label>
                      <Field
                        type="text"
                        name={`clubs.${index}.activities`}
                        placeholder="Activities/Contributions"
                      />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        clubName: "",
                        positionHeld: "",
                        activities: "",
                      })
                    }
                  >
                    Add Club/Committee
                  </button>
                </fieldset>
              )}
            </FieldArray>
            <br />
            <FieldArray name="events">
              {(arrayHelpers) => (
                <fieldset className="fieldset">
                  <legend className="legend">
                    Section 2: Events & Competitions
                  </legend>
                  {values.events.map((event, index) => (
                    <div key={index}>
                      <div>
                        <Label required={false}>Event Name:</Label>
                        <Field
                          type="text"
                          name={`events.${index}.eventName`}
                          placeholder="Event Name"
                        />
                        <ErrorMessage
                          name={`events.${index}.eventName`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Event Type:</Label>
                        <Field as="select" name={`events.${index}.eventType`}>
                          <option value="Debate">Debate</option>
                          <option value="Sports">Sports</option>
                          <option value="Arts">Arts</option>
                          <option value="Music">Music</option>
                          <option value="Drama">Drama</option>
                          <option value="Science Fair">Science Fair</option>
                          <option value="Quiz Competition">
                            Quiz Competition
                          </option>
                          <option value="Cultural Event">Cultural Event</option>
                          <option value="Hackathon">Hackathon</option>
                          <option value="Robotics Competition">
                            Robotics Competition
                          </option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          name={`events.${index}.eventType`}
                          component="div"
                          className="error"
                        />
                        {/* Conditional rendering for Other option */}
                        {event.eventType === "Other" && (
                          <div>
                            <Label required={false}>Other Event Type:</Label>
                            <Field
                              type="text"
                              name={`events.${index}.otherEventType`}
                              placeholder="Specify other event type"
                            />
                            <ErrorMessage
                              name={`events.${index}.otherEventType`}
                              component="div"
                              className="error"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <Label required={false}>Level of Participation:</Label>
                        <Field
                          as="select"
                          name={`events.${index}.participationLevel`}
                        >
                          <option value="Intra-School/College">
                            Intra-School/College
                          </option>
                          <option value="Inter-School/College">
                            Inter-School/College
                          </option>
                          <option value="District">District</option>
                          <option value="Zonal">Zonal</option>
                          <option value="State">State</option>
                          <option value="National">National</option>
                          <option value="International">International</option>
                        </Field>
                        <ErrorMessage
                          name={`events.${index}.participationLevel`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Achievement:</Label>
                        <Field
                          type="text"
                          name={`events.${index}.achievement`}
                          placeholder="Achievement"
                        />
                        <ErrorMessage
                          name={`events.${index}.achievement`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Year Participated:</Label>
                        <Field
                          type="text"
                          name={`events.${index}.yearParticipated`}
                          placeholder="Year Participated"
                        />
                        <ErrorMessage
                          name={`events.${index}.yearParticipated`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Upload Certificate: </Label>
                        <input
                          type="file"
                          id={`events.[${index}].eventCertificate`}
                          name={`events.[${index}].eventCertificate`}
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => {
                            const eventCertificate = e.currentTarget.files[0];
                            setFieldValue(`events.[${index}].eventCertificate`, eventCertificate);
                          }}
                          className="input-field-small"
                        />

                        <ErrorMessage name={`pastQualifications[${index}].marksheet`} component="div" className="text-danger" />
                        {eventCertificate &&
                          <img src={eventCertificate} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                      </div>

                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        eventName: "",
                        eventType: "",
                        otherEventType: "",
                        participationLevel: "",
                        achievement: "",
                        yearParticipated: "",
                        eventCertificate: null,
                      })
                    }
                  >
                    Add Event
                  </button>
                </fieldset>
              )}
            </FieldArray>
            <br />
            <FieldArray name="communityService">
              {(arrayHelpers) => (
                <fieldset className="fieldset">
                  <legend className="legend">
                    Section 3: Community Service and Volunteering
                  </legend>
                  {values.communityService.map((activity, index) => (
                    <div key={index}>
                      <div>
                        <Label required={false}>Activity Name:</Label>
                        <Field
                          type="text"
                          name={`communityService.${index}.activityName`}
                          placeholder="Activity Name"
                        />
                        <ErrorMessage
                          name={`communityService.${index}.activityName`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>
                          Organization/Group Involved:
                        </Label>
                        <Field
                          type="text"
                          name={`communityService.${index}.organization`}
                          placeholder="Organization/Group Involved"
                        />
                        <ErrorMessage
                          name={`communityService.${index}.organization`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Description of Activity:</Label>
                        <Field
                          as="textarea"
                          name={`communityService.${index}.description`}
                          placeholder="Description of Activity"
                        />
                        <ErrorMessage
                          name={`communityService.${index}.description`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>
                          Duration of Participation (From - To):
                        </Label>
                        <Field
                          type="date"
                          name={`communityService.${index}.duration.from`}
                          placeholder="Start Date"
                        />
                        <Field
                          type="date"
                          name={`communityService.${index}.duration.to`}
                          placeholder="End Date"
                        />
                        <ErrorMessage
                          name={`communityService.${index}.duration.from`}
                          component="div"
                          className="error"
                        />
                        <ErrorMessage
                          name={`communityService.${index}.duration.to`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Impact or Contribution:</Label>
                        <Field
                          as="textarea"
                          name={`communityService.${index}.impact`}
                          placeholder="Impact or Contribution"
                        />
                        <ErrorMessage
                          name={`communityService.${index}.impact`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Upload Documentation: </Label>
                        <input
                          type="file"
                          id={`communityService.[${index}].csDocumentation`}
                          name={`communityService.[${index}].csDocumentation`}
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => {
                            const csDocumentation = e.currentTarget.files[0];
                            setFieldValue(`communityService.[${index}].csDocumentation`, csDocumentation);
                          }}
                          className="input-field-small"
                        />

                        <ErrorMessage name={`pastQualifications[${index}].marksheet`} component="div" className="text-danger" /> {/* Corrected */}
                        {csDocumentation && <img src={csDocumentation} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                      </div>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        activityName: "",
                        organization: "",
                        description: "",
                        startDate: "",
                        endDate: "",
                        impact: "",
                        yearParticipated: "",
                        csDocumentation: null,
                      })
                    }
                  >
                    Add Community Service
                  </button>
                </fieldset>
              )}
            </FieldArray>
            <br />
            <FieldArray name="workshops">
              {(arrayHelpers) => (
                <fieldset className="fieldset">
                  <legend className="legend">
                    Section 4: Workshop & Training Details
                  </legend>
                  {values.workshops.map((workshop, index) => (
                    <div key={index}>
                      <div>
                        <Label required={false}>
                          Workshop/Training Program Title:
                        </Label>
                        <Field
                          type="text"
                          name={`workshops.${index}.title`}
                          placeholder="Workshop/Training Program Title"
                        />
                        <ErrorMessage
                          name={`workshops.${index}.title`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Organizer/Host:</Label>
                        <Field
                          type="text"
                          name={`workshops.${index}.organizer`}
                          placeholder="Organizer/Host"
                        />
                        <ErrorMessage
                          name={`workshops.${index}.organizer`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Description:</Label>
                        <Field
                          as="textarea"
                          name={`workshops.${index}.description`}
                          placeholder="Description"
                        />
                        <ErrorMessage
                          name={`workshops.${index}.description`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>
                          Date(s) of Participation:
                        </Label>
                        <Field
                          type="date"
                          name={`workshops.${index}.dates.from`}
                          placeholder="Start Date"
                        />
                        <Field
                          type="date"
                          name={`workshops.${index}.dates.to`}
                          placeholder="End Date"
                        />
                        <ErrorMessage
                          name={`workshops.${index}.dates.from`}
                          component="div"
                          className="error"
                        />
                        <ErrorMessage
                          name={`workshops.${index}.dates.to`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Skills/Knowledge Gained:</Label>
                        <Field
                          as="textarea"
                          name={`workshops.${index}.skillsGained`}
                          placeholder="Skills/Knowledge Gained"
                        />
                        <ErrorMessage
                          name={`workshops.${index}.skillsGained`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <Label required={false}>Upload Documentation: </Label>
                        <input
                          type="file"
                          id={`workshops.[${index}].workshopDocumentation`}
                          name={`workshops.[${index}].workshopDocumentation`}
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => {
                            const workshopDocumentation = e.currentTarget.files[0];
                            setFieldValue(`workshops.[${index}].workshopDocumentation`, workshopDocumentation);
                          }}
                          className="input-field-small"
                        />

                        <ErrorMessage name={`pastQualifications[${index}].marksheet`} component="div" className="text-danger" /> {/* Corrected */}
                        {workshopDocumentation && <img src={workshopDocumentation} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                      </div>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        title: "",
                        organizer: "",
                        description: "",
                        dates: { from: "", to: "" },
                        skillsGained: "",
                        workshopDocumentation: null,
                      })
                    }
                  >
                    Add Workshop/Training Program
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

export default Curricular;
