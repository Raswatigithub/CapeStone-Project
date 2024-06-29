import React, { useState } from "react";
import {
  FormInput,
  FormGroup,
  FormCheckbox,
  Button,
  Form,
  Segment,
  ModalDescription,
  Grid,
  GridColumn,
  MenuItem,
} from "semantic-ui-react";
import Modal from "../../Modal/Modal";
import Registration from "./Registration";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState();

  const [password, setPassword] = useState();
  const [securityQuestion, setSecurityQuestion] = useState();

  const [status, setStatus] = useState();
  axios.defaults.withCredentials = true;
  const AdminLogin = async () => {
    let responce = await axios.post("http://localhost:2000/getAdminUser", {
      Name: name,
      Password: password,
      SecurityQuestion: securityQuestion,
    });

    if (responce.data === "Login Successful") {
      navigate("/adminLogin", { state: { Name: name } });
      alert("Login Successful");
    } else {
      setStatus(responce.data);
    }
  };
  return (
    <>
      <Segment inverted color="gray">
        <Form inverted onSubmit={AdminLogin}>
          <FormGroup widths="equal">
            <Grid columns={1}>
              <GridColumn>
                <FormInput
                  style={{ width: "25em", marginBottom: "2em" }}
                  fluid
                  icon="user"
                  iconPosition="right"
                  label={<label style={{ color: "black" }}>Name</label>}
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <FormInput
                  style={{ marginBottom: "1.5em" }}
                  fluid
                  icon="lock"
                  iconPosition="right"
                  label={<label style={{ color: "black" }}>Password</label>}
                  placeholder="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </GridColumn>
            </Grid>
          </FormGroup>
          <FormGroup widths="equal">
            <FormInput
              style={{ color: "black" }}
              fluid
              label={<label style={{ color: "black" }}>SecurityQuestion</label>}
              placeholder="What is your favourite Sport?"
              icon="pencil"
              required
              onChange={(e) => setSecurityQuestion(e.target.value)}
              value={securityQuestion}
            />
          </FormGroup>
          <FormCheckbox
            label={
              <label style={{ color: "black" }}>
                I agree to the Terms and Conditions
              </label>
            }
          />

          <Button type="submit">Login</Button>
        </Form>
      </Segment>
      <ModalDescription>
        <h3>
          New Admin User?{" "}
          <Modal buttonName="Register Now">
            <Registration />
          </Modal>
        </h3>
        <h3>{status}</h3>
      </ModalDescription>
    </>
  );
};

export default Login;
