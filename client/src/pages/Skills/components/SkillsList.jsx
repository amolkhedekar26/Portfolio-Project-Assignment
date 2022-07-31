import React from "react";
import { SkillCard } from "../../../components/SkillCard";

function SkillsList({ skills, isSearchActive }) {
  return (
    <>
      {skills.map((skill) => {
        return (
          <SkillCard
            key={skill.id}
            skillName={skill.name}
            level={skill.level}
            isSearchActive={isSearchActive}
          />
        );
      })}
    </>
  );
}

export default SkillsList;
