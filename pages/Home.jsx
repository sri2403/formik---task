import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./home.css";

const Home = () => {
    const[books,setBooks]=useState([]);
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData=async()=>{
        await axios.get("https://664e1033fafad45dfadee543.mockapi.io/api/books")
        .then(res=>setBooks(res.data))
        .catch(err=>console.log(err))
    }
    return (
        <div className="home-container">
            {books.map((ele,index)=>{
                return(
                    <div key={index} className="card">
                        <h2>{ele.title}</h2>
                        <p>Author: {ele.author}</p>
                        <p>Author_bio: {ele.author_biography}</p>
                        <p>ISBN Number:{ele.isbn}</p>
                        <p>Published Date: {ele.published_date}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default Home;