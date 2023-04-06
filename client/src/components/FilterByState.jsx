import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import axios from 'axios'
const FilterByState = () => {
	const [stateSelected, setStateSelected] = useState(null)
	const [cities, setCities] = useState([]);
	const [dataStates, setDataStates] = useState([])

	

	const fetchStateData = async () => {
		const data = await axios.get('http://localhost:8080/state')
		setDataStates(data.data)
	}
	const citiesData = async () => {
		const data = await axios.get(`http://localhost:8080/state/cities/${stateSelected}`)
		setCities(data.data)
	}
	useEffect(() => {
		fetchStateData()
	}, []);
	useEffect(() => {
		citiesData()
	},[stateSelected])

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error fetching data</p>;

	return (
		
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
			<div className="max-w-full px-4 py-8 bg-white shadow sm:px-6 lg:px-8">
			<select onChange={(e) => setStateSelected(e.target.value)}>
					<option default>Select state</option>
					{dataStates.map((sta) => (
						<option key={sta.id_state} value={sta.id_state} name={sta.name}>
							{sta.name}
						</option>
					))}
				</select>
				
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								City
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Population
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{cities.map((city) => (
							<tr key={`${city.name}`}>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{city.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{city.population}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default FilterByState;
