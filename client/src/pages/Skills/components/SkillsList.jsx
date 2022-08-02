import React from "react";
import { SkillCard } from "../../../components/SkillCard";

function SkillsList({ skills }) {
  return (
    <>
      {skills.map((skill) => {
        return (
          <SkillCard
            key={skill.id}
            skillName={skill.name}
            level={skill.level}
          />
        );
      })}
    </>
  );
}

export default SkillsList;
