import React, {Component} from "react";
import {IUser} from "../../Helpers/interfaces"
import {baseURL, emailRegExp, emailFormat} from "../../Helpers/constants"
import User from "../Login/User";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    setIsAdmin: (setIsAdmin: boolean) => void,
    setSessionToken: (sessionToken: string) => void
};

interface IState {
    message: string,
    errMessage: string,
    userRecordAdded: boolean | undefined,
    // userList: IUser[],
    txtFirstName: string | undefined,
    txtLastName: string | undefined,
    txtEmail: string | undefined,
    txtPassword: string | undefined,
    errFirstName: string,
    errLastName: string,
    errEmail: string,
    errPassword: string,
    userID: number | undefined,
    firstName: string,
    lastName: string,
    email: string,
    updatedBy: number | undefined,
    admin: boolean | undefined,
    active: boolean | undefined,
    // isLoggedIn: boolean | undefined,
    // isAdmin: boolean | undefined,
    // sessionToken: string
};

class Register extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            userRecordAdded: undefined,
            // userList: [],
            txtFirstName: process.env.REACT_APP_FIRSTNAME_DEFAULT,
            txtLastName: process.env.REACT_APP_LASTNAME_DEFAULT,
            txtEmail: process.env.REACT_APP_EMAIL_DEFAULT,
            txtPassword: process.env.REACT_APP_PASSWORD_DEFAULT,
            errFirstName: "",
            errLastName: "",
            errEmail: "",
            errPassword: "",
            userID: undefined,
            firstName: "",
            lastName: "",
            email: "",
            updatedBy: undefined,
            admin: undefined,
            active: undefined
            // isLoggedIn: undefined,
            // isAdmin: undefined,
            // sessionToken: ""
        };

        this.register = this.register.bind(this);

    };

    register = () => {
        // console.log("Register.tsx register");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        // this.setState({userList: []});
        this.setState({userID: undefined});
        this.setState({firstName: ""});
        this.setState({lastName: ""});
        this.setState({email: ""});
        this.setState({updatedBy: undefined});
        this.setState({admin: undefined});
        this.setState({active: undefined});
        // this.setState({isLoggedIn: undefined});
        // this.setState({isAdmin: undefined});
        // this.setState({sessionToken: ""});

        let firstNameValidated: boolean = false;
        let lastNameValidated: boolean  = false;
        let emailValidated: boolean = false;
        let passwordValidated: boolean  = false;
        let formValidated: boolean  = false;


        if (this.state.txtFirstName !== undefined) {
            if (this.state.txtFirstName.trim().length > 0) {
                firstNameValidated = true;
                this.setState({errFirstName: ""});
                // console.log("Register.tsx register Valid First Name");
                // console.log("Register.tsx register firstNameValidated true", firstNameValidated);
            } else {
                firstNameValidated = false;
                this.setState({errFirstName: "Please enter a first name."});
                // console.log("Register.tsx register Invalid First Name");
                // console.log("Register.tsx register firstNameValidated false", firstNameValidated);
            };
        };

        if (this.state.txtLastName !== undefined) {
            if (this.state.txtLastName.trim().length > 0) {
                lastNameValidated = true;
                this.setState({errLastName: ""});
                // console.log("Register.tsx register Valid Last Name");
                // console.log("Register.tsx register lastNameValidated true", lastNameValidated);
            } else {
                lastNameValidated = false;
                this.setState({errLastName: "Please enter a last name."});
                // console.log("Register.tsx register Invalid Last Name");
                // console.log("Register.tsx register lastNameValidated false", lastNameValidated);
            };
        };

        if (this.state.txtEmail !== undefined) {
            if (this.state.txtEmail.trim().match(emailRegExp) && this.state.txtEmail.trim().length > 0) {
            // if (this.state.txtEmail.trim().match(emailFormat) && this.state.txtEmail.trim().length > 0) {
                emailValidated = true;
                this.setState({errEmail: ""});
                // console.log("Register.tsx register Valid Email Address");
                // console.log("Register.tsx register emailValidated true", emailValidated);
            } else {
                emailValidated = false;
                this.setState({errEmail: "Please enter a valid email address."});
                // console.log("Register.tsx register Invalid Email Address");
                // console.log("Register.tsx register emailValidated false", emailValidated);
            };
        };

        if (this.state.txtPassword !== undefined) {
            if (this.state.txtPassword.trim().length > 4) {
                passwordValidated = true;
                this.setState({errPassword: ""});
                // console.log("Register.tsx register Valid Password");
                // console.log("Register.tsx register passwordValidated true", passwordValidated);
            } else {
                passwordValidated = false;
                this.setState({errPassword: "Password must be at least 5 characters."});
                // console.log("Register.tsx register Invalid Password");
                // console.log("Register.tsx register passwordValidated false", passwordValidated);
            };
        };

        if (firstNameValidated && lastNameValidated && emailValidated && passwordValidated) {
            formValidated = true;
            // console.log("Register.tsx register Valid Form");
            // console.log("Register.tsx register formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("Register.tsx register Invalid Form");
            // console.log("Register.tsx register formValidated false", formValidated);
        };

        // console.log("Register.tsx register firstNameValidated", firstNameValidated);
        // console.log("Register.tsx register lastNameValidated", lastNameValidated);
        // console.log("Register.tsx register emailValidated", emailValidated);
        // console.log("Register.tsx register passwordValidated", passwordValidated);
        // console.log("Register.tsx register formValidated", formValidated);

        if (formValidated) {

            if (this.state.txtFirstName !== undefined && this.state.txtLastName !== undefined && this.state.txtEmail !== undefined && this.state.txtPassword !== undefined) {
                let userObject = {
                    firstName:  this.state.txtFirstName.trim(),
                    lastName:  this.state.txtLastName.trim(),
                    email:  this.state.txtEmail.trim(),
                    password:  this.state.txtPassword.trim()
                };
                // console.log("Register.tsx register userObject", userObject);

                let url: string = baseURL + "user/register";
                // console.log("Register.tsx register url", url);

                fetch(url, {
                    method: "POST",
                    headers:    new Headers ({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({user: userObject})
                })
                .then(response => {
                    // console.log("Register.tsx register response", response);
                    // if (!response.ok) {
                    //     throw Error(response.status + " " + response.statusText + " " + response.url);
                    // } else {
                        // if (response.status === 200) {
                            return response.json();
                        // } else {
                        //     return response.status;
                        // };
                    // };
                })
                .then(data => {
                    // console.log("Register.tsx register data", data);

                    // if (data !== 500) {
                        // let registerResponse: IPostResponse = data;
                        // console.log("Register.tsx register registerResponse", registerResponse);
    
                        this.setState({userRecordAdded: data.recordAdded});
                        // this.setState({isLoggedIn: data.isLoggedIn});
                        // this.setState({isAdmin: data.isAdmin});
                        this.setState({message: data.message});

                        this.props.setIsLoggedIn(data.isLoggedIn);
                        this.props.setIsAdmin(data.isAdmin);

                        if (data.recordAdded) {
                            // this.setState({userList: data});
                            this.setState({userID: data.userID});
                            this.setState({firstName: data.firstName});
                            this.setState({lastName: data.lastName});
                            this.setState({email: data.email});
                            this.setState({updatedBy: data.updatedBy});
                            this.setState({admin: data.admin});
                            this.setState({active: data.active});
                            // this.setState({isLoggedIn: data.isLoggedIn});
                            // this.setState({sessionToken: data.sessionToken});
                            this.props.setSessionToken(data.sessionToken);
                        } else {
                            // this.setState({isLoggedIn: data.isLoggedIn});
                            // this.setState({errMessage: data.error});
                            this.setState({errMessage: data.errorMessages});
                        };
                    // } else {
                    //     // console.log("Login.js error", json);
                    //     this.setState({errMessage: "Registration failed."});
                    // };

                })
                .catch(error => {
                    console.log("Register.tsx register error", error);
                    // console.log("Register.tsx register error.name", error.name);
                    // console.log("Register.tsx register error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        };

    };

    render() {

        return(
            <div>
                <h1>Register</h1>
                {this.state.message !== "" ? <p>{this.state.message}</p> : null}
                {this.state.errMessage !== "" ? <p>{this.state.errMessage}</p> : null}

                <label>First Name</label>
                <input type="text" id="txtFirstName" placeholder="First Name" value={this.state.txtFirstName} onChange={(event) => {/*console.log(event.target.value);*/this.setState({txtFirstName: event.target.value});}} />
                {this.state.errFirstName !== "" ? <p>{this.state.errFirstName}</p> : null}

                <label>Last Name</label>
                <input type="text" id="txtLastName" placeholder="Last Name" value={this.state.txtLastName} onChange={(event) => {/*console.log(event.target.value);*/this.setState({txtLastName: event.target.value});}} />
                {this.state.errLastName !== "" ? <p>{this.state.errLastName}</p> : null}

                <label>Email Address</label>
                <input type="text" id="txtEmail" placeholder="Email Address" value={this.state.txtEmail} onChange={(event) => {/*console.log(event.target.value);*/this.setState({txtEmail: event.target.value});}} />
                {this.state.errEmail !== "" ? <p>{this.state.errEmail}</p> : null}

                <label>Password</label>
                <input type="password" id="txtPassword" placeholder="Password" value={this.state.txtPassword} onChange={(event) => {/*console.log(event.target.value);*/this.setState({txtPassword: event.target.value});}} />
                {this.state.errPassword !== "" ? <p>{this.state.errPassword}</p> : null}

                <button onClick={this.register}>Register</button>
                <div>
                {this.state.userRecordAdded ? <User /*userList={this.state.userList}*/ userID={this.state.userID} firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email} updatedBy={this.state.updatedBy} admin={this.state.admin} active={this.state.active} isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} /> : null}
                </div>
          </div>
        );
    };
};

export default Register;