import { useState } from "react";

export default function ExpenseList(props) {
	const [selectedIndexToEdit, setSelectedIndexToEdit] = useState(null);
	const [editForm, setEditForm] = useState({
		category: "",
		name: "",
		cost: "",
	});

	// Filtered groups
	const needsExpense = props.expenses.filter(
		(expense) => expense.category === "Needs"
	);
	const wantsExpense = props.expenses.filter(
		(expense) => expense.category === "Wants"
	);
	const savingsExpense = props.expenses.filter(
		(expense) => expense.category === "Savings"
	);
	const needsTotal = needsExpense.reduce((sum, e) => sum + Number(e.cost), 0);
	const wantsTotal = wantsExpense.reduce((sum, e) => sum + Number(e.cost), 0);
	const savingsTotal = savingsExpense.reduce(
		(sum, e) => sum + Number(e.cost),
		0
	);

	const editing = (index, expense) => {
		setSelectedIndexToEdit(index);
		setEditForm({
			category: expense.category,
			name: expense.name,
			cost: expense.cost,
		});
	};

	const saveEdit = (index) => {
		props.editExpenses(index, editForm);
		setSelectedIndexToEdit(null);
	};

	const cancelEdit = () => {
		setSelectedIndexToEdit(null);
	};
	const renderList = (title, list, total) => (
		<div className={`expense-card ${title}`}>
			<h2>{title}</h2>
			<ul>
				{list.map((expense) => {
					const originalIndex = props.expenses.indexOf(expense);
					return (
						<li key={originalIndex}>
							{selectedIndexToEdit === originalIndex ? (
								// EDIT MODE
								<div className="editExpenseForm">
									<div className="edit-card">
										<div className="userExpenseCategory">
											<select
												value={editForm.category}
												onChange={(e) =>
													setEditForm({ ...editForm, category: e.target.value })
												}
											>
												<option value="Needs">Needs</option>
												<option value="Wants">Wants</option>
												<option value="Savings">Savings</option>
											</select>
										</div>

										<div className="userExpenseName">
											<input
												type="text"
												value={editForm.name}
												onChange={(e) =>
													setEditForm({ ...editForm, name: e.target.value })
												}
												placeholder="Name"
											/>
										</div>

										<div className="userExpenseCost">
											<input
												type="number"
												value={editForm.cost}
												onChange={(e) =>
													setEditForm({ ...editForm, cost: e.target.value })
												}
												placeholder="Cost"
											/>
										</div>

										<div className="edit-button">
											<button
												className="save-button"
												onClick={() => saveEdit(originalIndex)}
											>
												✓ Save
											</button>
											<button className="cancel-button" onClick={cancelEdit}>
												✗ Cancel
											</button>
										</div>
									</div>
								</div>
							) : (
								// NORMAL MODE
								<div className="expenseInformation">
									<div className="nameInformation">{expense.name}</div>
									<div className="costInformation">${expense.cost}</div>
									<div className="expenseButtons">
										<button onClick={() => editing(originalIndex, expense)}>
											Edit
										</button>
										<button onClick={() => props.deleteExpense(originalIndex)}>
											Delete
										</button>
									</div>
								</div>
							)}
						</li>
					);
				})}
			</ul>
			<div className="category-total">Total: ${total}</div>
		</div>
	);

	return (
		<div className="expense-list">
			<div className="section-header expense-list-header">
				<h2>Expense List</h2>
				<h2 style={{ display: "flex", gap: "10px", alignItems: "center" }}>
					<span>Total Cost:</span>
					<span
						style={{
							color: "#4c1d95",
							fontWeight: 700,
							textShadow: "0 0 8px rgba(79, 209, 197, 0.7)",
						}}
					>
						${needsTotal + wantsTotal + savingsTotal}
					</span>
				</h2>
			</div>

			{props.expenses.length === 0 ? (
				<p className="expenseListP">No expenses added yet</p>
			) : (
				<div className="render-list">
					<div className="list">
						{needsExpense.length > 0 &&
							renderList("Needs", needsExpense, needsTotal)}
						{wantsExpense.length > 0 &&
							renderList("Wants", wantsExpense, wantsTotal)}
						{savingsExpense.length > 0 &&
							renderList("Savings", savingsExpense, savingsTotal)}
					</div>
				</div>
			)}
		</div>
	);
}
