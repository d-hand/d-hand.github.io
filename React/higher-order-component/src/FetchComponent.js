import React from 'react';
import fetch from 'isomorphic-fetch'

const FetchComponent = (ComposedComponent, url) =>
    class FetchComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: [],
                loading: false,
                loaded: false
            }
        }

    componentWillMount() {
        this.setState({loading:true})
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                loaded: true,
                loading: false,
                data
            }))
    }
    
    render() {
        return (
            <div className="data-component">
                {(this.state.loading) 
                    ? <div>Loading...</div> 
                    : <ComposedComponent {...this.state } {...this.props} />}
            </div>
        )
    }
}

const PeopleListInternal = ({data}) =>
    <ol className="people-list">
        {data.results.map((person, i) => {
            const {first, last} = person.name
            return <li key={i}>{first} {last}</li>
        })}
    </ol>

const CountryNamesInternal = ({data, selected=""}) =>
    <select className="people-list" defaultValue={selected}>
        {data.map(({name}, i) =>
            <option key={i} value={name}>{name}</option>
        )}
    </select>

const PeopleList = FetchComponent(PeopleListInternal,  "https://randomuser.me/api?results=10")
const CountryNames = FetchComponent(CountryNamesInternal, "https://restcountries.eu/rest/v1/all")


export { PeopleList, CountryNames }