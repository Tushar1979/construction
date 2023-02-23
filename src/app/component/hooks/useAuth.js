import axios from 'axios';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';



const useAuth = () => {
	const [userInfo, setUserInfo] = useState();
	const [token, setToken] = useState(localStorage.getItem('token'));
	
	const logout = () => {
	
		// localStorage.removeItem('token');
		if(window.location.pathname === "/login"){

		}else{
			window.location = '/login';
		}
		// window.location = '/login';
		setUserInfo(null);
	};

	useEffect(() => {
		try {
			let decodedToken = token ? jwtDecode(token) : null;
			
			// if (!decodedToken) {
			// 	decodedToken = urlToken ? jwtDecode(urlToken) : null;
            // 	if (decodedToken) {
			// 		localStorage.setItem('token', urlToken);
			// 		setToken(urlToken);
			// 	}
			// }

			if (decodedToken) {
				setUserInfo(decodedToken);
				
				
				axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
			} else {
				logout();
			}
		} catch (err) {
			console.log('catch')
			logout();
		}
	}, [token]);

	return { userInfo, setUserInfo };
};

export default useAuth;