import React from 'react';
import ReactDom from 'react-dom';
import {PeopleList, CountryNames}  from 'FetchComponent'
import {HiddenMessage, MenuButton} from 'Expandable'

ReactDom.render(
    <div>
        <PeopleList/>
        <CountryNames selected="United States"/>
        <HiddenMessage> Hello World! </HiddenMessage>
        <MenuButton hidden={true} txt="toggle popup">
            <h1>Hidden Content</h1>
            <p>This content will start off hidden</p>
        </MenuButton>
    </div>
, document.getElementById("react-container"));