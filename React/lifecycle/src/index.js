import React from 'react';
import ReactDom from 'react-dom';
import WorkerList from 'WorkerList'
import RotationMessages from 'RotationMessages'
import 'global.css'

ReactDom.render(
    <div className='lifecycle-container'>
        <WorkerList count={2}/>
        <RotationMessages />
    </div>, document.getElementById("react-container"));