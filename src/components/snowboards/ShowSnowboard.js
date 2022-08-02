import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneSnowboard, updateSnowboard, removeSnowboard } from '../../api/snowboards'
import messages from '../shared/AutoDismissAlert/messages'
import EditSnowboardModal from './EditSnowboardModal'


const ShowSnowboard = (props) => {
    const [snowboard, setSnowboard] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    console.log('1')
    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to
    console.log('2')
    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the snowboard in showSnowboard', snowboard)
    // destructuring to get the id value from our route parameters
    console.log('3')
    useEffect(() => {
        getOneSnowboard(id)
            .then(res => setSnowboard(res.data.snowboard))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting snowboard',
                    message: messages.getSnowboardsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the pet
    // this function's promise chain should send a message, and then go somewhere
    const removeTheSnowboard = () => {
        removeSnowboard(user, snowboard._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeSnowboardSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing snowboard',
                    message: messages.removeSnowboardFailure,
                    variant: 'danger'
                })
            })
    }

    if (!snowboard) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ snowboard.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>length: { snowboard.length }</small></div>
                            <div><small>
                                Channel Bindings: { snowboard.channelBindings ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            snowboard.owner && user && snowboard.owner === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Snowboard
                                </Button>
                                <Button onClick={() => removeTheSnowboard()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Remove {snowboard.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditSnowboardModal 
                user={user}
                snowboard={snowboard} 
                show={editModalShow} 
                updateSnowboard={updateSnowboard}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowSnowboard