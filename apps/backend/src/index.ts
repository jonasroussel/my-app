import express from 'express'
import { sleep } from '@app/utils'

const PORT = parseInt(process.env.PORT ?? '3000')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', '*')
	next()
})

let count = 10

app.get('/count', (req, res) => {
	sleep(250).then(() => {
		res.json({ count })
	})
})
app.patch('/count', (req, res) => {
	count++
	res.json({ count })
})

app.listen(PORT, () => {
	console.log(`[INFO] server listening on port ${PORT}`)
})
