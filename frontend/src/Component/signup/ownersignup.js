import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { usersignup } from '../../mutation/mutation'; 
import ApolloClient from 'apollo-boost';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

class OwnerSignup extends Component{
    constructor(props) {
        super(props);

        this.state = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            isNewUserCreated: false,
            validationError: false,
            errorRedirect: false
        }

        //bind
        this.submitSignup = this.submitSignup.bind(this);
       
    }



    //Define component to be rendered
    renderField(field) {

        console.log(field);
        const { meta: { touched, error } } = field;
        const className = touched && error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
        console.log('filef name', field.placeholder);
        const inputType = field.type;
        const inputPlaceholder = field.placeholder;
        const errorMessageStyling = touched && error ? "text-danger" : "";
        var divClassName = "";
        if (field.id === "firstname") {
            divClassName = "form-group login-form-control pad-top-20";
        }
        else {
            divClassName = "form-group login-form-control";
        }


        return (

            <div className={divClassName} >
                <input className={className} type={inputType} placeholder={inputPlaceholder} {...field.input} />
                <div className={errorMessageStyling}>
                    <div>{touched ? error : ""}</div>

                </div>
            </div>
        );
    }

     //Submit
     onSubmit(values){

        var data = {
            FirstName: values.firstname,
            LastName: values.lastname,
            Email: values.email,
            Password: values.password,
            Accounttype: 2
        }

       // e.preventDefault();
        this.props.signup(data);
        
    }

    submitSignup = ()=>{
        
        // e.preventDefault();
         this.props.signup({
             variables: {
                 FirstName: this.state.firstname,
                 LastName: this.state.lastname,
                 Email: this.state.email,
                 Password: this.state.password,
                 Accounttype: 1
             }
         }).then((response)=>{
             console.log('Resposne', response.data);
             if(response.data.signup.success == true){
                 this.setState({
                     isNewUserCreated : true
                 });
             }
             if(response.data.signup.duplicateUser ==true){
                 this.setState({
                     isDuplicateUser : true
                 });
             }
         });
     }

    render() {
        return( 
            <div>
              <div class="signup2">
                <br />
                <form class="outer-box1 signup1" >
                    {/* <form onSubmit={handleSubmit(this.submitLogin.bind(this))}> */}
                    <br />
                    <div className="">
                        <div className="elements2">
                            <h1> GRUBHUB </h1>
                            <h3 class="label">Create Owner account</h3>
                            
                            <br />
                            <p>{this.props.message}</p>
                        </div>
                        <div class="">
                            <div class="elements">
                                <span class="label">First Name</span>
                                <input name="firstname" id="firstname" type="text" placeholder="First Name" onChange={this.firstnameChangeHandler} required />
                            </div>

                        </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Last Name</span>
                                <input name="lastname" id="lastname" type="text" placeholder="Last Name" onChange={this.lastnameChangeHandler} required />
                            </div>
                            </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Email</span>
                                <input name="email" id="email" type="email" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                            </div>
                        </div>
                            <div class="">
                            <br/>
                                <div class="elements">
                                    <span class="label">Password</span>
                                    <input name="password" id="password" type="password" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                </div>
                            </div>
                            <div class="">
                            <div class="elements">
                                <span class="label">Restuarant</span>
                                <input name="restuarant" id="restuarant" type="text" placeholder="Restuarant" onChange={this.restuarantChangeHandler} required />
                            </div>

                        </div>
                        <div class="">
                            <div class="elements">
                                <span class="label">Cuisine</span>
                                <input name="cuisine" id="cuisine" type="text" placeholder="Cuisine" onChange={this.cuisineChangeHandler} required />
                            </div>

                        </div>
                            
                            <div class="">
                                <br />
                                <button class="button" onClick={this.submitSignup} >Sign Up</button>
                                <br /><br />
                                {/* <button class="btn btn-primary col-md-12 button" onClick={this.submitSignup}>Create your account</button> */}
                            </div>


                        
                    </div>
                </form>
                <br /><br />
            </div>
            </div>
           
            
        );
    }
}


export default (ownersignup) (OwnerSignup);