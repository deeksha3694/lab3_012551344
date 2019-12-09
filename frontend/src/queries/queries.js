import {gql} from 'apollo-boost';

const getItemQuery = gql`
    {
        items {
            itemname
            itemtype
            id
        }
    }
`;


const getOwnerDetails = gql`
    {
        owner {
            firstname
            lastname
            email
            password
            restaurant
            cuisine
            id
        }
    }
`;

const getOwnertoAdd = gql`
    {
        owners {
            restaurant
            cuisine
            id
        }
    }
`;

const userlogin = gql`
query userlogin($email: String, $password: String){
        userlogin(email: $email, password: $password){
            result
            users{
                email
                firstname
                lastname
                password
                id
              }
        }
    }`;

const ownerlogin = gql`
query ownerlogin($email: String, $password: String){
        ownerlogin(email: $email, password: $password){
            result
                owners{
                    firstname
                    lastname
                    email
                    password
                    restaurant
                    cuisine
                    id
                  }
            }
        }`;

const userprofile = gql`
    query userprofile($email: String){
        userprofile(email: $email){
            email
            firstname
            lastname
            password
        }
    }
`;

const ownerprofile = gql`
    query ownerprofile($email: String){
        ownererprofile(email: $email){
            firstname
            lastname
            email
            password
            restaurant
            cuisine
        }
    }
`;

export {getItemQuery, getOwnertoAdd , getOwnerDetails, userlogin, ownerlogin, userprofile, ownerprofile };