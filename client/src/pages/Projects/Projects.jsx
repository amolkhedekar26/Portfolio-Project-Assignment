import React, { useState, useEffect, useRef } from "react";
import PrimaryButtonWithIcon from "../../components/PrimaryButtonWithIcon/PrimaryButtonWithIcon";
import { SearchInput } from "../../components/SearchInput";
import PlusIcon from "../../assets/icons/plus.svg";
import "./Projects.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, createProject } from "../../actions/projects";
import { getSkills } from "../../actions/skills";

import { Modal } from "../../components/Modal";

import { PrimaryButton } from "../../components/PrimaryButton";
import Multiselect from "multiselect-react-dropdown";
import ProjectsList from "./ProjectsList";

import { TextInputRef } from "../../components/TextInputRef";
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

  const [state, setState] = useState(initialState);
  const [stateModalForm, setStateModalForm] = useState(initialStateModalForm);
  const [isOpen, setOpen] = useState(false);

  const [data, setData] = useState({});
  const [userSkills, setUserSkills] = useState([]);

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
    dispatch(getProjects());
    dispatch(getSkills());
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  function handleChangeModalForm(e) {
    const value = e.target.value;
    setStateModalForm({
      ...stateModalForm,
      [e.target.name]: value,
    });
  }

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

  useEffect(() => {
    if (projects.length > 0) {
      setData(projects);
    }
  }, [projects]);

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
    const isValid = ProjectsValidator.validate(trimmedData, notify,setOpen);
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
          notify
        )
      );
      setStateModalForm({
        inputProjectSkills: [],
      });
      setTimeout(() => {
        dispatch(getProjects());
      }, 1000);
      // setOpen(false);
    }
    // dispatch(
    //   createProject({
    //     project: {
    //       name: inputRef.current.inputProjectName.value,
    //       description: inputRef.current.inputProjectDescription.value,
    //       skills: stateModalForm.inputProjectSkills,
    //     },
    //   })
    // );

    // setStateModalForm({
    //   inputProjectSkills: [],
    // });
    // setTimeout(() => {
    //   dispatch(getProjects());
    // }, 1000);
    // setOpen(false);
  }

  let projectsContent = null;
  if (projects.length > 0) {
    // console.log(projects);
    // projectsContent = projects.map((project) => {
    //   return (
    //     <ProjectCard
    // key={project.id}
    // projectName={project.name}
    // projectDescription={project.description}
    // projectSkills={project.skills}
    //     />
    //   );
    // });
    projectsContent = <ProjectsList projects={projects} />;
  } else {
    projectsContent = <div>Loading ...</div>;
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
      <ProjectsContent>
        {projects && (
          <ProjectsListHolder
            projects={projects}
            isSearchActive={isSearchActive}
          />
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
