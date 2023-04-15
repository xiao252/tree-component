import React from "react";
import { createRoot } from "react-dom/client";
import { ModalTree } from "./DepartmentSelect";
import "./index.css";
import "antd/dist/antd.css";

const App = () => {
  return <ModalTree />;
};

const dom:any = document.getElementById("container")
createRoot(dom).render(<App />);
