import React from 'react';
import ReactDom from 'react-dom';
import PeopleList from 'PeopleList'
import CountryNames from 'CountryNames'

ReactDom.render(
    <div>
        <PeopleList/>
        <CountryNames selected="United States"/>
    </div>
, document.getElementById("react-container"));