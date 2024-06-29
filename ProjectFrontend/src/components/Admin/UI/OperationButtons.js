import React from "react";
import { Card, Button, CardContent } from "semantic-ui-react";
import Modal from "../Modal/Modal";
import CouserActionForm from "../Forms/CourseActionForm";

const OperationButtons = () => (
  <div>
    <Card style={{ backgroundColor: "lightgray" }}>
      <CardContent>
        <Modal buttonName="Add Course">
          <CouserActionForm buttonName={"ADD"} />
        </Modal>
        <br></br>
        <br></br>
        <Modal buttonName="Update Course">
          <CouserActionForm buttonName={"Update"} />
        </Modal>
        <br></br>
        <br></br>
        <Modal buttonName="Delete Course">
          <CouserActionForm buttonName={"Delete"} />
        </Modal>
      </CardContent>
    </Card>
  </div>
);

export default OperationButtons;
