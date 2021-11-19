import React, { useContext, useState } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import Chart from "../assets/Chart";

const Activity = () => {
	const { balance, numberToCurrency, transactions } = useContext(TransactionContext);
	const [left, setLeft] = useState(0);
	const [chartIsBalance, setChartIsBalance] = useState(true);

	const toggle = () => {
		left ? setLeft(0) : setLeft(50);
		setChartIsBalance((prev) => !prev);
	};
	return (
		<div className='activity'>
			<div
				style={{
					textAlign: "center",
					marginTop: "27px",
				}}
			>
				Total balance
			</div>

			<div
				style={{
					color: "rgb(75, 49, 83)",
					fontSize: "xx-large",
					fontWeight: "bolder",
					textAlign: "center",
				}}
			>
				{numberToCurrency(balance)}
			</div>

			<div
				className='toggle-container'
				onClick={() => toggle()}
				onMouseDown={(e) => e.preventDefault()}
			>
				<div
					className='toggle-btn'
					style={{ left: `${left ? `calc(${left}% - 3px)` : `calc(${left}% + 3px)`}` }}
				></div>
				<div className='toggle-options'>
					<div
						style={{
							color: `${left ? "rgb(233, 168, 111)" : "white"}`,
							transitionDuration: "0.6s",
						}}
					>
						Balance
					</div>
					<div
						style={{
							color: `${!left ? "rgb(233, 168, 111)" : "white"}`,
							transitionDuration: "0.6s",
						}}
					>
						Income
					</div>
				</div>
			</div>
			<div className='chart' style={{ height: "400px" }}>
				<Chart
					transactionData={transactions.items}
					balance={balance}
					flag={chartIsBalance}
				/>
			</div>
		</div>
	);
};

export default Activity;
