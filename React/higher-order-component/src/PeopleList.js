import React from 'react'
import FetchComponent from 'FetchComponent'

const PeopleList = ({data}) =>
    <ol className="people-list">
        {data.results.map((person, i) => {
            const {first, last} = person.name
            return <li key={i}>{first} {last}</li>
        })}
    </ol>

export default FetchComponent(PeopleList,  "https://randomuser.me/api?results=10")