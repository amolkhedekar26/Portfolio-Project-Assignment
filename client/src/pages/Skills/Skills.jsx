import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSkills, createSkill } from "../../actions/skills";

import SkillsHeader from "./components/SkillsHeader";
import SkillsContent from "./components/SkillsContent";
import SkillsListHoler from "./components/SkillsListHoler";
import AddSkillModal from "./components/AddSkillModal";
import SkillsContainer from "./components/SkillsContainer";

import "./Skills.css";
import { ToastContainer, notify } from "../../utils/toast";
import SkillsValidator from "../../validation/Skills";
import SearchSpinner from "../../components/SearchSpinner/SearchSpinner";

function Skills(props) {
  const initialStateModalForm = {
    inputSkillLevel: 0,
  };

  let navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [stateModalForm, setStateModalForm] = useState(initialStateModalForm);
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const inputRef = useRef({});

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(getSkills(setLoading));
  }, []);

  const levelChanged = (newLevel) => {
    setStateModalForm({
      ...stateModalForm,
      inputSkillLevel: newLevel,
    });
  };

  const trimData = (data) => {
    return {
      name: data.name.trim(),
    };
  };

  function handleSave(e) {
    e.preventDefault();
    const reqBody = {
      name: inputRef.current.inputSkillName.value,
    };
    let trimmedData = trimData(reqBody);
    trimmedData.level = stateModalForm.inputSkillLevel;

    const isValid = SkillsValidator.validate(trimmedData, notify);
    if (isValid) {
      dispatch(
        createSkill(
          {
            skill: {
              name: trimmedData.name,
              level: trimmedData.level,
            },
          },
          notify,
          setOpen,
          setLoading
        )
      );
      setStateModalForm({
        inputSkillLevel: 0,
      });
      setTimeout(() => {
        dispatch(getSkills(setLoading));
      }, 1000);
      // setOpen(false);
    }
  }

  const [isSearchActive, setIsSearchActive] = React.useState(false);

  const handleModalToggler = () => {
    setOpen(!isOpen);
  };

  return (
    <SkillsContainer>
      <SkillsHeader
        skillsArr={skills}
        modalToggler={handleModalToggler}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />

      <SkillsContent isSearchActive={isSearchActive}>
        {skills && <SkillsListHoler skills={skills} isLoading={isLoading} />}
        <AddSkillModal
          isOpen={isOpen}
          setOpen={setOpen}
          inputRef={inputRef}
          levelChanged={levelChanged}
          handleSave={handleSave}
        />
        <ToastContainer />
      </SkillsContent>
    </SkillsContainer>
  );
}

export default Skills;
