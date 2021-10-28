import React, { useContext } from "react";
import Card from "../assets/Card";
import { TransactionContext } from "../contexts/TransactionContext";

const Main = () => {
	const { balance, transactions, isLoading } = useContext(TransactionContext);
	// const month = today.toLocaleString("default", { month: "long" });

	return (
		<div className='main'>
			<div className='dashboard'>
				<dashboard className='dashboard-title'>Dashboard</dashboard>
				<div className='card-area'>
					<Card />
				</div>
			</div>
			<div className='transaction'>
				<div className='transaction-title'>Transactions</div>
				<div>
					<div className='transaction-list'>
						{isLoading && <div style={{ color: "gray", padding: "7px" }}>Loading...</div>}
						<div>
							{transactions &&
								transactions.map((item) => (
									<div className='transaction-details'>
										<div className='details-name'>{item.title}</div>
										<div className='details-date'>{item.date.slice(0, 10)}</div>
										<div
											className='details-amount'
											style={{ color: item.isIncome ? "green" : "red" }}
										>
											${item.amount}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
