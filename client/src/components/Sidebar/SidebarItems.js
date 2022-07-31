import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import ProfileIcon from "../../assets/icons/profile.svg";
import SkillsIcon from "../../assets/icons/skills.svg";
import ProjectsIcon from "../../assets/icons/projects.svg";
import ReportsIcon from "../../assets/icons/report.svg";
import SignOutIcon from "../../assets/icons/signout.svg";

const SidebarItemsUpper = [
  {
    title: "My Profile",
    path: "/profile",
    name: "profile",
    icon: ProfileIcon,
    cName: "nav-text",
  },
  {
    title: "My Skills",
    path: "/skills",
    name: "skills",
    icon: SkillsIcon,
    cName: "nav-text",
  },
  {
    title: "My Projects",
    path: "/projects",
    name: "projects",
    icon: ProjectsIcon,
    cName: "nav-text",
  },
  {
    title: "My Report",
    path: "/report",
    name: "report",
    icon: ReportsIcon,
    cName: "nav-text",
  },
];

const SidebarItemsLower = [
  {
    title: "Sign Out",
    path: "/logout",
    name: "logout",
    icon: SignOutIcon,
    cName: "nav-text",
  },
];

export { SidebarItemsUpper, SidebarItemsLower };
