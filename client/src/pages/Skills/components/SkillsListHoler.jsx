import React from "react";
import SkillsList from "./SkillsList";
import BlankCanvas from "../../../assets/images/blank_canvas.svg";
import NoDataSVGIcon from "../../../assets/icons/no_data.svg";
import SearchSpinner from "../../../components/SearchSpinner/SearchSpinner";

function SkillsListHoler({ skills, isLoading }) {
  let skillsContent = null;
  if (isLoading) {
    skillsContent = <SearchSpinner />;
  } else if (skills.length > 0) {
    skillsContent = <SkillsList skills={skills} />;
  } else {
    skillsContent = (
      <div className="blank-canvas">
        <img src={NoDataSVGIcon} alt="blank canvas" />
      </div>
    );
  }

  return <>{skillsContent}</>;
}

export default SkillsListHoler;
