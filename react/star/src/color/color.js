import React from 'react'
import PropTypes from 'prop-types'
import StarRating from 'starRating/starRating'
import './color.css'

const Color = ({ title, color, rating=0, onRemove=f=>f, onRate=f=>f}) =>
    <section className="color">
        <h1>{title}</h1>
        <button onClick={onRemove}>X</button>
        <div style={{ backgroundColor: color, height:'50px' }}/>
        <StarRating starsSelected={rating} onRate={onRate}/>        
    </section>

Color.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rating: PropTypes.number,
    onRemove: PropTypes.func,
    onRate: PropTypes.func
}

export default Color