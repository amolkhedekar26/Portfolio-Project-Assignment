import React from "react";
import SkillsList from "../../Skills/SkillsList";
import Erroricon from "../../../assets/icons/erroricon.svg";

export default function SkillsSection({ skills }) {
  let skillsContent = null;
  if (skills.length > 0) {
    skillsContent = <SkillsList skills={skills} />;
  } else {
    skillsContent = (
      <div className="no-data">
        <img src={Erroricon} alt="" />
        <p>Oops ! No skills found.</p>
      </div>
    );
  }
  return (
    <>
      <h5>Skills</h5>
      <div className="report-skills-div">{skillsContent}</div>
    </>
  );
}
