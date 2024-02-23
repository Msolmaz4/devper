"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const department   =require("../controllers/department.controller")
const permission = require("../middlewares/permission")

router.route("/")
.get(department.list)
.post(permission.isAdmin,department.create)
router.route("/:id")
.get(department.read)
.put(department.update)
.patch(department.update)
.delete(permission.isAdmin,department.delete)
router.get("/:id/personnels",department.personnels)
/* ------------------------------------------------------- */
module.exports = router