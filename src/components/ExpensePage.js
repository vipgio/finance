import { useContext, useEffect, useState } from "react";
import TransactionList from "../assets/TransactionList";
import { TransactionContext } from "../contexts/TransactionContext";
import AddForm from "../assets/AddForm";

const ExpensePage = () => {
	const { transactions, isLoading, numberToCurrency, setFormIsActive } =
		useContext(TransactionContext);
	const [totalExpense, setTotalExpense] = useState(0);

	useEffect(() => {
		let total = 0;
		transactions.items &&
			transactions.items
				.filter((item) => !item.fields.isIncome)
				.forEach((item) => {
					total += item.fields.amount;
				});
		setTotalExpense(total);
	}, [transactions]);

	return (
		<div className='expense-page'>
			<div className='expense-title'>
				Expenses
				<button className='add-button' onClick={() => setFormIsActive(true)}>
					Add transaction
				</button>
			</div>
			<div className='expense-list'>
				{isLoading && <div style={{ color: "gray", padding: "7px" }}>Loading...</div>}
				{!isLoading &&
					transactions.total &&
					transactions.items
						.filter((item) => !item.fields.isIncome)
						.map((expenseItem) => (
							<TransactionList item={expenseItem} key={expenseItem.sys.id} />
						))}
			</div>
			<div className='expense-total'>
				<div className='expense-total-name'>Total</div>
				<div className='expense-total-amount' style={{ color: "red" }}>
					{numberToCurrency(totalExpense)}
				</div>
			</div>
			<AddForm />
		</div>
	);
};

export default ExpensePage;
