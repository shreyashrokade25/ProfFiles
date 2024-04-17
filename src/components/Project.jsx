import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Project = () => {
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
        projectTitle: Yup.string().required('Project title is required'),
        projectCategory: Yup.string().required('Project category is required'),
        githubRepoURL: Yup.string().url('Invalid URL format'),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date().required('End date is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        // Filter out "other" category from projectCategory if not selected
        if (!values.projectCategory.includes('other')) {
            values.otherCategory = ''; // Reset otherCategory if "other" category is not selected
        }

        if (!values.technologiesUsed.includes('other')) {
            values.otherTechnologies = ''; 
        }

        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
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
                        <div>
                            <label>Project Title:</label>
                            <Field type="text" name="projectTitle" />
                            <ErrorMessage name="projectTitle" component="div" className="error" />
                        </div>
                        <div>
                            <label>Project Description:</label>
                            <Field as="textarea" name="projectDescription" />
                            <ErrorMessage name="projectDescription" component="div" className="error" />
                        </div>
                        <div>
                            <label>Project Category:</label>
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
                                <label>Other Category:</label>
                                <Field name="otherCategory" type="text" placeholder="Specify other category" />
                                <ErrorMessage name="otherCategory" component="div" className="error" />
                            </div>
                        )}

                        <div>
                            <label>GitHub Repository URL:</label>
                            <Field type="url" name="githubRepoURL" />
                            <ErrorMessage name="githubRepoURL" component="div" className="error" />
                        </div>
                        <div>
                            <label>Technologies Used:</label>
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
                                <label>Other Technologies:</label>
                                <Field name="otherTechnologies" type="text" placeholder="Specify other technologies" />
                                <ErrorMessage name="otherTechnologies" component="div" className="error" />
                            </div>
                        )}

                        <div>
                            <label>Start Date:</label>
                            <Field type="date" name="startDate" />
                            <ErrorMessage name="startDate" component="div" className="error" />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <Field type="date" name="endDate" />
                            <ErrorMessage name="endDate" component="div" className="error" />
                        </div>
                        <div>
                            <label>Project Team:</label>
                            <Field as="textarea" name="teamMembers" />
                            <ErrorMessage name="teamMembers" component="div" className="error" />
                        </div>
                        <div>
                            <label>Project Goals and Objectives:</label>
                            <Field as="textarea" name="projectGoals" />
                            <ErrorMessage name="projectGoals" component="div" className="error" />
                        </div>
                        <div>
                            <label>Challenges Faced:</label>
                            <Field as="textarea" name="challengesFaced" />
                            <ErrorMessage name="challengesFaced" component="div" className="error" />
                        </div>
                        <div>
                            <label>License:</label>
                            <Field type="text" name="license" />
                            <ErrorMessage name="license" component="div" className="error" />
                        </div>
                        <div>
                            <label>References or Citations:</label>
                            <Field as="textarea" name="references" />
                            <ErrorMessage name="references" component="div" className="error" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>Save</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Project;
