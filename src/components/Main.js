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
						<ul>
							{transactions &&
								transactions.map((item) => (
									<>
										<div>
											{item.title} {item.date.slice(0, 10)} {item.amount}
										</div>
									</>
								))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
