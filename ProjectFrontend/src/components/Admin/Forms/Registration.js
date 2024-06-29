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
import "./Registration.css";
const Registration = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [status, setStatus] = useState("");

  const addAdminUser = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post("http://localhost:2000/addAdminUser", {
        Name: name,
        Email: email,
        Phone: phone,
        Password: password,
        SecurityQuestion: securityQuestion,
      });

      setStatus(response.data);
    } catch (error) {
      setStatus("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Segment inverted className="segment">
        <Form onSubmit={addAdminUser} className="form">
          <FormGroup unstackable widths={2}>
            <FormInput
              label="Name"
              placeholder="Name"
              icon="user"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-input"
            />
            <FormInput
              label="Email"
              placeholder="Email"
              icon="envelope"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </FormGroup>
          <FormGroup widths={2}>
            <FormInput
              label="Phone"
              placeholder="Phone"
              icon="phone"
              required
              type="number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="form-input"
            />
            <FormInput
              label="Password"
              placeholder="Password"
              required
              type="password"
              icon="lock"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </FormGroup>
          <FormGroup widths="equal">
            <FormInput
              label="Security Question"
              placeholder="What is Your Favourite Sport"
              required
              icon="pencil"
              onChange={(e) => setSecurityQuestion(e.target.value)}
              value={securityQuestion}
              className="form-input"
            />
          </FormGroup>
          <FormCheckbox
            label="I agree to the Terms and Conditions"
            required
            className="form-checkbox"
          />
          <Button type="submit" className="button">
            Submit
          </Button>
        </Form>
      </Segment>
      <ModalDescription>
        <h3>{status}</h3>
      </ModalDescription>
    </>
  );
};

export default Registration;
