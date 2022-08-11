import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllSnowboards } from '../../api/snowboards'
import messages from '../shared/AutoDismissAlert/messages'

// SnowboardsIndex should make a request to the api
// To get all snowboards
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const SnowboardsIndex = (props) => {
    const [snowboards, setSnowboards] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in SnowboardsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllSnowboards()
            .then(res => setSnowboards(res.data.snowboards))
            .catch(err => 
                console.log(err)
            )
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If snowboards haven't been loaded yet, show a loading message
    if (!snowboards) {
        return <LoadingScreen />
    } else if (snowboards.length === 0) {
        return <p>No snowboards yet. Better add some.</p>
    }

    const snowboardCards = snowboards.map(snowboard => (
        <Card style={{ width: '30%', margin: 5}} key={ snowboard.id }>
            <Card.Header>{ snowboard.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/snowboards/${snowboard._id}`}>View { snowboard.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { snowboardCards }
        </div>
    )
}

export default SnowboardsIndex