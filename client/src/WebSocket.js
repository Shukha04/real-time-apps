import axios from 'axios'
import { useRef, useState } from 'react'

const Websocket = () => {
	const [messages, setMessages] = useState([])
	const [value, setValue] = useState('')
	const socket = useRef()
	const [connected, setConnected] = useState(false)
	const [username, setUsername] = useState('')

	const connect = () => {
		socket.current = new WebSocket('ws://localhost:3001')

		socket.current.onopen = () => {
			setConnected(true)
			const message = {
				event: 'connection',
				username,
				id: Date.now()
			}
			socket.current.send(JSON.stringify(message))
			console.log('Connection successfully')
		}

		socket.current.onmessage = ({ data }) => {
			const message = JSON.parse(data)
			setMessages(prev => [message, ...prev])
		}

		socket.current.onclose = () => {
			console.log('Socket is closed')
		}

		socket.current.onerror = () => {
			console.log('There is an error')
		}
	}

	const sendMessage = async () => {
		const message = {
			username,
			message: value,
			id: Date.now(),
			event: 'message'
		}
		socket.current.send(JSON.stringify(message))
		setValue('')
	}

	if (!connected) {
		return (
			<div className='center'>
				<div className='form'>
					<input
						type='text'
						placeholder='Write your name'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<button onClick={connect}>Login</button>
				</div>
			</div>
		)
	}

	return (
		<div className='center'>
			<div>
				<div className='form'>
					<input type='text' value={value} onChange={e => setValue(e.target.value)} />
					<button onClick={sendMessage}>Send</button>
				</div>
				<div className='messages'>
					{messages.map(({ event, id, username, message }) =>
						<div key={id}>
							{event === 'connection' ?
							 <div className='connection_message'>User {username} connected.</div> :
							 <div className='message'>{username}: {message}</div>
							}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Websocket
