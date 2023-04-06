import { useState, useEffect } from "react";
import { useFetchData } from "../hooks/useFetchData";
import axios from "axios";

const FilterByCountry = () => {
	const { data, loading, error } = useFetchData(
		"http://localhost:8080/country"
	);
	console.log('paises',data)
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 100;
	const [listStates, setListStates] = useState([]);

	const [countrySelected, setCountrySelected] = useState();

	useEffect(() => {
		if (countrySelected) {
			axios
				.get(`http://localhost:8080/country/${countrySelected}`)
				.then((res) => setListStates(res.data));
		}
	}, [countrySelected]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
			<div className="max-w-full px-4 py-8 bg-white shadow sm:px-6 lg:px-8">
				<h1 className="text-2xl font-semibold text-gray-900 pb-8">
					Filter by Country
				</h1>
				<select onChange={(e) => setCountrySelected(e.target.value)}>
					<option default>Select country</option>
					{data.map((country) => (
						<option key={country.id_country} value={country.id_country}>
							{country.name}
						</option>
					))}
				</select>
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							{/* <th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Country
							</th> */}
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								State
							</th>
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
						{listStates &&
							listStates.map((data) => (
								<tr key={data.city}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{data.state}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{data.city}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{data.population}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default FilterByCountry;
