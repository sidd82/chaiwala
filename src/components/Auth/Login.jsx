import React, { Component } from "react";
import {
  Grid,
  Icon,
  Header,
  Form,
  Segment,
  Button,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

export class Login extends Component {
  state = {
    segmentLoading: true,
    email: "",
    password: ""
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
          <Header as="h1" icon textAlign="center" color="orange">
            <Icon name="coffee" color="orange" size="large" />
          </Header>
          <Form onSubmit={this.handelSubmit}>
            <Segment
              color="orange"
              padded="very"
              loading={segmentLoading}
              raised
            >
              <Header as="h1" textAlign="center" color="orange">
                Register to <strong>ChaiWala</strong>
              </Header>

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

              <Button color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
