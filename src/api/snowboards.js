import apiUrl from '../apiConfig'
import axios from 'axios'

//READ - Index
export const getAllSnowboards = () => {
    return axios(`${apiUrl}/snowboards`)
}

//READ - Show
export const getOneSnowboard = (id) => {
    return axios(`${apiUrl}/snowboards/${id}`)
}

// CREATE
export const createSnowboard = (user, newSnowboard) => {
    console.log('hit')
	return axios({
		url: apiUrl + '/snowboards',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { snowboard: newSnowboard }
	})
}

// UPDATE
export const updateSnowboard = (user, updatedSnowboard) => {
    console.log('this is updatedSnowboard', updatedSnowboard)
	return axios({
		url: `${apiUrl}/snowboards/${updatedSnowboard._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { snowboard: updatedSnowboard }
	})
}

// DELETE
export const removeSnowboard = (user, snowboardId) => {
    return axios({
        url: `${apiUrl}/snowboards/${snowboardId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}