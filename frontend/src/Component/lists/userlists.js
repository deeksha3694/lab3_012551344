import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getItemQuery} from '../../queries/queries';
import {Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';

class Userlist extends Component{

    displayItems(){
        var data = this.props.data;
        if(data.loading){
            return(
                <div>
                    Loading Items....
                </div>
            )
        } else{
            return data.items.map(item =>{
                return(
                    <div className="display" >
                        <div>ITEM NAME: {item.itemname}</div>
                        <div>ITEM TYPE: {item.itemtype}</div>                                                
                    </div>
                )
            });
        }
    }

    render() {
        console.log(this.props);
        return(
            <div>
                <div className="loginnav">
                    <div>
                        <a href="#">
                           User Profile
                        </a>
                    </div>
                </div>
                <div>
                    {this.displayItems()}
                </div>
            </div>
        )
    }
}


export default graphql(getItemQuery) (Userlist);