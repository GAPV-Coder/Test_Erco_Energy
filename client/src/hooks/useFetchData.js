import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchData = (url, initialState = []) => {
	const [data, setData] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const response = await axios.get(url);
				setData(response.data);
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
};

