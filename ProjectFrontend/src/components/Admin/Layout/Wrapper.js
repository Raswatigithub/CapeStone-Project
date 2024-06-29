import React from "react";
import Content from "../UI/Content";
import Header from "../UI/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:2000/adminLogin").then((res) => {
      if (res.data !== "Success") {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default Wrapper;
