import React from 'react';
import PropTypes from 'prop-types'
import Star from 'star/star.js'
import './starRating.css'

const StarRating = ({starsSelected=0, totalStars=5, onRate=f=>f}) => 
    <div>
        <div className="star-rating">
            {[...Array(totalStars)].map((n, i) =>
                <Star key={i}
                      selected={i<starsSelected}
                      onClick={() => onRate(i+1)}/>
            )}        
        </div>
        <p style={{textAlign: 'center'}}>{starsSelected} of {totalStars} stars</p>
    </div>

StarRating.propTypes = {
    starsSelected: PropTypes.number,
    totalStars: PropTypes.number,
    onRate: PropTypes.func
}

export default StarRating;