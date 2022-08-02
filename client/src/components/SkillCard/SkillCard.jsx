import React from "react";
import ReactStars from "react-rating-stars-component";
import "./SkillCard.css";
import EmptyStarIcon from "../../assets/icons/star_outline.svg";
import FullStarIcon from "../../assets/icons/star_filled.svg";

function SkillCard({ skillName, level }) {
  return (
    <div className="skill-card">
      <h6>{skillName}</h6>
      <ReactStars
        count={5}
        onChange={() => {}}
        value={level}
        size={36}
        edit={false}
        emptyIcon={<img src={EmptyStarIcon} alt="" />}
        filledIcon={<img src={FullStarIcon} alt="" />}
        activeColor="#D83A52"
      />
    </div>
  );
}

export default SkillCard;
