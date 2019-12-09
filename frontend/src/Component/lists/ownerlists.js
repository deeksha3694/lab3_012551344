import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getItemQuery} from '../../queries/queries';


class Ownerlist extends Component{

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
                        <div key={item.id}>ITEM NAME: {item.itemname}</div>
                        <div key={item.id}>ITEM TYPE: {item.itemtype}</div>                                                
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
                        <a href="/ownerprofile">
                            Owner Profile
                        </a>
                        <a href="/additem">
                            Add item
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


export default graphql(getItemQuery) (Ownerlist);