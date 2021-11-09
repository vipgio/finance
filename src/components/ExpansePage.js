import { useContext, useEffect, useState } from "react";
import TransactionList from "../assets/TransactionList";
import { TransactionContext } from "../contexts/TransactionContext";
import { BiPlusCircle } from "react-icons/bi";
import AddForm from "../assets/AddForm";

const ExpansePage = () => {
	const { transactions, isLoading, numberToCurrency, setFormIsActive } =
		useContext(TransactionContext);
	const [totalExpanse, setTotalExpanse] = useState(0);

	useEffect(() => {
		let total = 0;
		transactions.items &&
			transactions.items
				.filter((item) => !item.fields.isIncome)
				.forEach((item) => {
					total += item.fields.amount;
				});
		setTotalExpanse(total);
	}, [transactions]);

	return (
		<div className='expanse-page'>
			<div className='expanse-title'>
				Expanses
				<BiPlusCircle className='add-button' onClick={() => setFormIsActive(true)} />
			</div>
			<div className='expanse-list'>
				{isLoading && <div style={{ color: "gray", padding: "7px" }}>Loading...</div>}
				{transactions.total &&
					transactions.items
						.filter((item) => !item.fields.isIncome)
						.map((expanseItem) => (
							<TransactionList item={expanseItem} key={expanseItem.sys.id} />
						))}
			</div>
			<div className='expanse-total'>
				<div className='expanse-total-name'>Total</div>
				<div className='expanse-total-amount' style={{ color: "red" }}>
					{numberToCurrency(totalExpanse)}
				</div>
			</div>
			<AddForm />
		</div>
	);
};

export default ExpansePage;
