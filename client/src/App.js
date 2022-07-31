import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MyRoutes } from "./components/Routes";
import SignIn from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import Dashboard from "./pages/Dashbaord/Dashboard";
import { Skills } from "./pages/Skills";
import { Projects } from "./pages/Projects";
import { Report } from "./pages/Report";

function App() {
  return (
    <main className="main-container">
      <MyRoutes />
      {/* <SignUp /> */}
      {/* <SignIn /> */}
      {/* <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route index element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/report" element={<Report />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </BrowserRouter> */}
    </main>
  );
}

export default App;
