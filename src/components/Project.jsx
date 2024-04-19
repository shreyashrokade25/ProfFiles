import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Label from './Label'; // Import the Label component
import ActivityView from './ActivityView';
import { useLocation, useNavigate } from 'react-router-dom';
import { AchievementContext } from './AchievementContext';

function Project({ onSubmit }) {
    const { achievementData } = useContext(AchievementContext); // Use the context
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (projectData) => {
        // Assuming projectData is the data from the project form
        const combinedData = { ...projectData, ...achievementData };
        navigate('/activityview', { state: { combinedData } });
    };

    const initialValues = {
        projectTitle: '',
        projectDescription: '',
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
    };

    const validationSchema = Yup.object().shape({
        projectTitle: Yup.string()
            .required('Project title is required')
            .max(50, 'Project title must be 50 characters or less'),
        projectDescription: Yup.string()
            .required('Project description is required')
            .max(250, 'Project description must be 250 characters or less'),
        projectCategory: Yup.string().required('Project category is required'),
        otherCategory: Yup.string().when('projectCategory', {
            is: 'other',
            then: (schema) => schema.required('Other category is required'),
            otherwise: (schema) => schema.notRequired(),
        }),

        githubRepoURL: Yup.string().url('Invalid URL format'),
        technologiesUsed: Yup.string().required('Technologies used is required'),
        otherTechnologies: Yup.string().when('technologiesUsed', {
            is: 'other',
            then: (schema) => schema.required('Other technologies is required'),
            otherwise: (schema) => schema.notRequired(),
        }),

        // startDate: Yup.date().required('Start date is required'),
        // endDate: Yup.date().required('End date is required'),
    });

    const handleSubmit = (projectData) => {
        try {

            // if (!values.projectCategory.includes('other')) {
            //     values.otherCategory = '';
            // }

            // if (!values.technologiesUsed.includes('other')) {
            //     values.otherTechnologies = '';
            // }
            handleNavigation(projectData);
        } catch (error) {
            console.error("Form submission failed", error);
            setSubmitting(false);
            setErrors({ submit: "Form submission failed" });
        }
    };

    return (
        <div className="form-container">
            <h3>Add Project Details:</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                                <fieldset className="fieldset">
                                    <div>
                                        <Label required={true}>Project Title:</Label>
                                        <Field
                                            type="text"
                                            name="projectTitle"
                                            placeholder="E.g. AI Chatbot for Customer Support"
                                        />
                                        <ErrorMessage name="projectTitle" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={true}>Project Description:</Label>
                                        <Field
                                            as="textarea"
                                            name="projectDescription"
                                            placeholder="Provide a brief overview of the project"
                                        />
                                        <ErrorMessage name="projectDescription" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={true}>Project Category:</Label>
                                        <Field as="select" name="projectCategory">
                                            <option value="software">Software</option>
                                            <option value="ai">AI</option>
                                            <option value="ml">ML</option>
                                            <option value="iot">IoT</option>
                                            <option value="other">Other</option>
                                        </Field>
                                        <ErrorMessage name="projectCategory" component="div" className="error" />
                                    </div>
                                    {values.projectCategory === 'other' && (
                                        <div>
                                            <Label required={true}>Other Category:</Label>
                                            <Field
                                                type="text"
                                                name="otherCategory"
                                                placeholder="Specify other category"
                                            />
                                            <ErrorMessage name="otherCategory" component="div" className="error" />
                                        </div>
                                    )}
                                    <div>
                                        <Label required={false}>GitHub Repository URL:</Label>
                                        <Field
                                            type="url"
                                            name="githubRepoURL"
                                            placeholder="E.g. https://github.com/username/repo"
                                        />
                                        <ErrorMessage name="githubRepoURL" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={true}>Technologies Used:</Label>
                                        <Field as="select" name="technologiesUsed">
                                            <option value="programming_languages">Programming Languages</option>
                                            <option value="frameworks">Frameworks</option>
                                            <option value="tools">Tools</option>
                                            <option value="other">Other</option>
                                        </Field>
                                        <ErrorMessage name="technologiesUsed" component="div" className="error" />
                                    </div>
                                    {values.technologiesUsed === 'other' && (
                                        <div>
                                            <Label required={true}>Other Technologies:</Label>
                                            <Field
                                                type="text"
                                                name="otherTechnologies"
                                                placeholder="Specify other technologies"
                                            />
                                            <ErrorMessage name="otherTechnologies" component="div" className="error" />
                                        </div>
                                    )}

                                    <div>
                                        <Label required={false}>Start Date:</Label>
                                        <Field type="date" name="startDate" />
                                        <ErrorMessage name="startDate" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={false}>End Date:</Label>
                                        <Field type="date" name="endDate" />
                                        <ErrorMessage name="endDate" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={false}>Project Team:</Label>
                                        <Field
                                            as="textarea"
                                            name="teamMembers"
                                            placeholder="List the team members involved in the project"
                                        />
                                        <ErrorMessage name="teamMembers" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={false}>Project Goals and Objectives:</Label>
                                        <Field
                                            as="textarea"
                                            name="projectGoals"
                                            placeholder="Describe the goals and objectives of the project"
                                        />
                                        <ErrorMessage name="projectGoals" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={false}>Challenges Faced:</Label>
                                        <Field
                                            as="textarea"
                                            name="challengesFaced"
                                            placeholder="Describe any challenges faced during the project"
                                        />
                                        <ErrorMessage name="challengesFaced" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={false}>License:</Label>
                                        <Field
                                            type="text"
                                            name="license"
                                            placeholder="Specify the license (e.g. MIT, GPL)"
                                        />
                                        <ErrorMessage name="license" component="div" className="error" />
                                    </div>
                                    <div>
                                        <Label required={false}>References or Citations:</Label>
                                        <Field
                                            as="textarea"
                                            name="references"
                                            placeholder="List any references or citations used"
                                        />
                                        <ErrorMessage name="references" component="div" className="error" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting}>Save</button>
                                </fieldset>
                                </Form>
                )}
            </Formik>
        </div>
    );
};

export default Project;
