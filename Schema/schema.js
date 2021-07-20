const {GraphQLObjectType,GraphQLString,GraphQLSchema} = require('graphql')

const Receipt = new GraphQLObjectType({
    id:{type:GraphQLInt},
    step:{type:GraphQLString},
    pID:{type:GraphQLInt},
    jsonLD:{type:GraphQLObjectType},
    status:{type:GraphQLString},
    txnMode:{typr:GraphQLString},
    buyerID:{type:GraphQLInt},
    sellerID:{type:GraphQLInt},
    isMandatory:{type:GraphQLString},
    blockNumber:{type:GraphQLInt},
    receiptID:{type:GraphQLInt},
    grnManager:{type:GraphQLString},
    templateConsIds:{type:GraphQLInt},
    owner:{type:GraphQLString}

})

const RootQuery = new GraphQLObjectType({
    name:'RootQuerytype',
    fields:{
        getreceipt:{
            args:{id:{type:GraphQLInt}},
            resolve(parent,args){
                //code to get data from Db
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query : RootQuery
})