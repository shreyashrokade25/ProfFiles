import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Label from './Label'; // Import the Label component
import { useNavigate } from 'react-router-dom';
import { AchievementContext } from './AchievementContext';
import axios from 'axios';


function Curricular() {

    const { setClubData, setEventData, setCommunityServiceData, setWorkshopData } = useContext(AchievementContext); // Use the context
    const navigate = useNavigate();

    const initialValues = {
        clubs: [{ clubName: '', positionHeld: '', activities: '' }],
        events: [{ eventName: '', eventType: '', otherEventType: '', participationLevel: '', achievement: '', yearParticipated: '', certificate: '' }],
        communityService: [{ activityName: '', organization: '', description: '', duration: { from: '', to: '' }, impact: '', documentation: '' }],
        workshops: [{ title: '', organizer: '', description: '', dates: { from: '', to: '' }, skills: '', documentation: '' }]
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
        console.log("Values Data", values);
        try {
            const combinedData = {
                clubs: values.clubs,
                events: values.events,
                communityService: values.communityService,
                workshop: values.workshops,
            };

            // Update the context with all combined data
            setClubData(combinedData.clubs);
            setEventData(combinedData.events);
            setCommunityServiceData(combinedData.communityService);
            setWorkshopData(combinedData.workshop);

            // Pass all combined data in the navigation state
            navigate('/add-achievements', { state: { combinedData } });

        } catch (error) {
            console.error("Achievement submission failed", error);
            setSubmitting(false);
            setErrors({ submit: "Achievement submission failed" });
        }
    };

    return (
        <div className="form-container">
            <h3>Clubs & Committees</h3>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, values }) => (
                    <Form>
                        <FieldArray name="clubs">
                            {(arrayHelpers) => (
                                <fieldset className="fieldset">
                                    {values.clubs.map((club, index) => (
                                        <div key={index}>
                                            <Label required={false}>Club/Committee Name:</Label>
                                            <Field
                                                type="text"
                                                name={`clubs.${index}.clubName`}
                                                placeholder="Club/Committee Name"
                                            />
                                            <ErrorMessage name={`clubs.${index}.clubName`} component="div" className="error" />

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
                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => arrayHelpers.push({ clubName: '', positionHeld: '', activities: '' })}>
                                        Add Club/Committee
                                    </button>
                                </fieldset>
                            )}
                        </FieldArray>
                        <br />
                        <FieldArray name="events">
                            {(arrayHelpers) => (
                                <fieldset className="fieldset">
                                    <legend>Section 2: Events & Competitions</legend>
                                    {values.events.map((event, index) => (
                                        <div key={index}>
                                            <div>
                                                <Label required={false}>Event Name:</Label>
                                                <Field
                                                    type="text"
                                                    name={`events.${index}.eventName`}
                                                    placeholder="Event Name"
                                                />
                                                <ErrorMessage name={`events.${index}.eventName`} component="div" className="error" />
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
                                                    <option value="Quiz Competition">Quiz Competition</option>
                                                    <option value="Cultural Event">Cultural Event</option>
                                                    <option value="Hackathon">Hackathon</option>
                                                    <option value="Robotics Competition">Robotics Competition</option>
                                                    <option value="Other">Other</option>
                                                </Field>
                                                <ErrorMessage name={`events.${index}.eventType`} component="div" className="error" />
                                                {/* Conditional rendering for Other option */}
                                                {event.eventType === 'Other' && (
                                                    <div>
                                                        <Label required={false}>Other Event Type:</Label>
                                                        <Field
                                                            type="text"
                                                            name={`events.${index}.otherEventType`}
                                                            placeholder="Specify other event type"
                                                        />
                                                        <ErrorMessage name={`events.${index}.otherEventType`} component="div" className="error" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <Label required={false}>Level of Participation:</Label>
                                                <Field as="select" name={`events.${index}.participationLevel`}>
                                                    <option value="Intra-School/College">Intra-School/College</option>
                                                    <option value="Inter-School/College">Inter-School/College</option>
                                                    <option value="District">District</option>
                                                    <option value="Zonal">Zonal</option>
                                                    <option value="State">State</option>
                                                    <option value="National">National</option>
                                                    <option value="International">International</option>

                                                </Field>
                                                <ErrorMessage name={`events.${index}.participationLevel`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Achievement:</Label>
                                                <Field
                                                    type="text"
                                                    name={`events.${index}.achievement`}
                                                    placeholder="Achievement"
                                                />
                                                <ErrorMessage name={`events.${index}.achievement`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Year Participated:</Label>
                                                <Field
                                                    type="text"
                                                    name={`events.${index}.yearParticipated`}
                                                    placeholder="Year Participated"
                                                />
                                                <ErrorMessage name={`events.${index}.yearParticipated`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Upload Certificate:</Label>
                                                <Field
                                                    type="file"
                                                    name={`events.${index}.certificate`}
                                                />
                                                <ErrorMessage name={`events.${index}.certificate`} component="div" className="error" />
                                            </div>
                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => arrayHelpers.push({ eventName: '', eventType: '', otherEventType: '', participationLevel: '', achievement: '', yearParticipated: '', certificate: '' })}>
                                        Add Event
                                    </button>
                                </fieldset>
                            )}
                        </FieldArray>
                        <br />
                        <FieldArray name="communityService">
                            {(arrayHelpers) => (
                                <fieldset className="fieldset">
                                    <legend>Section 3: Community Service and Volunteering</legend>
                                    {values.communityService.map((activity, index) => (
                                        <div key={index}>
                                            <div>
                                                <Label required={false}>Activity Name:</Label>
                                                <Field
                                                    type="text"
                                                    name={`communityService.${index}.activityName`}
                                                    placeholder="Activity Name"
                                                />
                                                <ErrorMessage name={`communityService.${index}.activityName`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Organization/Group Involved:</Label>
                                                <Field
                                                    type="text"
                                                    name={`communityService.${index}.organization`}
                                                    placeholder="Organization/Group Involved"
                                                />
                                                <ErrorMessage name={`communityService.${index}.organization`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Description of Activity:</Label>
                                                <Field
                                                    as="textarea"
                                                    name={`communityService.${index}.description`}
                                                    placeholder="Description of Activity"
                                                />
                                                <ErrorMessage name={`communityService.${index}.description`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Duration of Participation (From - To):</Label>
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
                                                <ErrorMessage name={`communityService.${index}.duration.from`} component="div" className="error" />
                                                <ErrorMessage name={`communityService.${index}.duration.to`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Impact or Contribution:</Label>
                                                <Field
                                                    as="textarea"
                                                    name={`communityService.${index}.impact`}
                                                    placeholder="Impact or Contribution"
                                                />
                                                <ErrorMessage name={`communityService.${index}.impact`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Upload Documentation:</Label>
                                                <Field
                                                    type="file"
                                                    name={`communityService.${index}.documentation`}
                                                />
                                                <ErrorMessage name={`communityService.${index}.documentation`} component="div" className="error" />
                                            </div>
                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => arrayHelpers.push({ activityName: '', organization: '', description: '', startDate: '', endDate: '', impact: '', yearParticipated: '', documentation: '' })}>
                                        Add Community Service
                                    </button>
                                </fieldset>
                            )}
                        </FieldArray>
                        <br />
                        <FieldArray name="workshops">
                            {arrayHelpers => (
                                <fieldset className="fieldset">
                                    <legend>Section 4: Workshop & Training Details</legend>
                                    {values.workshops.map((workshop, index) => (
                                        <div key={index}>
                                            <div>
                                                <Label required={false}>Workshop/Training Program Title:</Label>
                                                <Field
                                                    type="text"
                                                    name={`workshops.${index}.title`}
                                                    placeholder="Workshop/Training Program Title"
                                                />
                                                <ErrorMessage name={`workshops.${index}.title`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Organizer/Host:</Label>
                                                <Field
                                                    type="text"
                                                    name={`workshops.${index}.organizer`}
                                                    placeholder="Organizer/Host"
                                                />
                                                <ErrorMessage name={`workshops.${index}.organizer`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Description:</Label>
                                                <Field
                                                    as="textarea"
                                                    name={`workshops.${index}.description`}
                                                    placeholder="Description"
                                                />
                                                <ErrorMessage name={`workshops.${index}.description`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Date(s) of Participation:</Label>
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
                                                <ErrorMessage name={`workshops.${index}.dates.from`} component="div" className="error" />
                                                <ErrorMessage name={`workshops.${index}.dates.to`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Skills/Knowledge Gained:</Label>
                                                <Field
                                                    as="textarea"
                                                    name={`workshops.${index}.skillsGained`}
                                                    placeholder="Skills/Knowledge Gained"
                                                />
                                                <ErrorMessage name={`workshops.${index}.skillsGained`} component="div" className="error" />
                                            </div>
                                            <div>
                                                <Label required={false}>Upload Documentation:</Label>
                                                <Field
                                                    type="file"
                                                    name={`workshops.${index}.documentation`}
                                                />
                                                <ErrorMessage name={`workshops.${index}.documentation`} component="div" className="error" />
                                            </div>
                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => arrayHelpers.push({ title: '', organizer: '', description: '', dates: { from: '', to: '' }, skillsGained: '', documentation: '' })}>
                                        Add Workshop/Training Program
                                    </button>
                                </fieldset>
                            )}
                        </FieldArray>
                        <br />
                        <button type="submit" disabled={isSubmitting} >Save</button>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Curricular;
