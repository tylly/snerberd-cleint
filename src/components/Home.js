   
import SnowboardsIndex from './snowboards/SnowboardIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			<h2>Snowboards</h2>
			<SnowboardsIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home
