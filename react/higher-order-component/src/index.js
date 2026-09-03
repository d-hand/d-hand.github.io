import React from 'react';
import ReactDom from 'react-dom';
import {PeopleList, CountryNames}  from 'FetchComponent'
import {HiddenMessage, MenuButton} from 'Expandable'
import styled from 'styled-components';

const FlexItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 400px;
    justify-content: space-between;
`

const FlexItem = styled.section`
    border: 1px solid;
    padding: 10px;
    width: 47%;
`

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`

const Wrapper = styled.section`
    padding: 10px;
    background: papayawhip;
`

ReactDom.render(
    <FlexItems>
        <FlexItem>
            <PeopleList/>
            <CountryNames selected="United States"/>
        </FlexItem>
        <FlexItem>
            <HiddenMessage> Hello World! </HiddenMessage>
            <MenuButton hidden={true} txt="toggle popup">
                <Wrapper>
                    <Title>Hello World, this is my first styled component!</Title>
                </Wrapper>
            </MenuButton>        
        </FlexItem>
    </FlexItems>
, document.getElementById("react-container"));

