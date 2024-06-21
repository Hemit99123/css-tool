import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// Import the routes from the /routes dir
import indexRoute from './src/routes/index.route.js'

const app = express()
const PORT = process.env.PORT || 3000


// Enable envrionmental variables
dotenv.config()

// Middlewares 
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST"],
    credentials: true
}))

// Routes used
app.use('/', indexRoute)

// Listening to port 3000/production port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})