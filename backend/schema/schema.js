const graphql = require('graphql');
const _ = require('lodash');
const Item = require('../models/items');
const Owner = require('../models/owners');
const User = require('../models/user');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: ( ) => ({
        id: { type: GraphQLID },
        itemname: { type: GraphQLString },
        itemtype: { type: GraphQLString },
        owner: {
            type: OwnerDetails,
            resolve(parent, args){
                //return _.find(owners, { id: parent.ownerId });
                return Owner.findById(parent.ownerID);
            }
        }
    })
});

const OwnerDetails = new GraphQLObjectType({
    name: 'Owner',
    fields: ( ) => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        restaurant: { type: GraphQLString },
        cuisine : { type: GraphQLString},
        items : {
            type: new GraphQLList(ItemType),
            resolve(parent, args){
                //return _.filter(items, {ownerId: parent.id});
                return Item.find({ownerID:parent.id});
            }
        }
    })
});

const userloginResult = new GraphQLObjectType({
    name: 'loginResult',
    fields: () => ({
        result: { type: GraphQLBoolean },
        userData: { type: ProfileType }
    })
});

const usersignupResult = new GraphQLObjectType({
    name: 'signupResult',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const ownerloginResult = new GraphQLObjectType({
    name: 'loginResult',
    fields: () => ({
        result: { type: GraphQLBoolean },
        userData: { type: ProfileType }
    })
});

const ownersignupResult = new GraphQLObjectType({
    name: 'signupResult',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        item: {
            //Query for particular item
            type: ItemType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return _.find(items, { id: args.id });
                return Item.findById(args.id);
            }
        },
        owner: {
            type: OwnerDetails,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return _.find(owners, { id: args.id });
                return Owner.findById(args.id);
            }
        },
        //list of items
        items: {
            type: new GraphQLList(ItemType),
            resolve(parent, args){
                //return items;
                return Item.find({});
            }
        },
       
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addOwner: {
            type: OwnerDetails,
            args:{
                firstname: {type: GraphQLString},
                lastname: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                restaurant: { type: GraphQLString },
                cuisine : { type: GraphQLString},
            },
            resolve(parent,args){
                let owner = new Owner({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    password: args.password,
                    restaurant: args.restaurant,
                    cuisine: args.cuisine,
                });
                //Save the database to mongoose
            return   owner.save();
            }
        },

        addItem: {
            type:ItemType,
            args:{
                itemname: {type: GraphQLString},
                itemtype: {type: GraphQLString},
                ownerID: {type: GraphQLID}
            },
            resolve(parent, args){
                let item = new Item({
                    itemname: args.itemname,
                    itemtype: args.itemtype,
                    ownerID: args.ownerID,
                });
            return item.save();
            }
        },
        usersignup: {
            type: signupResult,
            args: {
                firstname: {type: GraphQLString},
                lastname: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    var successResult = false;
                var duplicateUserResult = false;
                    await Model.Userdetails.findOne({
                        "Email": args.Email
                    }, (err, user) => {
                        if (err) {

                        }
                        else {
                            if (user) {
                                console.log('User Exists!', user);
                                if (args.Accounttype === user.Accounttype || user.Accounttype == 3) {
                                    console.log('Duplicate user');
                                    duplicateUserResult = true;
                                    
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                    resolve(resultData);

                                }
                                else {
                                    user.Accounttype = 3;

                                    user.save().then(async (doc) => {

                                        console.log("User saved successfully.", doc);
                                        //callback(null, doc);
                                        successResult = true;

                                        var resultData = {
                                            success: successResult,
                                            duplicateUser: duplicateUserResult
                                        }
                                        resolve(resultData);

                                    });

                                }

                            }
                            else {
                                var user = new Model.Userdetails({
                                    firstname: args.firstname,
                                    lastname: args.lastname,
                                    email: args.email,
                                    password: args.password,
                                    restaurant: args.restaurant,
                                    cuisine: args.cuisine,
                                    Accounttype: args.Accounttype,
                                });
                                console.log('Use saving..');
                                user.save().then((doc) => {
                                    console.log("User saved successfully.", doc);
                                    successResult = true;
                                    console.log('EOF');
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                resolve(resultData);
                                });

                            }
                            
                        }
                    });
                });
            }
        },
        ownersignup: {
            type: signupResult,
            args: {
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                password: args.password,
                restaurant: args.restaurant,
                cuisine: args.cuisine,
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    var successResult = false;
                var duplicateUserResult = false;
                    await Model.Userdetails.findOne({
                        "Email": args.Email
                    }, (err, user) => {
                        if (err) {

                        }
                        else {
                            if (user) {
                                console.log('User Exists!', user);
                                if (args.Accounttype === user.Accounttype || user.Accounttype == 3) {
                                    console.log('Duplicate user');
                                    duplicateUserResult = true;
                                    
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                    resolve(resultData);

                                }
                                else {
                                    user.Accounttype = 3;

                                    user.save().then(async (doc) => {

                                        console.log("User saved successfully.", doc);
                                        //callback(null, doc);
                                        successResult = true;

                                        var resultData = {
                                            success: successResult,
                                            duplicateUser: duplicateUserResult
                                        }
                                        resolve(resultData);

                                    });

                                }

                            }
                            else {
                                var user = new Model.Userdetails({
                                    firstname: args.firstname,
                                    lastname: args.lastname,
                                    email: args.email,
                                    password: args.password,
                                    restaurant: args.restaurant,
                                    cuisine: args.cuisine,
                                    Accounttype: args.Accounttype,
                                });
                                console.log('Use saving..');
                                user.save().then((doc) => {
                                    console.log("User saved successfully.", doc);
                                    successResult = true;
                                    console.log('EOF');
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                resolve(resultData);
                                });

                            }
                            
                        }
                    });
                });
            }
        },
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    //we are passing property called mutation
    mutation: Mutation
});