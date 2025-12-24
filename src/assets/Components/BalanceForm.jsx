export default function BalanceForm(props) {
	const hasIncome = props.results.monthly > 0;

	return (
		<div className="balance-container">
			{!hasIncome ? (
				<div className="empty-state">
					<h3>Enter your income to get started</h3>
					<p>
						Add your salary or hourly rate below to see your personalized budget
						breakdown
					</p>
				</div>
			) : (
				<>
					<div className="section-header">
						<h2>Balance Overview</h2>
					</div>
					<div className="income-period">
						<div className="period-grid">
							<div className="period-item">
								<span className="period-label">Weekly</span>
								<span className="period-amount">${props.results.weekly}</span>
							</div>
							<div className="period-item">
								<span className="period-label">Bi-Weekly</span>
								<span className="period-amount">${props.results.biWeekly}</span>
							</div>
							<div className="period-item">
								<span className="period-label">Monthly</span>
								<span className="period-amount">${props.results.monthly}</span>
							</div>
							<div className="period-item">
								<span className="period-label">Yearly</span>
								<span className="period-amount">${props.results.yearly}</span>
							</div>
						</div>
					</div>
					<div className="budget-section">
						<h2>Suggested Budget Breakdown</h2>
						<div className="budget-breakdown">
							<div className="budget-card needs">
								<div className="card-header">
									<div className="card-title">
										<h3>Needs</h3>
										<span className="percentage">50%</span>
									</div>
								</div>
								<div className="card-amount">
									${props.results.breakdown.needs}
								</div>
							</div>

							<div className="budget-card wants">
								<div className="card-header">
									<div className="card-title">
										<h3>Wants</h3>
										<span className="percentage">30%</span>
									</div>
								</div>
								<div className="card-amount">
									${props.results.breakdown.wants}
								</div>
							</div>

							<div className="budget-card savings">
								<div className="card-header">
									<div className="card-title">
										<h3>Savings</h3>
										<span className="percentage">20%</span>
									</div>
								</div>
								<div className="card-amount">
									${props.results.breakdown.savings}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
