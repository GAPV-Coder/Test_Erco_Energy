import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className="bg-gray-800 text-gray-100 h-screen w-1/6 px-4 py-8 fixed top-0 left-0 overflow-y-auto">
			<div className="flex items-center justify-center">
				<span className="text-white text-2xl mx-2 font-semibold">
					Demographic App
				</span>
			</div>
			<nav className="mt-8">
				<ul className="text-md font-bold">
					<li className="my-px">
						<Link
							to="/"
							className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
						>
							<span className="ml-3">Home</span>
						</Link>
					</li>
					<li className="my-px">
						<Link
							to="/filter-by-country"
							className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
						>
							<span className="ml-3">Filter by country</span>
						</Link>
					</li>
					<li className="my-px">
						<Link
							to="/filter-by-state"
							className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
						>
							<span className="ml-3">Filter by state</span>
						</Link>
					</li>
					<li className="my-px">
						<Link
							to="/filter-by-city"
							className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
						>
							<span className="ml-3">Filter by city</span>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;