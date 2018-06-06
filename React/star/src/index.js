import React from 'react';
import ReactDom from 'react-dom';
import AddColorForm from './addColorForm'
import Star from './star'

var container = document.getElementById("react-container");
ReactDom.render(
    <div>
        <AddColorForm/>
        <Star/>
    </div>    
    , container);
