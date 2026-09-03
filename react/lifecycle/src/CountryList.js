import React from 'react';
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'

export default class CountryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countryNames: [],
            loading: false
        }
    }
        
    componentDidMount() {
        this.fetchCountryList();
    }
    
    fetchCountryList = () => {
        this.setState({loading: true})
        setTimeout(() => {
            fetch('https://restcountries.eu/rest/v1/all')
                .then(response => response.json())
                .then(json => json.slice(1, this.props.count || json.length).map(country => country.name))
                .then(countryNames => this.setState({countryNames, loading: false}));
        }, this.props.delay);
    }

    render() {
        const { count } = this.props
        const { countryNames, loading } = this.state
        return loading 
            ? <div>Loading Country Names...</div> 
            : !countryNames.length 
                ? <div>No country Names</div> 
                : <ul onClick={this.fetchCountryList}>
                    {countryNames.map((x,i) => <li key={i}>{x}</li>)}
                    <li className='country-list-comment'>{count > 0 ? `(первые ${count} стран)` : ""}</li>
                  </ul>                    
    }
}


CountryList.propTypes = {
    delay: PropTypes.number.isRequired,
    count: PropTypes.number
};

CountryList.defaultProps = {
    count: 0
}