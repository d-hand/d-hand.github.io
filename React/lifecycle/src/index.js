import React from 'react';
import ReactDom from 'react-dom';
import WorkerList from 'WorkerList'
import RotationMessages from 'RotationMessages'
import CountryList from 'CountryList'
import 'global.css'

ReactDom.render(
    <div className='lifecycle-container'>
        <WorkerList count={2}/>
        <CountryList delay={3000} count={10}/>
        <RotationMessages />        
    </div>, document.getElementById("react-container"));