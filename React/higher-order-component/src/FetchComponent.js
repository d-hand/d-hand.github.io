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

export default FetchComponent;