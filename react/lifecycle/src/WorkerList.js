import React from 'react';

export default class WorkerList extends React.Component {
    constructor() {
        super();
        this.state = {
        workers: [],
            loading: false,
            error: null
        };
    }    

    componentWillMount() {
        this.willGetFakeWorkers()
    }

    willGetFakeWorkers = () => {
        this.setState({loading: true});
        this.getFakeWorkers(this.props.count).then(
            workers => this.setState({workers, loading: false}),
            error => this.setState({error, loading: false})
        );
    }

    getFakeWorkers = count => new Promise((resolves, rejects) => {
        const api = `https://api.randomuser.me/?nat=US&results=${count}`;
        const request = new XMLHttpRequest();
        request.open('GET', api);
        request.onload = () => (request.status == 200) 
            ? resolves(JSON.parse(request.response).results) 
            : reject(Error(request.statusText));
        request.onerror = err => rejects(err);
        request.send();
    });

    componentWillUpdate() {
        console.log('updating lifecycle')
    }

    render() {
        const { workers, loading, error } = this.state
        return (
            <div className="worker-list" onClick={this.willGetFakeWorkers}>
                {(loading) 
                    ? <span>Loading Workers</span> 
                    : (workers.length) 
                        ? workers.map((worker, i) => <Worker key={i} {...worker} />) 
                        : <span>0 workers loaded...</span>}

                {(error) ? <p>Error Loading Workers: error</p> : ""}
            </div>)
    }
}   

const Worker = ({ email, picture, name, location }) =>
    <div className="worker">
        <img src={picture.thumbnail} alt="" />
        <h1>{name.first} {name.last}</h1>
        <p><a href={"mailto:" + email}>{email}</a></p>
        <p>{location.city}, {location.state}</p>
    </div>