import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ownerUpdateProfile} from '../../mutation/mutation';
import {ownerprofile} from '../../queries/queries';


class Ownerprofile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            errorRedirect: false,
        }

        //Bind
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        //this.loadProfile =this.loadProfile.bind(this);
    }

    async componentDidMount() {
       
        this.props.client.query({
            query : profile,
            variables: {
                email : localStorage.getItem("email")
            }
        }).then((response)=>{
            console.log('Response profile', response.data);
            const result = response.data.profile;
            var keyArray = Object.keys(response.data.profile);

            for (var i = 0; i < keyArray.length; i++) {
                console.log('keyArr', keyArray[i]);
                var name = keyArray[i];
                console.log('result[i]', result[name])
                this.setState({
                    [name]: result[name]
                });
            }
            console.log('state', this.state);
            });
        

        console.log('data:', this.props.data);


    }

import {ownerUpdateProfile} from '../../mutation/mutation';
import {ownerprofile} from '../../queries/queries';
        this.setState({
            [name]: value
        });
    }

    saveChanges = (e) => {
        e.preventDefault();



        this.props.client.mutate({
            mutation: updateProfile,
            variables:{
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                restuarant: this.state.restuarant,
                cuisine: this.state.cuisine
            }

        });
        
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
                            <h3 class="label">Owner Profile</h3>
                            
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
                                <button class="button" onClick={this.submitSignup} >Update</button>
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

const mapStateToProps = state => ({
    profileStateStore: state.profile,
    loginStateStore: state.login
})

export default compose(
    graphql(ownerprofile, { name: "ownerprofile" }),
    graphql(ownerUpdateProfile, { name: "ownerUpdateProfile" })) (Ownerprofile);