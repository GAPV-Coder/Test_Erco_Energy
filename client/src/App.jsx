import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import FilterByCountry from "./components/FilterByCountry";
import FilterByState from "./components/FilterByState";
import FilterByCity from "./components/FilterByCity";

function App() {
	return (
		<>
			<div className="flex">
				<Sidebar />
				<div className="w-full">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/filter-by-country" element={<FilterByCountry />} />
						<Route path="/filter-by-state" element={<FilterByState />} />
						<Route path='filter-by-city' element={<FilterByCity />} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
