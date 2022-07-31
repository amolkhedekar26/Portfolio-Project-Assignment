import React from "react";
import { PrimaryOutlineButtonWithIcon } from "../../../components/PrimaryOutlineButtonWithIcon";
import PrimaryButtonWithIcon from "../../../components/PrimaryButtonWithIcon/PrimaryButtonWithIcon";
import ShareIcon from "../../../assets/icons/share.svg";
import DownloadIcon from "../../../assets/icons/download.svg";

function ReportHeader({ downloadReport }) {
  return (
    <header className="report-header">
      <h5>My Report</h5>
      <div className="btn-div">
        <PrimaryOutlineButtonWithIcon icon={ShareIcon}>
          Share Report
        </PrimaryOutlineButtonWithIcon>
        <PrimaryButtonWithIcon icon={DownloadIcon} onClick={downloadReport}>
          Download Report
        </PrimaryButtonWithIcon>
      </div>
    </header>
  );
}

export default ReportHeader;
