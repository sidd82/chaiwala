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
import md5 from "md5";
import firebase from "../../firebase";

export class Register extends Component {
  state = {
    segmentLoading: true,
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    buttonLoad: false,
    errors: [],
    memberRef: firebase.database().ref("members")
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        segmentLoading: false
      });
    }, 2000);
  }

  formIsValid = () => {
    let error;
    let errors = [];
    if (this.isFormEmpty(this.state)) {
      error = { message: "Please fill all the field" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.isPasswordValid(this.state)) {
      error = { message: "Password Invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  };

  handelSubmit = event => {
    event.preventDefault();
    if (this.formIsValid()) {
      this.setState({ buttonLoad: true, errors: [] });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser);
              this.setState({
                buttonLoad: false,
                username: "",
                email: "",
                password: "",
                passwordConfirmation: ""
              });
            })
            .catch(err => {
              this.setState({ buttonLoad: false });
              console.log(err);
            });
        })
        .catch(err => {
          this.setState({
            buttonLoad: false,
            errors: [].concat(err)
          });
          console.log(err);
        });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  saveUser = createdUser => {
    return this.state.memberRef.child(createdUser.user.displayName).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  render() {
    const {
      segmentLoading,
      buttonLoad,
      errors,
      username,
      email,
      password,
      passwordConfirmation
    } = this.state;
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
                value={username}
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
                value={email}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
              />
              <Button
                color="brown"
                fluid
                size="large"
                loading={buttonLoad}
                disabled={buttonLoad}
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              {errors.map(err => (
                <>
                  <h1>Error</h1>
                  <p>{err.message}</p>
                </>
              ))}
            </Message>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
