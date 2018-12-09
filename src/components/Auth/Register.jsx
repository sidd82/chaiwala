import React, { Component } from "react";
import { Grid, Icon, Header, Form, Segment, Button } from "semantic-ui-react";
import firebase from "../../firebase";

export class Register extends Component {
  state = {
    segmentLoading: true,
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        segmentLoading: false
      });
    }, 2000);
  }

  handelSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { segmentLoading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 700 }}>
          <Header as="h1" icon textAlign="center" color="brown">
            <Icon name="coffee" color="brown" size="large" />
          </Header>
          <Form onSubmit={this.handelSubmit}>
            <Segment
              color="brown"
              padded="very"
              loading={segmentLoading}
              raised
            >
              <Header as="h1" textAlign="center" color="brown">
                Register to <strong>ChaiWala</strong>
              </Header>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
              />
              <Button color="brown" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
