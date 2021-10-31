import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { BiPencil, BiTrash } from "react-icons/bi";

const TransactionList = ({ item }) => {
	const { numberToCurrency } = useContext(TransactionContext);
	return (
		<div className='transaction-details' key={item.sys.id}>
			<BiPencil className='edit-icon' />
			<div className='details-name'>{item.fields.title}</div>
			<div className='details-date'>{item.fields.date.slice(0, 10)}</div>
			<div
				className='details-amount'
				style={{ color: item.fields.isIncome ? "green" : "red" }}
			>
				{numberToCurrency(item.fields.amount)}
			</div>
			<BiTrash className='delete-icon' />
		</div>
	);
};

export default TransactionList;
