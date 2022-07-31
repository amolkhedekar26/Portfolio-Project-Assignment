import React, { useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSkills } from "../../actions/skills";
import { getProjects } from "../../actions/projects";
import { getProfile } from "../../actions/profile";

import { PDFExport } from "@progress/kendo-react-pdf";

import ReportContent from "./components/ReportContent";
import ReportHeader from "./components/ReportHeader";
import ReportContainer from "./components/ReportContainer";
import ProfileSection from "./components/ProfileSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";

import "./Report.css";

function Report(props) {
  const skills = useSelector((state) => state.skills);
  const projects = useSelector((state) => state.projects);
  const profile = useSelector((state) => state.profile);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const pdfExportComponent = createRef();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getSkills());
    dispatch(getProjects());
  }, []);

  if (currentUser && profile) {
    profile.email = currentUser.email;
  }

  const downloadReport = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <ReportContainer>
      <ReportHeader downloadReport={downloadReport} />
      <PDFExport
        ref={pdfExportComponent}
        scale={0.8}
        paperSize="A4"
        margin="1cm"
      >
        <ReportContent>
          {<ProfileSection profile={profile} />}
          {skills && <SkillsSection skills={skills} />}
          {projects && <ProjectsSection projects={projects} />}
        </ReportContent>
      </PDFExport>
    </ReportContainer>
  );
}

export default Report;
