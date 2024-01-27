import express, { Router } from 'express'
const router: Router = express.Router()

import { loingDoctor,
        logoutDocor,
        requestPasswordReset,
        resetPassword,
        getDoctorDataById,
        getDoctorAppointments,
        acceptOrCancel
} from '../controllers/doctorController'
import { authenticationUser } from '../middlewares/authentication'
import { isDoctorMiddleware } from '../middlewares/authorization'


router.post('/loginDoctor',loingDoctor)
router.use(authenticationUser, isDoctorMiddleware)
router.get('/profile/:id', getDoctorDataById)
router.get('/appointments', getDoctorAppointments)
router.put('/appointments/action/:id', acceptOrCancel)
router.post('/reset-password/request', requestPasswordReset)
router.post('/reset-password/complete', resetPassword);
router.get('/logoutDoctor',logoutDocor)


export = router