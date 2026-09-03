import React from 'react';
import ReactDom from 'react-dom';
import WorkerList from 'WorkerList'
import RotationMessages from 'RotationMessages'
import CountryList from 'CountryList'
import Timeline from 'Timeline'
import 'global.css'

ReactDom.render(
    <div>
        <Timeline name="Для любителей истории" />
        <hr/>
        <div className='lifecycle-container'>
            <WorkerList count={2}/>
            <CountryList delay={3000} count={10}/>
            <RotationMessages />        
        </div>        
    </div>
, document.getElementById("react-container"));