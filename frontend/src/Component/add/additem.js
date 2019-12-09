import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getOwnerDetails, getItemQuery} from '../../queries/queries';
import {Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';

class Additem extends Component{

    constructor(props){
        super(props);
        this.state = {
            itemname: '',
            itemtype: '',
            OwnerID: '',

        };
    }

    displayRestuarant(){
        var data = this.props.data;
        if(data.loading){
            return(<option>
                Loading Restuarant..
            </option>);
        }
        // else{
        //     return data.owners.map(owner =>{
        //         return(<option key={owner.id} value={owner.id}>{owner.restaurant}</option>)
        //     });
        // }
    }
   
    submitForm(e){
        // e.preventDefault()
        // console.log(this.state);
        // this.props.addBookMutation({
        //     variables: {
        //         name: this.state.name,
        //         genre: this.state.genre,
        //         authorId: this.state.authorId,
             
        //     },
        //     refetchQueries: [{ query: getItemQuery }]
        // });

    }

    render() {
        console.log(this.props);
        return(
            <form id="add-item" onSubmit={ this.submitForm.bind(this) } >
                
                <div className="field">
                    <label>Item name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Item type:</label>
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Restuarant:</label>
                    <select onChange={ (e) => this.setState({ ownerID: e.target.value }) } >
                        <option>Select Restuarant</option>
                        { this.displayRestuarant() }
                    </select>
                </div>
                <button>Submit</button>
            </form>
        )
    }
}


export default graphql(getItemQuery) (Additem);