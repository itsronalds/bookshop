import express from 'express'
import authorControllers from '../controllers/authors'

const router = express.Router()

router.get('/', authorControllers.getAllAuthors)
router.post('/', authorControllers.createAuthor)

export default router
