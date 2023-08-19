import express from 'express'

// Routes
import books from './routes/books'

const app = express()

app.use(express.json())

app.use('/api/books', books)

export default app
