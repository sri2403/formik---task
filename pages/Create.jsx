import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './edit.css';

const Create = () => {
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        author: '',
        author_biography: '',
        isbn: '',
        published_date: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        author_biography: Yup.string().required('Author Biography is required'),
        isbn: Yup.string()
            .required('ISBN Number is required')
            .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'ISBN number should be 13 digits'),
        published_date: Yup.string().required('Published Date is required')
    });

    const onSubmit = async (values) => {
        try {
            await axios.post('https://664e1033fafad45dfadee543.mockapi.io/api/books', values);
            navigate('/books');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <div className="edit-container">
            <form className="edit-form" onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="error">{formik.errors.title}</div>
                ) : null}

                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    onChange={formik.handleChange}
                    value={formik.values.author}
                />
                {formik.touched.author && formik.errors.author ? (
                    <div className="error">{formik.errors.author}</div>
                ) : null}

                <label htmlFor="author_biography">Author Biography:</label>
                <input
                    type="text"
                    id="author_biography"
                    name="author_biography"
                    onChange={formik.handleChange}
                    value={formik.values.author_biography}
                />
                {formik.touched.author_biography && formik.errors.author_biography ? (
                    <div className="error">{formik.errors.author_biography}</div>
                ) : null}

                <label htmlFor="isbn">ISBN Number:</label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    onChange={formik.handleChange}
                    value={formik.values.isbn}
                />
                {formik.touched.isbn && formik.errors.isbn ? (
                    <div className="error">{formik.errors.isbn}</div>
                ) : null}

                <label htmlFor="published_date">Published Date:</label>
                <input
                    type="text"
                    id="published_date"
                    name="published_date"
                    onChange={formik.handleChange}
                    value={formik.values.published_date}
                />
                {formik.touched.published_date && formik.errors.published_date ? (
                    <div className="error">{formik.errors.published_date}</div>
                ) : null}

                <button type="submit">Create</button>
                <p>Once you've created the form, click "Back" to proceed.</p>
            </form>
            <div>
                <button onClick={() => navigate('/books')} className="back-button">Back</button>
            </div>
        </div>
    );
};

export default Create;
