const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt} = require('graphql')
const _ = require('lodash')

const Receipt = [
    {pID:101,status:'Order is placed',receiptID:1},
    {pID:102,status:'Out for Delivery',receiptID:2},
    {pID:103,status:'Delivered',receiptID:3}
]
const ReceiptType = new GraphQLObjectType({
    name:"Receipt",
   fields:()=>({
    step:{type:GraphQLString},
    pID:{type:GraphQLInt},
    status:{type:GraphQLString},
    buyerID:{type:GraphQLInt},
    sellerID:{type:GraphQLInt},
    isMandatory:{type:GraphQLString},
    blockNumber:{type:GraphQLString},
    receiptID:{type:GraphQLInt},
    grnManager:{type:GraphQLString},
    templateConsIds:{type:GraphQLString},
    owner:{type:GraphQLString}
   })

})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        getreceipt:{
            type: ReceiptType,
            args:{receiptID:{type:GraphQLInt}},
            resolve(args){
                return _.find(Receipt,{receiptID: args.receiptID})
            }
        },
        getParentDocInternalId:{
            type:ReceiptType,
            args:{receiptID:{type:GraphQLInt}},
            resolve(args){
                return _.find(Receipt,{receiptID:args.receiptID})
            }
        },
        getSellerAndBuyer:{
            type:ReceiptType,
            args:{receiptID:{type:GraphQLInt}},
            resolve(args){
                return _.find(Receipt,{receiptID:args.receiptID})
            }
        },
        getSummary:{
            type:ReceiptType,
            args:{receiptID:{type:GraphQLInt}},
            resolve(args){
                return _.find(Receipt,{receipt:args.receiptID})
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query : RootQuery
})