import React, { useState } from "react";
import {
  FormInput,
  FormGroup,
  FormCheckbox,
  Button,
  Form,
  Segment,
  ModalDescription,
} from "semantic-ui-react";
import axios from "axios";
const CouserActionForm = (props) => {
  const [courseId, setCourseId] = useState();
  const [courseName, setCourseName] = useState();
  const [coursePrice, setCoursePrice] = useState();
  const [courseOffer, setCourseOffer] = useState();
  const [courseImage, setCourseImage] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [status, setStatus] = useState();

  const handelAddCourse = () => {
    axios
      .post("http://localhost:2000/addCourse", {
        Course_Id: courseId,
        Course_Name: courseName,
        Course_Price: coursePrice,
        Course_ImageUrl: courseImage,
        Course_Offer: courseOffer,
        Course_Description: courseDescription,
      })
      .then((res) => setStatus(res.data))
      .catch((e) => console.log(e));

    setCourseId("");
    setCourseImage("");
    setCourseName("");
    setCourseOffer("");
    setCoursePrice("");
    setCourseDescription("");
  };

  const handleUpdateCourse = () => {
    axios
      .put(`http://localhost:2000/updateCourse/${courseId}`, {
        Course_Id: courseId,
        Course_Name: courseName,
        Course_Price: coursePrice,
        Course_ImageUrl: courseImage,
        Course_Offer: courseOffer,
        Course_Description: courseDescription,
      })
      .then((res) => setStatus(res.data))
      .catch((e) => console.log(e));
  };

  const handleDeleteCourse = () => {
    axios
      .delete(`http://localhost:2000/deleteCourse/${courseId}`)
      .then((res) => setStatus(res.data))
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Segment inverted>
        {props.buttonName != "Delete" && (
          <Form inverted>
            <FormGroup widths="equal">
              <FormInput
                fluid
                label={<label style={{ color: "black" }}>Course ID</label>}
                placeholder="Enter Course Id"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              />
              <FormInput
                fluid
                icon="user"
                iconPosition="right"
                label={<label style={{ color: "black" }}>Name</label>}
                placeholder="Enter Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup widths="equal">
              <FormInput
                fluid
                icon="rupee"
                iconPosition="right"
                label={<label style={{ color: "black" }}>Offer</label>}
                placeholder="Enter Offer"
                type="number"
                value={courseOffer}
                onChange={(e) => setCourseOffer(e.target.value)}
                required
              />
              <FormInput
                fluid
                icon="rupee"
                iconPosition="right"
                label={<label style={{ color: "black" }}>Price</label>}
                placeholder="Enter Course Price"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup widths="equal">
              <FormInput
                fluid
                icon="image"
                iconPosition="right"
                label={<label style={{ color: "black" }}>Image</label>}
                placeholder="Enter Course Image"
                value={courseImage}
                onChange={(e) => setCourseImage(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup widths="equal">
              <FormInput
                fluid
                label={<label style={{ color: "black" }}>Description</label>}
                placeholder="Enter Course Description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                required
              />
            </FormGroup>

            <Button
              type="submit"
              color={props.color}
              size="medium"
              onClick={
                props.buttonName == "ADD" ? handelAddCourse : handleUpdateCourse
              }
            >
              {props.buttonName}
            </Button>
          </Form>
        )}

        {props.buttonName == "Delete" && (
          <Form inverted>
            <FormGroup widths="equal">
              <FormInput
                fluid
                label={<label style={{ color: "black" }}>Course ID</label>}
                placeholder="Enter Course Id"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              />
            </FormGroup>
            <Button
              type="submit"
              color={props.color}
              size="medium"
              onClick={handleDeleteCourse}
            >
              {props.buttonName}
            </Button>
          </Form>
        )}
      </Segment>
      <ModalDescription>
        <h3 style={{ color: "blue" }}>{status}</h3>
      </ModalDescription>
    </>
  );
};

export default CouserActionForm;
