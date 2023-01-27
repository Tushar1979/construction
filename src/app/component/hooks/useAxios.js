import { useReducer, useCallback } from "react";
import axios from "axios";

const initialState = {
	loading: false,
	error: null,
	response: null,
	extra: null,
	identifier: null,
};

const axiosDefaults = {
	
	baseURL: "https://jsonplaceholder.typicode.com",
	commonHeaders: {
		"Content-Type": "application/json",
	},
};

axios.defaults.baseURL = axiosDefaults.baseURL;
axios.defaults.headers.common = {
	...axios.defaults.headers.common,
	...axiosDefaults.commonHeaders,
};

const httpReducer = (currHttpState, action) => {
	switch (action.type) {
		case "SEND":
			return {
				loading: true,
				error: null,
				response: null,
				extra: null,
				identifier: action.identifier,
			};
		case "RESPONSE":
			return {
				...currHttpState,
				loading: false,
				response: action.response,
				extra: action.extra,
			};
		case "ERROR":
			return { loading: false, error: action.errorMessage };
		case "CLEAR":
			return initialState;
		default:
			throw new Error("Should not get there!");
	}
};

const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

	const clear = useCallback(() => {
		dispatchHttp({
			type: "CLEAR",
		});
	}, []);

	const sendRequest = useCallback((url, reqIdentifier, method, body, headers, reqExtra) => {
		dispatchHttp({
			type: "SEND",
			identifier: reqIdentifier,
		});

		let axiosConfig = { url, method, headers, body };

		axios(axiosConfig)
			.then((res) => {
				dispatchHttp({ type: "RESPONSE", response: res, extra: reqExtra });
			})
			.catch((err) => {
				console.log(err);
				dispatchHttp({
					type: "ERROR",
					errorMessage: err?.data?.message || "Something went wrong!",
				});
			});
	}, []);

	return {
		sendRequest: sendRequest,
		isLoading: httpState.loading,
		error: httpState.error,
		response: httpState.response,
		reqExtra: httpState.extra,
		reqIdentifier: httpState.identifier,
		clear: clear,
	};
};

export default useHttp;