import axios from 'axios'
import { useEffect, useState } from 'react'

const LongPolling = () => {
	const [messages, setMessages] = useState([])
	const [value, setValue] = useState('')

	useEffect(() => {
		subscribe()
	}, [])

	const subscribe = async () => {
		try {
			const { data } = await axios.get('http://localhost:3001/get-messages')
			setMessages(prev => [data, ...prev])
			await subscribe()
		} catch (error) {
			setTimeout(() => {
				subscribe()
			}, 500)
		}
	}

	const sendMessage = async () => {
		await axios.post('http://localhost:3001/new-message', {
			message: value,
			id: Date.now()
		})
	}

	return (
		<div className='center'>
			<div>
				<div className='form'>
					<input type='text' value={value} onChange={e => setValue(e.target.value)} />
					<button onClick={sendMessage}>Send</button>
				</div>
				<div className='messages'>
					{messages.map(({ id, message }) =>
						<div className='message' key={id}>{message}</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default LongPolling
