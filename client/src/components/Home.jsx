import React from "react";

const Home = () => {
	return (
		<div className="flex items-center justify-center h-screen pl-2 bg-gray-200">
			<div className="flex-1 ml-4">
				<div className="w-5/6 text-center">
					<h1 className="text-4xl font-bold mb-4 pl-96">
						Welcome to the most used demographic App worldwide
					</h1>
					<p className="text-xl pl-96">
						In it you can make filters that will allow you to see the total
						population of your city
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
