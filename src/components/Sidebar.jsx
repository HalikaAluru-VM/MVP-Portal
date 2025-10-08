import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const [searchHistory, setSearchHistory] = useState([]);

	useEffect(() => {
		const stored = localStorage.getItem("eventSearchHistory");
		if (stored) setSearchHistory(JSON.parse(stored));
	}, []);

	// Listen for custom event from events page
	useEffect(() => {
		const handler = (e) => {
			if (e.detail && e.detail.search) {
				setSearchHistory((prev) => {
					const updated = [e.detail.search, ...prev.filter(s => s !== e.detail.search)].slice(0, 10);
					localStorage.setItem("eventSearchHistory", JSON.stringify(updated));
					return updated;
				});
			}
		};
		window.addEventListener("event-search", handler);
		return () => window.removeEventListener("event-search", handler);
	}, []);

	return (
		<aside className="h-screen w-56 bg-black flex flex-col px-4 py-6 gap-8 border-r border-[#232B39] justify-between">
			<div>
				<div className="flex flex-col items-start mb-8">
				</div>
				<nav className="flex flex-col ">
					{/* No navItems to display */}
				</nav>
			</div>
			{/* Search History */}
			{searchHistory.length > 0 && (
				<div className="mt-8">
					<h3 className="text-gray-400 text-xs font-semibold mb-2">Search History</h3>
					<ul className="flex flex-col gap-2">
						{searchHistory.map((item, idx) => (
							<li key={idx} className="text-gray-300 text-sm truncate">{item}</li>
						))}
					</ul>
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
