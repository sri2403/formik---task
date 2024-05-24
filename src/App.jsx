import React, { useState } from 'react';
import Nav from '../components/Nav';
import Create from '../pages/Create';
import Books from '../pages/Books';
import Edit from '../pages/Edit';
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const[id,setId]=useState(0);
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/books' element={<Books setId={setId}/>}/>
        <Route path='/edit/:id' element={<Edit id={id} />}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
      
    </div>
  );
};

export default App;