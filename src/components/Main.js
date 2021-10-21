import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

const Main = () => {
	const { balance, transactions } = useContext(TransactionContext);
	return (
		<div className='main'>
			<div className='dashboard'>
				Dashboard
				<div className='card-area'>
					<div className='card-body'>
						Total balance
						<div className='card-balance'> {balance}IRR</div>
					</div>
				</div>
			</div>
			<div className='transaction'>
				Transactions
				<div>
					<div className='transaction-list'>
						<ul
							style={{
								listStyleType: "none",
								margin: 0,
								padding: "7px",
								fontSize: "small",
								display: "inline-block",
							}}
						>
							{transactions.map((trans) => (
								<>
									<li>{trans.name}</li>
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
