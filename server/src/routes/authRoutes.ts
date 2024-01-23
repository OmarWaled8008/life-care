import express, { Router } from 'express'
const router: Router = express.Router()
import { registerUser,loingUser, logoutUser } from '../controllers/authController'
import { authenticationUser } from '../middlewares/authentication'
import { validateEmail } from '../middlewares/emailValidator'

router.post("/registerUser",validateEmail,registerUser)
router.route("/loginUser").post(loingUser)
router.get("/logoutUser", authenticationUser, logoutUser)



export = router