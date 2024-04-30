import React, { useState, useContext } from 'react';
import "../styles/styles.css";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Label from '../layout/Label'; // Import the Label component
import { useNavigate } from 'react-router-dom';
import { TempStorage } from '../TempStorage';

function Project() {
    const { personalDetails,
        currentCourseData,
        pastQualificationData,
        achievementData,
        internshipData,
        examData,
        clubData,
        eventData,
        communityServiceData,
        workshopData,
        setProjectData } = useContext(TempStorage);
    const navigate = useNavigate();
    const [projectCertificate, setProjectCertificate] = useState(null);

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
                projectCertificate: null,
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
            const updatedProject = values.projects.map((project, index) => {
                if (values.projects[index].projectCertificate) {
                    const projectCertificateUrl = URL.createObjectURL(values.projects[index].projectCertificate);
                    return { ...project, projectCertificate: projectCertificateUrl };
                }
                return project;
            });

            // Combine all data along with projectData
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
                projects: updatedProject
            };

            console.log("Combined data:", combinedData);
            setProjectData(combinedData.projects);
            setProjectCertificate(null);
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
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <FieldArray name="projects">
                            {({ remove, push }) => (
                                <div>
                                    <fieldset className="fieldset">

                                        <legend>
                                            <h3>Project Details</h3>
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

                                                <div>
                                                    <Label required={false}>Project Certificate (If any): </Label>
                                                    <input
                                                        type="file"
                                                        id={`projects.[${index}].projectCertificate`}
                                                        name={`projects.[${index}].projectCertificate`}
                                                        accept=".jpg,.jpeg,.pdf"
                                                        onChange={(e) => {
                                                            const projectCertificate = e.currentTarget.files[0];
                                                            setFieldValue(`projects.[${index}].projectCertificate`, projectCertificate);
                                                        }}
                                                        className="input-field-small"
                                                    />

                                                    <ErrorMessage name={`projects[${index}].projectCertificate`} component="div" className="text-danger" />
                                                    {projectCertificate && <img src={projectCertificate} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                                                </div>

                                                <button type="button" onClick={() => remove(index)}>Remove Project</button>
                                            </div>

                                        ))}
                                        <button type="button" onClick={() => push({ projectTitle: '', projectDescription: '', projectCategory: 'software', otherCategory: '', githubRepoURL: '', technologiesUsed: 'programming_languages', otherTechnologies: '', startDate: '', endDate: '', teamMembers: '', projectGoals: '', challengesFaced: '', license: '', references: '', projectCertificate: null })}>Add Project</button>
                                    </fieldset>
                                </div>
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
};

export default Project;
