import {
	LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_USER,
	LOADING_USER,
	SET_UNAUTHENTICATED,
	SET_AUTHENTICATED,
	STOP_LOADING_UI
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`/users/login`, userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
			// dispatch({ type: SET_USER, payload: res.data.user });
			dispatch({ type: SET_AUTHENTICATED });
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch((err) => {
			dispatch({
				type    : SET_ERRORS,
				payload : err.response.data.message
			});
		});
};

export const signupUser = (newUserData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`/users`, newUserData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
			dispatch({ type: SET_USER, payload: res.data.user });
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch((err) => {
			dispatch({
				type    : SET_ERRORS,
				payload : err.response.data.message
			});
		});
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('Token');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};

const setAuthorizationHeader = (token) => {
	const Token = `Bearer ${token}`;
	localStorage.setItem('Token', Token);
	axios.defaults.headers.common['Authorization'] = Token;
};
