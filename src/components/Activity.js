import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import Chart from "../assets/Chart";

const Activity = () => {
	const { balance, numberToCurrency, transactions } = useContext(TransactionContext);

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
			<Chart transactionData={transactions.items} balance={balance} />
		</div>
	);
};

export default Activity;
