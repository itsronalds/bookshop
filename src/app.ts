import express from 'express'

// Routes
import books from './routes/books'
import authors from './routes/authors'

const app = express()

app.use(express.json())

app.use('/api/books', books)
app.use('/api/authors', authors)

export default app
