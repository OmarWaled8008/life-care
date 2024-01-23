import express, { Router } from 'express'
const router : Router = express.Router()

import { adminLogin, adminLogout, getAllUsers, getAllDoctors } from '../controllers/adminController'
import { createDoctor } from '../controllers/doctorCreation'
import { authenticationUser} from '../middlewares/authentication'
import { isAdminMiddleware } from '../middlewares/authorization'
import { validateEmail } from '../middlewares/emailValidator'


router.route('/loginAdmin').post(adminLogin)
router.get("/logoutAdmin", authenticationUser, adminLogout)
router.post('/doctorCreation', authenticationUser, isAdminMiddleware, validateEmail,createDoctor)
router.get('/getAllUsers',authenticationUser, isAdminMiddleware, getAllUsers )
router.get('/getAllDoctors',authenticationUser, isAdminMiddleware, getAllDoctors )




export = router