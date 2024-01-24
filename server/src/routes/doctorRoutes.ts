import express, { Router } from 'express'
const router: Router = express.Router()

import { loingDoctor, logoutDocor } from '../controllers/doctorController'
import { authenticationUser } from '../middlewares/authentication'
import { isDoctorMiddleware } from '../middlewares/authorization'


router.post('/loginDoctor',loingDoctor)
router.use(authenticationUser, isDoctorMiddleware)
router.get('/logoutDoctor',logoutDocor)


export = router