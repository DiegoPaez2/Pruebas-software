import express from "express"
import { login, logout, registro } from "../controllers/auth.js"

const router = express.Router()


router.post("/registro", registro)
router.post("/login", login)
router.post("/logout", logout)

export default router