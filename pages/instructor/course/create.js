/** @format */

import React from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CourseCreate = () => {
  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Create course</h1>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default CourseCreate;