const express = require("express")
const controller = require("../controller/controller")
const router = express.Router()

router.get("/res2", controller.api )
router.get("/res3", controller.try1 )

module.exports= router