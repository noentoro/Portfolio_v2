import axios from 'axios';
import {
	AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_LOGGED_IN_USER, CLEAR_ERROR,
	FETCH_POSTS, FETCH_POST,
} from './types';

const ROOT_URL = process.env.REACT_APP_WP_API_URL;



export function tokenHeader(){
	const token = localStorage.getItem('_wp_react_token');
	return { headers: { Authorization: `Bearer ${token}` } };
}

export function signInUser(credentials){
	return (dispatch) => {
		dispatch(clearError());
		axios.post(`${ROOT_URL}/jwt-auth/v1/token`, credentials)
			.then(response => {
				localStorage.setItem('_wp_react_token',response.data.token);
				dispatch(fetchLoggedInUserData());
				dispatch({ type: AUTH_USER });
			})
			.catch((error) =>{
				dispatch(authError('Bad login info.'))
			});
	}
}

export function fetchLoggedInUserData(){
	return dispatch => {
		axios.get(`${ROOT_URL}/wp/v2/users/me`, tokenHeader())
			.then(response => {
				dispatch({ type: FETCH_LOGGED_IN_USER, payload: response.data });
			})
			.catch(error => { dispatch(signoutUser('Please log in again.')); });
	}
}

/* Posts */
export function fetchPosts(){
	return dispatch => {
		axios.get(`${ROOT_URL}/wp/v2/posts`, tokenHeader())
			.then(response => {
				dispatch({ type: FETCH_POSTS, payload: response.data })
			})
			.catch(error => dispatch(signoutUser('Please log in again.')) );
	}
}

export function fetchPost(id){
	return dispatch => {
		axios.get(`${ROOT_URL}/wp/v2/posts/${id}`, tokenHeader())
			.then(response => {
				dispatch({ type: FETCH_POST, payload: response.data })
			})
			.catch(error => dispatch(signoutUser('Please log in again.')) )
	}
}

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function clearError(){
	return{ type: CLEAR_ERROR }
}

export function signoutUser(msg = 'You are successfully logged out.'){
	localStorage.removeItem('_wp_react_token');
	return { type: UNAUTH_USER, payload: msg};
}
