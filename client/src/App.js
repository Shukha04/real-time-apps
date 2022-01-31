import './app.css'
import EventSourcing from './EventSourcing'
import LongPolling from './LongPolling'
import Websocket from './WebSocket'

function App() {
	return (
		<div className='App'>
			{/*<LongPolling />*/}
			{/*<EventSourcing />*/}
			<Websocket />
		</div>
	)
}

export default App
