import { Form, Button, Container } from 'react-bootstrap'

const SnowboardForm = (props) => {
    const { snowboard, handleChange, heading, handleSubmit } = props

    return (
        <Container className='justify-content-center'>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                placeholder="What board?"
                name="name"
                id="name"
                value={ snowboard.name }
                onChange={ handleChange }
            />
            <Form.Label htmlFor="age">Length</Form.Label>
            <Form.Control
                placeholder="Length (cm)"
                type="number"
                name="length"
                id="length"
                value={ snowboard.length }
                onChange={ handleChange }
            />
            <Form.Check
                label="Channel bindings?"
                name="channelBindings"
                defaultChecked={ snowboard.channelBindings  }
                onChange={ handleChange }
            />
            <Button type="submit">Submit</Button>
        </Form>
        </Container>
    )
}

export default SnowboardForm