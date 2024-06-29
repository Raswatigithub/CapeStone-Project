import React, { createContext, useEffect, useState } from "react";

import MainRouter from "./components/routes/MainRouter";

import Footer from "./components/User/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
let courseContext = createContext();
const App = () => {
  const [search, setSearch] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/getCourses")
      .then((res) => res.json())
      .then((res) => setAvailableCourses(res))
      .catch((e) => console.log(e));
  }, [availableCourses]);

  useEffect(() => {
    if (
      availableCourses &&
      availableCourses.length > 0 &&
      search.trim() !== ""
    ) {
      let data = availableCourses.filter((course) => {
        return course.Course_Name && course.Course_Name.includes(search);
      });
      setFilteredCourses(data);
    }
  }, [availableCourses, search]);

  const onChangeSearch = (value) => {
    setSearch(value);
  };

  const contextValue = {
    search,
    onChangeSearch,
    availableCourses,
    filteredCourses,
  };
  return (
    <courseContext.Provider value={contextValue}>
      <MainRouter />
    </courseContext.Provider>
  );
};

export default App;
export { courseContext };
