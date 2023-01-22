import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { formatCount } from '@app/utils'
import './App.css'

const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : ''

function App() {
	const [count, setCount] = useState(-1)

	useEffect(() => {
		fetch(`${API_URL}/count`)
			.then((res) => res.json())
			.then(({ count }) => setCount(count))
	}, [])

	return (
		<div className="App">
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button
					onClick={() => {
						fetch(`${API_URL}/count`, { method: 'PATCH' })
							.then((res) => res.json())
							.then(({ count }) => setCount(count))
					}}
				>
					count is {formatCount(count)}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</div>
	)
}

export default App
