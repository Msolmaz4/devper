"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Token = require("../models/token.model")
module.exports={

     list : async (req,res)=>{
        const data = await res.getModelList(Token)
        console.log(data)
        res.status(200).send({
            error:false,
            detail:await res.getModelListDetails(Token),
            data
        })
     },
     create : async (req,res)=>{
        console.log(req.body)
        const data = await Token.create(req.body)
        res.status(201).send({
            error:false,
            data
        })
     },
     read : async (req,res)=>{
     const data = await Token.findOne({_id:req.params.id})
     res.status(200).send({
        error:false,
        data
    })
     },
 
     delete: async (req, res) => {
        const data = await Token.deleteOne({ _id: req.params.id });
        res.status(data.deletedCount ? 204 : 404).send({
          error: !data.deletedCount,
          data,
        });
        // const isDeleted = data.deletedCount >= 1 ? true : false;
        // res.status(isDeleted ? 204 : 404).send({
        //   error: !isDeleted,
        //   data,
        // });
      },
}