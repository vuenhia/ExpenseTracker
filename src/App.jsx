import SalaryInput from "./assets/Components/SalaryInput";
import "./app.css";
import Expenses from "./assets/Components/Expenses";
import { useState, useEffect } from "react";
import BalanceForm from "./assets/Components/BalanceForm";
import ExpenseList from "./assets/Components/ExpenseList";
import Widget from "./assets/Components/Widget";

export default function App() {
	// Loading State
	const [isLoading, setIsLoading] = useState(true);
	const [saveStatus, setSaveStatus] = useState("");
	// Salary
	const [mode, setMode] = useState("hourly");
	const [hourlyRate, setHourlyRate] = useState("");
	const [hours, setHours] = useState("");
	const [salary, setSalary] = useState("");

	// expense
	const [expenses, setExpenses] = useState([]);
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [cost, setCost] = useState("");

	// Weekly / Bi-Weekly / Monthly / Yearly Calculation
	const [payPeriod, setPayPeriod] = useState("weekly");

	const calculate = () => {
		let totals = {};

		const totalExpenses = expenses.reduce((sum, expense) => {
			const cost = parseFloat(expense.cost) || 0;
			return sum + cost;
		}, 0);

		if (mode === "hourly") {
			const weekly = parseFloat(hourlyRate * hours) || 0;
			const biWeekly = parseFloat(weekly * 2);
			const yearly = parseFloat(weekly * 52);
			const monthly = parseFloat(weekly * 4.33);

			totals = { weekly, yearly, biWeekly, monthly };
		} else {
			const yearly = parseFloat(salary) || 0;
			const monthly = parseFloat(yearly / 12);
			const weekly = parseFloat(yearly / 52);
			const biWeekly = parseFloat(weekly * 2);

			totals = { monthly, weekly, biWeekly, yearly };
		}

		// Calculate 50/30/20 breakdown
		const breakdown = {
			needs: (totals.monthly * 0.5).toFixed(2),
			wants: (totals.monthly * 0.3).toFixed(2),
			savings: (totals.monthly * 0.2).toFixed(2),
		};

		// Subtract expenses from each period
		return {
			weeklyStartAmount: totals.weekly.toFixed(2),
			biWeeklyStartAmount: totals.biWeekly.toFixed(2),
			monthlyStartAmount: totals.monthly.toFixed(2),
			yearlyStartAmount: totals.yearly.toFixed(2),

			weekly: (totals.weekly - totalExpenses).toFixed(2),
			biWeekly: (totals.biWeekly - totalExpenses).toFixed(2),
			monthly: (totals.monthly - totalExpenses).toFixed(2),
			yearly: (totals.yearly - totalExpenses * 12).toFixed(2),

			breakdown: breakdown,
		};
	};

	const deleteExpense = (index) => {
		const newExpense = expenses.filter((_, i) => i !== index);
		setExpenses(newExpense);
	};

	const editExpenses = (index, updatedExpenses) => {
		const newExpenses = expenses.map((expense, i) => {
			if (i === index) {
				return updatedExpenses;
			}
			return expense;
		});
		setExpenses(newExpenses);
	};

	const loadData = async () => {
		try {
			const result = await window.storage.get("budget-data");
			if (result) {
				const data = JSON.parse(result.value);
				setMode(data.mode || "hourly");
				setHourlyRate(data.hourlyRate || "");
				setHours(data.hours || "");
				setSalary(data.salary || "");
				setExpenses(data.expenses || []);
				setSaveStatus("✓ Data loaded");
				setTimeout(() => setSaveStatus(""), 2000);
			}
		} catch (error) {
			console.log("No saved data found - starting fresh");
		} finally {
			setIsLoading(false);
		}
	};

	// const saveData = async () => {
	// 	try {
	// 		const data = {
	// 			mode,
	// 			hourlyRate,
	// 			hours,
	// 			salary,
	// 			expenses,
	// 		};
	// 		await window.storage.set("budget-data", JSON.stringify(data));
	// 		setSaveStatus("✓ Saved");
	// 		setTimeout(() => setSaveStatus(""), 1000);
	// 	} catch (error) {
	// 		console.error("Failed to save data:", error);
	// 		setSaveStatus("✗ Error Saving");
	// 	}
	// };

	// const clearAllData = async () => {
	// 	if (
	// 		window.confirm(
	// 			"Are you sure you want to clear all your budget data? This cannot be undone."
	// 		)
	// 	) {
	// 		try {
	// 			await window.storage.delete("budget-data");
	// 			setMode("hourly");
	// 			setHourlyRate("");
	// 			setHours("");
	// 			setSalary("");
	// 			setExpenses([]);
	// 			setCategory("");
	// 			setName("");
	// 			setCost("");
	// 			setSaveStatus("✓ All data cleared");
	// 			setTimeout(() => setSaveStatus(""), 2000);
	// 		} catch (error) {
	// 			console.error("Failed to clear data:", error);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	loadData();
	// }, []);

	// useEffect(() => {
	// 	if (!isLoading) {
	// 		saveData();
	// 	}
	// }, [mode, hourlyRate, hours, salary, expenses, isLoading]);

	const results = calculate();

	return (
		<div className="main-section">
			<div className="container">
				<div className="app-header">
					<div>
						<h1>Budget Calculator</h1>
					</div>
				</div>
				<BalanceForm results={results} mode={mode} />
				<div className="income-expenses">
					<SalaryInput
						mode={mode}
						setMode={setMode}
						hourlyRate={hourlyRate}
						setHourlyRate={setHourlyRate}
						hours={hours}
						setHours={setHours}
						salary={salary}
						setSalary={setSalary}
						results={results}
						payPeriod={payPeriod}
						setPayPeriod={setPayPeriod}
					/>
					<Expenses
						expenses={expenses}
						setExpenses={setExpenses}
						category={category}
						setCategory={setCategory}
						name={name}
						setName={setName}
						cost={cost}
						setCost={setCost}
					/>
				</div>

				<ExpenseList
					expenses={expenses}
					editExpenses={editExpenses}
					deleteExpense={deleteExpense}
				/>
				<Widget results={results} expenses={expenses} />
			</div>
		</div>
	);
}
