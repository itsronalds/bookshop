import express from 'express'
import bookControllers from '../controllers/books'

const router = express.Router()

router.get('/', bookControllers.getAllBooks)

export default router
