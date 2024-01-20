import express, { Router } from 'express'
const router: Router = express.Router()
import { registerUser,loingUser, logoutUser } from '../controllers/authController'
import { authenticationUser } from '../middlewares/authentication'

router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(loingUser)
router.get("/logoutUser", authenticationUser, logoutUser)



export = router