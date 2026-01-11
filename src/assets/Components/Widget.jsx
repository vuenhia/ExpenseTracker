import { useState } from "react";

export default function Widget({ results, expenses }) {
	const [open, setOpen] = useState(false);

	return (
		<div
			className={`widget-container ${open ? "open" : ""}`}
			onClick={() => setOpen(!open)}
		>
			{/* Collapsed */}
			{!open && (
				<div className="widget-collapsed">
					<span className="widget-label">Balance</span>
				</div>
			)}

			{/* Expanded */}
			{open && (
				<div className="widget-expanded">
					<h3>Balance Overview</h3>
					<div className="widget-row">
						<span>Average Leftovers per Week:</span>
						<span
							className={results.monthly / 4.33 < 0 ? "negative" : "positive"}
						>
							($
							{(results.monthly / 4.33).toFixed(2)})
						</span>
					</div>
					<div className="widget-expense-information-breakdown">
						<div className="widget-row">
							<span> - Monthly: ${results.monthly} / 4.33</span>
						</div>
					</div>
					<div className="widget-row">
						<span>Monthly Leftovers:</span>
						<span className={results.monthly < 0 ? "negative" : "positive"}>
							(${results.monthly}){" "}
						</span>
					</div>

					<div className="widget-row">
						<span>Yearly Leftovers:</span>
						<span className={results.yearly < 0 ? "negative" : "positive"}>
							(${results.yearly})
						</span>
					</div>
					<div className="widget-expense-information-breakdown">
						{expenses.map((expense) => (
							<div className="widget-row">
								<span>
									- {expense.name} (${expense.cost} × 12):
								</span>
								<span>${(expense.cost * 12).toFixed(2)}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
