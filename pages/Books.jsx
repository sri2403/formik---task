import React, { useEffect, useState } from 'react';
import "./books.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Books = ({setId}) => {
    const[books,setBooks]=useState([]);
    const navigate=useNavigate();
    const[deleteData,setDeleteData]=useState([]);
    useEffect(()=>{
        fetchData();
    },[deleteData])
    const fetchData=async()=>{
        await axios.get("https://664e1033fafad45dfadee543.mockapi.io/api/books")
        .then(res=>setBooks(res.data))
        .catch(err=>console.log(err))
    }
    const handleEdit=(id)=>{
        setId(id);
        navigate(`/edit/${id}`)
    }
    const handleDelete=async(id)=>{
        await axios.delete(`https://664e1033fafad45dfadee543.mockapi.io/api/books/${id}`)
        .then(res=>setDeleteData(res.data))
        .catch(err=>console.log(err))
    }
    return (
        <div className="container">
            <table className="book-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Author Bio</th>
                        <th>ISBN Number</th>
                        <th>Published Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.author_biography}</td>
                            <td>{book.isbn}</td>
                            <td>{book.published_date}</td>
                            <td><button onClick={() => handleEdit(book.id)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(book.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;