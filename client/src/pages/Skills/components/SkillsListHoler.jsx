import React from "react";
import SkillsList from "./SkillsList";
import BlankCanvas from "../../../assets/images/blank_canvas.svg";

function SkillsListHoler({ skills }) {
  let skillsContent = null;
  if (skills.length > 0) {
    skillsContent = <SkillsList skills={skills} />;
  } else {
    skillsContent = (
      <div className="blank-canvas">
        <img src={BlankCanvas} alt="blank canvas" />
      </div>
    );
  }

  return <>{skillsContent}</>;
}

export default SkillsListHoler;
