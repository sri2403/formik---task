import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Edit = ({id}) => {
    const[editData,setEditData]=useState({
        title:"",
        author:"",
        author_biography:"",
        isbn:"",
        published_date:""
    });
    const navigate=useNavigate();
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData=async()=>{
        await axios.get(`https://664e1033fafad45dfadee543.mockapi.io/api/books/${id}`)
        .then(res=>setEditData(res.data))
        .catch(err=>console.log(err))
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        author: Yup.string().required("Author name is required"),
        author_biography: Yup.string().required("Author's biography is required"),
        isbn: Yup.string().required("ISBN number is required"),
        published_date: Yup.string().required("Published date is required")
    });

    useEffect(() => {
        formik.setValues(editData)
    }, [editData])
    
    const formik=useFormik({
        initialValues:editData,
        validationSchema:validationSchema,
        onSubmit:(values, { resetForm }) => {
            axios.put(`https://664e1033fafad45dfadee543.mockapi.io/api/books/${id}`,values)
                .then(res => {
                    console.log(res.data);
                    alert("Data updated successfully");
                    resetForm();
                    navigate("/books");
                })
                .catch(err => console.log(err));
        },
    })
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setEditData((pre)=>({
            ...pre,[name]:value
        }))
    }
    return (
        <div className="edit-container">
            <form className="edit-form" onSubmit={formik.handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input
                    type='text'
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className='one'>{formik.errors.title}</div>
                ) : null}

                <label htmlFor='author'>Author: </label>
                <input
                    type='text'
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.author && formik.errors.author ? (
                    <div className='one'>{formik.errors.author}</div>
                ) : null}

                <label htmlFor='author_biography'>Author Biography: </label>
                <input
                    type='text'
                    name='author_biography'
                    value={formik.values.author_biography}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.author_biography && formik.errors.author_biography ? (
                    <div className='one'>{formik.errors.author_biography}</div>
                ) : null}

                <label htmlFor='isbn'>ISBN Number: </label>
                <input
                    type='text'
                    name='isbn'
                    value={formik.values.isbn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.isbn && formik.errors.isbn ? (
                    <div className='one'>{formik.errors.isbn}</div>
                ) : null}

                <label htmlFor='published_date'>Published Date: </label>
                <input
                    type='text'
                    name='published_date'
                    value={formik.values.published_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.published_date && formik.errors.published_date ? (
                    <div className='one'>{formik.errors.published_date}</div>
                ) : null}

                <button type='submit'>Update</button>
            </form>
            <div>
                <button onClick={() => navigate("/books")} className='back-button'>Back</button>
            </div>
        </div>
    );
};

export default Edit;























