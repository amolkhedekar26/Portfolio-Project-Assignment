import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, createProject } from "../../actions/projects";
import { getSkills } from "../../actions/skills";

import ProjectsHeader from "./components/ProjectsHeader";
import ProjectsContent from "./components/ProjectsContent";
import ProjectsListHolder from "./components/ProjectsListHolder";
import AddProjectModal from "./components/AddProjectModal";
import ProjectsConainer from "./components/ProjectsConainer";
import { ToastContainer, notify } from "../../utils/toast";
import ProjectsValidator from "../../validation/Projects";

function Projects(props) {
  const initialState = {
    inputSearch: "",
  };

  const initialStateModalForm = {
    inputProjectSkills: [],
  };

  let navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [stateModalForm, setStateModalForm] = useState(initialStateModalForm);
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const projects = useSelector((state) => state.projects);
  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const inputRef = useRef({});

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(getProjects(setLoading));
    dispatch(getSkills());
  }, []);

  const skillSelected = (selectedList, selectedItem) => {
    const arr = stateModalForm.inputProjectSkills;
    if (selectedList.length > 0) {
      for (let i = 0; i < selectedList.length; i++) {
        if (!arr.includes(selectedList[i])) {
          arr.push(selectedList[i]);
        }
      }
    } else if (selectedItem) {
      if (!arr.includes(selectedItem)) {
        arr.push(selectedItem);
      }
    }
    setStateModalForm({
      inputProjectSkills: arr,
    });
  };
  const skillRemoved = (selectedList, removedItem) => {
    setStateModalForm({
      inputProjectSkills: selectedList,
    });
  };

  const trimData = (data) => {
    const { name, description } = data;
    return { name: name.trim(), description: description.trim() };
  };

  function handleSave(e) {
    e.preventDefault();
    let trimmedData = trimData({
      name: inputRef.current.inputProjectName.value,
      description: inputRef.current.inputProjectDescription.value,
    });
    trimmedData.skills = stateModalForm.inputProjectSkills;
    const isValid = ProjectsValidator.validate(trimmedData, notify, setOpen);
    if (isValid) {
      dispatch(
        createProject(
          {
            project: {
              name: trimmedData.name,
              description: trimmedData.description,
              skills: trimmedData.skills,
            },
          },
          notify,
          setOpen,
          setLoading
        )
      );
      setStateModalForm({
        inputProjectSkills: [],
      });
      setTimeout(() => {
        dispatch(getProjects(setLoading));
      }, 1000);
      // setOpen(false);
    }
  }

  const [isSearchActive, setIsSearchActive] = React.useState(false);

  return (
    <ProjectsConainer>
      <ProjectsHeader
        projectsArr={projects}
        modalToggler={() => setOpen(!isOpen)}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <ProjectsContent isSearchActive={isSearchActive}>
        {projects && (
          <ProjectsListHolder projects={projects} isLoading={isLoading} />
        )}

        <AddProjectModal
          isOpen={isOpen}
          setOpen={setOpen}
          inputRef={inputRef}
          skills={skills}
          stateModalForm={stateModalForm}
          skillSelected={skillSelected}
          skillRemoved={skillRemoved}
          handleSave={handleSave}
        />
        <ToastContainer />
      </ProjectsContent>
    </ProjectsConainer>
  );
}

export default Projects;
