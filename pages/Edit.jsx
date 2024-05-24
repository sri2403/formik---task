// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./edit.css";

// const Edit = ({id}) => {
//     const[editData,setEditData]=useState({
//         title:"",
//         author:"",
//         author_biography:"",
//         isbn:"",
//         published_date:""
//     });
//     const navigate=useNavigate();
//     useEffect(()=>{
//         fetchData();
//     },[])
//     const fetchData=async()=>{
//         await axios.get(`https://664e1033fafad45dfadee543.mockapi.io/api/books/${id}`)
//         .then(res=>setEditData(res.data))
//         .catch(err=>console.log(err))
//     }
//     const handleChange=(e)=>{
//         const{name,value}=e.target;
//         setEditData((pre)=>({
//             ...pre,[name]:value
//         }))
//     }
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         axios.put(`https://664e1033fafad45dfadee543.mockapi.io/api/books/${id}`,editData)
//         .then(res=>console.log(res.data))
//         .catch(err=>console.log(err))
//         setEditData({
//             title:"",
//             author:"",
//             author_biography:"",
//             isbn:"",
//             published_date:""
//         })
//     }
//     return (
//         <div className="edit-container">
//             <form className="edit-form" onSubmit={handleSubmit}>
//                 <label htmlFor='title'>Title: </label>
//                 <input type='text' name="title" value={editData.title} onChange={handleChange} />
//                 <label htmlFor='author'>Author: </label>
//                 <input type='text' name="author" value={editData.author} onChange={handleChange} />
//                 <label htmlFor='author_biography'>Author Biography: </label>
//                 <input type='text' name='author_biography' value={editData.author_biography} onChange={handleChange} />
//                 <label htmlFor='isbn'>ISBN Number: </label>
//                 <input type='text' name='isbn' value={editData.isbn} onChange={handleChange} />
//                 <label htmlFor='published_date'>Published Date: </label>
//                 <input type='text' name='published_date' value={editData.published_date} onChange={handleChange} />
//                 <button type='submit'>Update</button>
//                 <p>Once you've updated the form, click "Back" to proceed.</p>
//             </form>
//             <div>
//             <button onClick={() => navigate("/books")} className='back-button'>Back</button>
//             </div>
//         </div>
//     );
// };

// export default Edit;













import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './edit.css';

const Edit = ({ id }) => {
    const navigate = useNavigate();

    const [editData, setEditData] = useState({
        title: '',
        author: '',
        author_biography: '',
        isbn: '',
        published_date: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://664e1033fafad45dfadee543.mockapi.io/api/books/${id}`);
            setEditData(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
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
            await axios.put(`https://664e1033fafad45dfadee543.mockapi.io/api/books/${id}`, values);
            navigate('/books');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: editData,
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

                <button type="submit">Update</button>
                <p>Once you've updated the form, click "Back" to proceed.</p>
            </form>
            <div>
                <button onClick={() => navigate('/books')} className="back-button">Back</button>
            </div>
        </div>
    );
};

export default Edit;
