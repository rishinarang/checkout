import * as React from 'react';
import { useState } from 'react';
import './style.css';
import Button from '../shared/Button';

const StarRating = ({ updateRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="mb-1">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Button
            key={index}
            className={index <= ((rating && hover) || hover) ? 'on' : 'off'}
            onClick={(event) => {
              event.preventDefault();
              setRating((prevRating) => {
                updateRating(index);
                return (prevRating = index);
              });
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>&#9733;</span>
          </Button>
        );
      })}
    </div>
  );
};

export default StarRating;
