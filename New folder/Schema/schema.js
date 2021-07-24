const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt,GraphQLBoolean,GraphQLList, GraphQLInputObjectType} = require('graphql')
var Receipts = require('../model/receiptschema')
const TransactionType= new GraphQLObjectType({
    name : "transaction",
    fields:()=>({
        price:{type:GraphQLInt},
        status:{type:GraphQLString}
    })
})
const ReceiptType = new GraphQLObjectType({
    name:"Receipt",
   fields:()=>({
    receiptID:{type:GraphQLInt},
    pID:{type:GraphQLInt},
    status:{type:GraphQLString},
    buyerID:{type:GraphQLInt},
    sellerID:{type:GraphQLInt},
    isMandatory:{type:GraphQLString},
    owner:{type:GraphQLString},
    index:{type:GraphQLString},
    note:{type:GraphQLString},
    tnxmode:{type:new GraphQLList(TransactionType)}
   })

})


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        getreceipt:{
            type: ReceiptType,
            args:{receiptID:{type:GraphQLInt}},
            resolve(parent,args){
                let data =  Receipts.findOne(args)
                return data
        

            }
        },
    }
})
const TransactionInputType= new GraphQLInputObjectType({
    name : "transactionInput",
    fields:()=>({
        price:{type:GraphQLInt},
        status:{type:GraphQLString}
    })
})
const Mutation = new GraphQLObjectType({
    name:"MutationType",
    fields:{
        initProposal:{
            type:ReceiptType,
            args:{
                receiptID:{type:GraphQLInt,require:true},
                sellerID:{type:GraphQLInt,require:true},
                buyerID:{type:GraphQLInt,require:true},
                isMandatory:{type:GraphQLBoolean,require:true}
            },
            resolve(parent,args){
               if(!args){
                   throw new  error.message
               }
                console.log(args)
                let receipt = new Receipts(args)
                receipt.save() 
                return args
            }
        },
        acceptProposal:{
            type:ReceiptType,
            args:{
                index:{type:GraphQLString,require:true},
                note:{type:GraphQLString,require:true},
                tnxmode:{type :new GraphQLList(TransactionInputType)}
            },
            resolve(parent,args){
                if(!args){
                    console.log("err")
                    throw new error.message
                }
                console.log(args)
                let receipt = new Receipts(args)
                receipt.save()
                return args
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation:Mutation
})