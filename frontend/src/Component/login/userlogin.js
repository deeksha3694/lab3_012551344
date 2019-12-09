import React, {Component} from 'react';
import axios from 'axios';
import {graphql} from 'react-apollo';
import {userlogin} from '../../queries/queries';
import {Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { Redirect } from 'react-router';



class Userlogin extends Component{

   
    constructor(props) {
        super(props);

        this.state = {
            Email: "",
            Password: "",
            formValidationFailure: false,
            isValidationFailure: true,
            errorRedirect: false,
            isAuthenticated : false,
            validationFailure: false

        }


        //Bind events      
        this.submitLoginData = this.submitLoginData.bind(this);
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
   

    //Define component to be rendered
    renderField(field) {

        const { meta: { touched, error } } = field;
        const className = touched && error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
        const inputType = field.type;
        const inputPlaceholder = field.placeholder;
        const errorMessageStyling =  touched && error ? "text-danger" : "";

        return (

            <div className="form-group">
                <label>{field.label}</label>
                <input className={className} type={inputType} placeholder={inputPlaceholder} {...field.input} />
                <div className={errorMessageStyling}>
                    <div>{touched ? error : ""}</div>
                    
                </div>
            </div>
        );
    }


    //
    // onSubmit(values) {
    //    axios.defaults.withCredentials = true;
    //    console.log('Val', values);
    //     var data = {
    //         Email: this.state.email,
    //         Password: this.state.password
    //     }

    //     //this.props.submitLogin(data);
    //     this.props.login(data);
    // }

    submitLoginData = () =>{
        axios.defaults.withCredentials = true;
       
        this.props.client.query({
            query : login,
            variables: {
                Username : this.state.email,
                Password : this.state.password
            }
        }).then((response)=>{
            console.log('Response', response.data);
            console.log('UserData', response.data.login.userData);
            if(response.data.login.result == true){
                
                localStorage.setItem("ProfileName",response.data.login.userData.FirstName);
                localStorage.setItem('accountType', response.data.login.userData.Accounttype);
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("Email", response.data.login.userData.Email);

                this.setState({
                    isAuthenticated:true
                });
            }
            else{
                this.setState({
                    validationFailure:true
                });
            }
        });

        
    }


    render() {
        return( 
            <div className = "bodylogin" >

                {this.state.authFlag === true ? <Redirect to="/home" /> : ""}
                
                <div>
                    <div className = "loginform">
                        
                            <div >
                                <h4 className="loginlabel" >Log in to GrubHub</h4>
                                <p>{this.state.msg}</p>
                            </div>
                            <form className="loginForm" onSubmit={this.submitLogin}>
                                <div >
                                    <div className="logincontainer">
                                        <input name="email" id="email" type="email" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                                    </div>
                                </div> 
                                <div >
                                    <div className="logincontainer" >
                                        <input name="password" id="password" type="password" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                    </div>
                                </div>
                                <form className="buttonContainer">
                                <div >
                                    <button className="loginbutton" type="submit">Log in </button>
                                    <label className="buttonlabel">
                                    </label>
                                    
                                    
                                </div>  
                                </form> 
                            </form>
                            <form className="logininsideContainer">
                                <div>
                                    <p className="logindownfont col-sm-6" > 
                                    <a className="col-sm-1" href="/usersignup">Sign up now >> </a>
                                    </p>
                            
                                </div>
                            </form>
        
                    </div>
                </div>
            </div>
           
            
        );
    }
}

const mapStateToProps = state => ({
    loginStateStore: state.login
});

function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = "Enter E-mail";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    return errors;
}

export default graphql(userlogin) (Userlogin);