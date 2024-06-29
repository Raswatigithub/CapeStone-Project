import React from "react";
import OperationButtons from "./OperationButtons";
import Courses from "../../Courses/AdminCourses";

const Content = () => (
  <div style={{ display: "flex", marginTop: "100px" }}>
    <OperationButtons />

    <Courses />
  </div>
);

export default Content;
