import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import Ownerlist from './lists/ownerlists';
import Ownerprofile from './profile/ownerprofile';
import userlists from './lists/userlists';
import OwnerSignup from './signup/ownersignup';
import UserSignup from './signup/usersignup';
import additem from './add/additem';
import Userlogin from './login/userlogin';
import Ownerlogin from './login/ownerlogin';
import userprofile from './profile/userprofile';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
  });
  
class Main extends Component{
    render() {
        return( 
            <div>
                <Route path="/userlogin" component={Userlogin}/>
                <Route path="/ownerlogin" component={Ownerlogin} />
                <Route path="/ownersignup" component={OwnerSignup} />
                <Route path="/usersignup" component={UserSignup} />
                <Route path="/ownerprofile" component={Ownerprofile} />
                <Route path="userprofile" component={userprofile}/>
                <Route path="/ownerlist" component={Ownerlist} />
                <Route path="/userlist" component={userlists} /> 
                <Route path="/additem" component={additem} />
            </div>
           
            
        );
    }
}


export default Main;