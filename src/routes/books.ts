import express from 'express'
import bookControllers from '../controllers/books'

const router = express.Router()

router.get('/', bookControllers.getAllBooks)
router.get('/:bookId/details', bookControllers.getBookDetails)
router.post('/', bookControllers.createBook)

export default router
