import React, { useContext } from 'react';
import "../components/styles.css";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Label from './Label'; // Import the Label component
import { useLocation, useNavigate } from 'react-router-dom';
import { TempStorage } from './TempStorage';

function Project() {
    const { personalDetails,
        currentCourseData, pastQualificationData,
        clubData, eventData, communityServiceData, workshopData,
        achievementData, internshipData, examData,
        setProjectData } = useContext(TempStorage);

    const location = useLocation();
    const navigate = useNavigate();

    const initialValues = {
        projects: [
            {
                projectTitle: '',
                projectCategory: 'software',
                otherCategory: '',
                githubRepoURL: '',
                technologiesUsed: 'programming_languages',
                otherTechnologies: '',
                startDate: '',
                endDate: '',
                teamMembers: '',
                projectGoals: '',
                challengesFaced: '',
                license: '',
                references: '',
            }
        ]
    };

    const validationSchema = Yup.object().shape({
        // projects: Yup.array().of(
        //     Yup.object().shape({
        //         projectTitle: Yup.string()
        //             .required('Project title is required')
        //             .max(50, 'Project title must be 50 characters or less'),
        //         projectDescription: Yup.string()
        //             .required('Project description is required')
        //             .max(250, 'Project description must be 250 characters or less'),
        //         projectCategory: Yup.string().required('Project category is required'),
        //         otherCategory: Yup.string().when('projectCategory', {
        //             is: 'other',
        //             then: (schema) => schema.required('Other category is required'),
        //             otherwise: (schema) => schema.notRequired(),
        //         }),
        //         githubRepoURL: Yup.string().url('Invalid URL format'),
        //         technologiesUsed: Yup.string().required('Technologies used is required'),
        //         otherTechnologies: Yup.string().when('technologiesUsed', {
        //             is: 'other',
        //             then: (schema) => schema.required('Other technologies is required'),
        //             otherwise: (schema) => schema.notRequired(),
        //         }),
        // startDate: Yup.date().required('Start date is required'),
        // endDate: Yup.date().required('End date is required'),
        //     })
        // ),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            // Combine achievementData and projectData
            const combinedData = {
                personalDetails,
                EducationDetails: {
                    currentCoures: currentCourseData,
                    pastQualification: pastQualificationData
                },
                Curricular: {
                    clubs: clubData,
                    events: eventData,
                    communityServices: communityServiceData,
                    workshops: workshopData,
                },
                achievements: {
                    achievementData, internshipData, examData,
                },
                projects: values.projects
            };

            console.log("Combined data:", combinedData);
            setProjectData(values.projects); // Save project data to context
            // Navigate to ActivityView with combinedData
            navigate('/view-Profile', { state: { combinedData } });
        } catch (error) {
            console.error("Form submission failed", error);
            setSubmitting(false);
            setErrors({ submit: "Form submission failed" });
        }
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <FieldArray name="projects">
                            {({ remove, push }) => (
                                <div>
                                    <fieldset className="fieldset">
                                        <legend>
                                            <u>Project Details</u>
                                        </legend>
                                        {values.projects && values.projects.length > 0 && values.projects.map((project, index) => (
                                            <div key={index}>
                                                <h5>Project {index + 1}</h5>
                                                <div>
                                                    <Label required={true}>Project Title :</Label>
                                                    <Field
                                                        type="text"
                                                        name={`projects.${index}.projectTitle`}
                                                        placeholder="Project Title"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.projectTitle`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={true}>Project Description:</Label>
                                                    <Field
                                                        as="textarea"
                                                        name={`projects.${index}.projectDescription`}
                                                        placeholder="Provide a brief overview of the project"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.projectDescription`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={true}>Project Category:</Label>
                                                    <Field as="select" name={`projects.${index}.projectCategory`}>
                                                        <option value="software">Software</option>
                                                        <option value="ai">AI</option>
                                                        <option value="ml">ML</option>
                                                        <option value="iot">IoT</option>
                                                        <option value="other">Other</option>
                                                    </Field>
                                                    <ErrorMessage name={`projects.${index}.projectCategory`} component="div" className="error" />
                                                </div>
                                                {values.projects[index].projectCategory === 'other' && (
                                                    <div>
                                                        <Label required={true}>Other Category:</Label>
                                                        <Field
                                                            type="text"
                                                            name={`projects.${index}.otherCategory`}
                                                            placeholder="Specify other category"
                                                        />
                                                        <ErrorMessage name={`projects.${index}.otherCategory`} component="div" className="error" />
                                                    </div>
                                                )}
                                                <div>
                                                    <Label required={false}>GitHub Repository URL:</Label>
                                                    <Field
                                                        type="url"
                                                        name={`projects.${index}.githubRepoURL`}
                                                        placeholder="E.g. https://github.com/username/repo"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.githubRepoURL`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={true}>Technologies Used:</Label>
                                                    <Field as="select" name={`projects.${index}.technologiesUsed`}>
                                                        <option value="programming_languages">Programming Languages</option>
                                                        <option value="frameworks">Frameworks</option>
                                                        <option value="tools">Tools</option>
                                                        <option value="other">Other</option>
                                                    </Field>
                                                    <ErrorMessage name={`projects.${index}.technologiesUsed`} component="div" className="error" />
                                                </div>
                                                {values.projects[index].technologiesUsed === 'other' && (
                                                    <div>
                                                        <Label required={true}>Other Technologies:</Label>
                                                        <Field
                                                            type="text"
                                                            name={`projects.${index}.otherTechnologies`}
                                                            placeholder="Specify other technologies"
                                                        />
                                                        <ErrorMessage name={`projects.${index}.otherTechnologies`} component="div" className="error" />
                                                    </div>
                                                )}

                                                <div>
                                                    <Label required={false}>Start Date:</Label>
                                                    <Field type="date" name={`projects.${index}.startDate`} />
                                                    <ErrorMessage name={`projects.${index}.startDate`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={false}>End Date:</Label>
                                                    <Field type="date" name={`projects.${index}.endDate`} />
                                                    <ErrorMessage name={`projects.${index}.endDate`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={false}>Project Team:</Label>
                                                    <Field
                                                        as="textarea"
                                                        name={`projects.${index}.teamMembers`}
                                                        placeholder="List the team members involved in the project"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.teamMembers`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={false}>Project Goals and Objectives:</Label>
                                                    <Field
                                                        as="textarea"
                                                        name={`projects.${index}.projectGoals`}
                                                        placeholder="Describe the goals and objectives of the project"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.projectGoals`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={false}>Challenges Faced:</Label>
                                                    <Field
                                                        as="textarea"
                                                        name={`projects.${index}.challengesFaced`}
                                                        placeholder="Describe any challenges faced during the project"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.challengesFaced`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={false}>License:</Label>
                                                    <Field
                                                        type="text"
                                                        name={`projects.${index}.license`}
                                                        placeholder="Specify the license (e.g. MIT, GPL)"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.license`} component="div" className="error" />
                                                </div>
                                                <div>
                                                    <Label required={false}>References or Citations:</Label>
                                                    <Field
                                                        as="textarea"
                                                        name={`projects.${index}.references`}
                                                        placeholder="List any references or citations used"
                                                    />
                                                    <ErrorMessage name={`projects.${index}.references`} component="div" className="error" />
                                                </div>
                                                <button type="button" onClick={() => remove(index)}>Remove Project</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push({ projectTitle: '', projectDescription: '', projectCategory: 'software', otherCategory: '', githubRepoURL: '', technologiesUsed: 'programming_languages', otherTechnologies: '', startDate: '', endDate: '', teamMembers: '', projectGoals: '', challengesFaced: '', license: '', references: '' })}>Add Project</button>
                                    </fieldset>
                                </div>
                            )}
                        </FieldArray>
                        <br />
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Project;
