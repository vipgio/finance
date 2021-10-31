import React, { useContext } from "react";
import Card from "../assets/Card";
import { TransactionContext } from "../contexts/TransactionContext";
import TransactionList from "../assets/TransactionList";

const Main = () => {
	const { balance, transactions, isLoading, numberToCurrency } =
		useContext(TransactionContext);
	// const month = today.toLocaleString("default", { month: "long" });

	return (
		<div className='main'>
			<div className='dashboard'>
				<dashboard className='dashboard-title'>Dashboard</dashboard>
				<div className='card-area'>
					<Card balance={balance} />
				</div>
			</div>

			<div className='transaction'>
				<div className='transaction-title'>Transactions</div>
				<div className='transaction-list'>
					{isLoading && <div style={{ color: "gray", padding: "7px" }}>Loading...</div>}
					{transactions.total > 0 &&
						transactions.items.map((item) => <TransactionList item={item} />)}
				</div>
			</div>
		</div>
	);
};

export default Main;
