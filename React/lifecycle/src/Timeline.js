import d3 from 'd3'
import React from 'react';

export default class Timeline extends React.Component {
    constructor(props){
        super(props); 
        const data = props.data        
        const times = d3.extent(data.map(d => d.year))
        const range = [50, 450]
        this.state = {data, times, range}        
    }

    static defaultProps = {
        name: "Timeline has been not set",
        data: [
            {
                year: 1879,
                event: "Ski Manufacturing Begins"
            },
            {
                year: 1882,
                event: "US Ski Club Founded"
            },
            {
                year: 1924,
                event: "First Winter Olympics Held"
            },
            {
                year: 1926,
                event: "First US Ski Shop Opens"
            },
            {
                year: 1932,
                event: "North America's First Rope Tow Spins"
            },
            {
                year: 1936,
                event: "First Chairlift Spins"
            },
            {
                year: 1949,
                event: "Squaw Valley, Mad River Glen Open"
            },
            {
                year: 1958,
                event: "First Gondola Spins"
            },
            {
                year: 1964,
                event: "Plastic Buckle Boots Available"
            }
        ]
    }
    
    componentDidMount() {
        let group
        const { data, times, range } = this.state
        const { target } = this.refs
        const scale = d3.time.scale().domain(times).range(range)

        d3.select(target)
            .append('svg')
            .attr('height', 200)
            .attr('width', 800)

        group = d3.select(target.children[0])
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr(
            'transform',
            (d, i) => 'translate(' + scale(d.year) + ', 0)'
        )

        group.append('circle')
            .attr('cy', 160)
            .attr('r', 5)
            .style('fill', 'blue')

        group.append('text')
            .text(d => d.year + " - " + d.event)
            .style('font-size', 10)
            .attr('y', 115)
            .attr('x', -95)
            .attr('transform', 'rotate(-45)')
    }

    render() {
        return (
            <div className="timeline">
                <div>Timeline: {this.props.name} </div>
                <div ref="target"></div>                
            </div>
        )
    }           
}