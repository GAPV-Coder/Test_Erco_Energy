import { useEffect, useState } from "react";
import axios from "axios";

const FilterByCity = () => {
	const [cities, setCities] = useState(null);
	const [citySelected, setCitySelected] = useState(null);

	const fetchCitiesData = async () => {
		const data = await axios.get("http://localhost:8080/cities");
		setCities(data.data);
	};

	useEffect(() => {
		fetchCitiesData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
			<div className="max-w-full px-4 py-8 bg-white shadow sm:px-6 lg:px-8">
				<select onChange={(e) => setCitySelected(e.target.value)}>
					<option default>Select city</option>
					{cities &&
						cities.map((city) => (
							<option key={city.id_cities} value={city.id_cities}>
								{city.name}
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
								Population
							</th>
						</tr>
					</thead>
					{citySelected && (
						<tbody className="bg-white divide-y divide-gray-200">
							<tr key={`${citySelected.name}`}>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{citySelected.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{citySelected.population}
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

export default FilterByCity;