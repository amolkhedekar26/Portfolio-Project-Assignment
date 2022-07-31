import React from "react";
import PrimaryButtonWithIconDynamic from "../../../components/PrimaryButtonWithIconDynamic/PrimaryButtonWithIconDynamic";
import PlusIcon from "../../../assets/icons/plus.svg";
import AutoCompleteSearchInput from "../../../components/AutoCompleteSearchInput/AutoCompleteSearchInput";

function SkillsHeader({
  modalToggler,
  skillsArr,
  isSearchActive,
  setIsSearchActive,
}) {
  const arr = [];
  if (Array.isArray(skillsArr)) {
    skillsArr.forEach((skill) => {
      arr.push(skill.name);
    });
  }


  return (
    <header className="skills-header">
      <AutoCompleteSearchInput
        suggestions={arr}
        placeholder="Search for skills"
        btnName="Skill"
        modalToggler={modalToggler}
        setSearchActive={setIsSearchActive}
      />
      <PrimaryButtonWithIconDynamic
        icon={PlusIcon}
        onClick={modalToggler}
        searchActive={isSearchActive}
      >
        {" "}
        Add a Skill
      </PrimaryButtonWithIconDynamic>
    </header>
  );
}

export default SkillsHeader;
