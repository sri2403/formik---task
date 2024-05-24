import React, { useState } from 'react';
import Nav from '../components/Nav';
import Books from '../pages/Books';
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom';
import FormikCreate from '../formik/FormikCreate';
import FormikEdit from '../formik/FormikEdit';

const App = () => {
  const[id,setId]=useState(0);
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/books' element={<Books setId={setId}/>}/>
        <Route path='/create' element={<FormikCreate/>}/>
        <Route path='/edit/:id' element={<FormikEdit id={id} />}/>
        {/* <Route path='/create' element={<Create/>}/> */}
        {/* <Route path='/edit/:id' element={<Edit id={id} />}/> */}
      </Routes>
      
    </div>
  );
};

export default App;