import { useState } from "react";
export default function ExpenseList(props) {
	const [selectedIndexToEdit, setSelectedIndexToEdit] = useState(null);
	const [editForm, setEditForm] = useState({
		category: "",
		name: "",
		cost: "",
	});

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
	return (
		<div className="expense-list">
			<div className="section-header">
				<h2>Expense List</h2>
				<h2>Cost</h2>
			</div>
			{props.expenses.length === 0 ? (
				<p className="expenseListP">No expenses added yet</p>
			) : (
				<ul>
					{props.expenses.map((expense, index) => (
						<li key={index}>
							{selectedIndexToEdit === index ? (
								// Edit Form
								<div className="editExpenseForm">
									<div className="userExpenseCategory">
										<input
											type="text"
											value={editForm.category}
											onChange={(e) =>
												setEditForm({ ...editForm, category: e.target.value })
											}
											placeholder={"Category"}
										/>
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
											onClick={() => saveEdit(index)}
										>
											{" "}
											✓ Save
										</button>
										<button className="cancel-button" onClick={cancelEdit}>
											✗ Cancel
										</button>
									</div>
								</div>
							) : (
								<div>
									<div className="expenseInformation">
										<div className="left-side">
											<div className="categoryInformation">
												{expense.category}
											</div>
											<div className="nameInformation">{expense.name}</div>
										</div>

										<div className="right-side">
											<div className="costInformation">${expense.cost}</div>
											<div className="expenseButtons">
												<button onClick={() => editing(index, expense)}>
													Edit
												</button>
												<button onClick={() => props.deleteExpense(index)}>
													Delete
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
