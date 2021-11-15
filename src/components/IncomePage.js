import { useContext, useEffect, useState } from "react";
import TransactionList from "../assets/TransactionList";
import { TransactionContext } from "../contexts/TransactionContext";
import AddForm from "../assets/AddForm";

const IncomePage = () => {
	const { transactions, isLoading, numberToCurrency, setFormIsActive } =
		useContext(TransactionContext);
	const [totalincome, setTotalincome] = useState(0);

	useEffect(() => {
		let total = 0;
		transactions.items &&
			transactions.items
				.filter((item) => item.fields.isIncome)
				.forEach((item) => {
					total += item.fields.amount;
				});
		setTotalincome(total);
	}, [transactions]);

	return (
		<div className='income-page'>
			<div className='income-title'>
				Incomes
				<button className='add-button' onClick={() => setFormIsActive(true)}>
					Add transaction
				</button>
			</div>
			<div className='income-list'>
				{isLoading && <div style={{ color: "gray", padding: "7px" }}>Loading...</div>}
				{transactions.total &&
					transactions.items
						.filter((item) => item.fields.isIncome)
						.map((incomeItem) => (
							<TransactionList item={incomeItem} key={incomeItem.sys.id} />
						))}
			</div>
			<div className='income-total'>
				<div className='income-total-name'>Total</div>
				<div className='income-total-amount' style={{ color: "green" }}>
					{numberToCurrency(totalincome)}
				</div>
			</div>
			<AddForm />
		</div>
	);
};

export default IncomePage;
