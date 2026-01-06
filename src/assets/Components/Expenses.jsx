import React, { useRef } from "react";

export default function Expenses(props) {
	const nameRef = useRef(null);

	const handleSelection = (e) => {
		e.preventDefault();

		const newExpense = {
			category: props.category,
			name: props.name,
			cost: props.cost,
		};

		console.log("New expense added:", newExpense);

		props.setExpenses([...props.expenses, newExpense]);

		props.setName("");
		props.setCost("");

		if (nameRef.current) {
			nameRef.current.focus();
		}
	};

	return (
		<div className="expenses-container">
			<div className="section-header">
				<h2>Add Expense</h2>
			</div>

			<form onSubmit={handleSelection}>
				<div className="form-group category">
					<select
						value={props.category}
						onChange={(e) => props.setCategory(e.target.value)}
					>
						<option value="">Select Category</option>
						<option value="Needs">Needs</option>
						<option value="Wants">Wants</option>
						<option value="Savings">Savings</option>
					</select>
				</div>

				<div className="form-group name">
					<input
						type="text"
						placeholder="Rent, Groceries"
						value={props.name}
						onChange={(e) => props.setName(e.target.value)}
						ref={nameRef}
					/>
				</div>

				<div className="form-group cost">
					<input
						type="number"
						placeholder="Cost"
						value={props.cost}
						onChange={(e) => props.setCost(e.target.value)}
					/>
				</div>

				<button className="primary-button" type="submit">
					<span>Add Expense</span>
				</button>
			</form>
		</div>
	);
}
