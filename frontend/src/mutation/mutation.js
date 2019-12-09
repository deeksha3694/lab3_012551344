import {gql} from 'apollo-boost';

const usersignup = gql`
mutation usersignup($firstname: String, $lastname: String, $email: String, $password: String, $userID: Int){
    usersignup(firstname: $firstname, lastname: $lastname, email: $email, password: $password, userID: $userID){
        success  
        duplicateUser      
    }
}`

const ownersignup = gql`
mutation ownersignup($firstname: String, $lastname: String, $email: String, $password: String, $restaurant: String, $cuisine: String, $ownnerID: Int){
    ownersignup(firstname: $firstname, lastname: $lastname, email: $email, password: $password, restaurant:$restaurant, cuisine:$cuisine, ownerID: $ownerID){
        success  
        duplicateUser      
    }
}`

const userUpdateProfile = gql`
    mutation userUpdateProfile($firstname: String, $lastname: String, $email: String, $password: String){
        updateProfile($firstname: String, $lastname: String, $email: String, $password: String){
            success
        }
    }
`
const ownerUpdateProfile = gql`
    mutation ownerUpdateProfile($firstname: String, $lastname: String, $email: String, $password: String, $restaurant: String, $cuisine: String){
        ownerUpdateProfile(firstname: $firstname, lastname: $lastname, email: $email, password: $password, restaurant:$restaurant, cuisine:$cuisine){
            success
        }
    }
`

export {usersignup,  ownersignup, userUpdateProfile, ownerUpdateProfile};