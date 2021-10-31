import React, { useContext } from "react";
import Card from "../assets/Card";
import { TransactionContext } from "../contexts/TransactionContext";
import TransactionList from "../assets/TransactionList";

const Main = () => {
	const { balance, transactions, isLoading } = useContext(TransactionContext);
	// const month = today.toLocaleString("default", { month: "long" });

	return (
		<div className='main'>
			<div className='dashboard'>
				<div className='dashboard-title'>Dashboard</div>
				<div className='card-area'>
					<Card balance={balance} />
				</div>
			</div>

			<div className='transaction'>
				<div className='transaction-title'>Transactions</div>
				<div className='transaction-list'>
					{isLoading && <div style={{ color: "gray", padding: "7px" }}>Loading...</div>}
					{transactions.total > 0 &&
						transactions.items.map((item) => (
							<TransactionList item={item} key={item.sys.id} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Main;
