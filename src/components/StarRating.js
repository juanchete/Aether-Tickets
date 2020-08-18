import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdStar } from "react-icons/md";

export default function StarRating(props) {
  const [rating, setRating] = useState(props.rating);
  const [hover, setHover] = useState(null);

  return (
    <RatingStyle>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              className="rating"
              type="radio"
              name="rate"
              value={ratingValue}
              onClick={(e) => {
                e.preventDefault();
                console.log(ratingValue);
                props.rateStars(ratingValue);
              }}
            ></input>
            <MdStar
              className="star"
              color={
                ratingValue <= (hover || props.rating) ? "#ff4301" : "#2f2519"
              }
              size="3em"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </RatingStyle>
  );
}
const RatingStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0;
  .rating {
    display: none;
  }
  .star {
    cursor: pointer;
    transition: color 200ms;
  }
`;
