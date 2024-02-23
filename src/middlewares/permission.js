"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = {
    isLogin :async(req,res,next)=>{

        if(req.user && req.user.isActive){
            next()
        }else{
            res.errorStatusCode= 403
            throw new Error("No permission")
        }

    },
    isAdmin :async (req,res,next)=>{

        if(req.user && req.user.isActive && req.user.isAdmin){
            next()
        }else{
            res.errorStatusCode= 403
            throw new Error("No Admin")
        }
    }

}
    




   

 