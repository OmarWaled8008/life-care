import express, { Router } from 'express'
const router : Router = express.Router()

import { adminLogin, adminLogout } from '../controllers/adminController'
import { authenticationUser } from '../middlewares/authentication'


router.route('/loginAdmin').post(adminLogin)
router.get("/logoutAdmin", authenticationUser, adminLogout)



export = router