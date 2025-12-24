export default function SalaryInput(props) {
	return (
		<div className="salary-inputs">
			<div className="wage">
				<div className="section-header">
					<h1>Income</h1>
				</div>

				<div className="income-type">
					<form>
						<input
							type="radio"
							checked={props.mode === "hourly"}
							onChange={() => props.setMode("hourly")}
						/>
						Hourly
					</form>
					<form>
						<input
							type="radio"
							checked={props.mode === "salary"}
							onChange={() => props.setMode("salary")}
						/>
						Salary
					</form>
				</div>
			</div>
			<div className="calculations">
				{props.mode === "hourly" ? (
					<>
						<input
							type="number"
							placeholder="Hourly rate"
							value={props.hourlyRate}
							onChange={(e) => props.setHourlyRate(e.target.value)}
						/>
						<input
							type="number"
							placeholder="Hours per week"
							value={props.hours}
							onChange={(e) => props.setHours(e.target.value)}
						/>
					</>
				) : (
					<>
						<input
							type="number"
							placeholder="Yearly salary"
							value={props.salary}
							onChange={(e) => props.setSalary(e.target.value)}
						/>
					</>
				)}
			</div>
		</div>
	);
}
