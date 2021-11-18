import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { BiTrash } from "react-icons/bi";
import { DateTime } from "luxon";

const TransactionList = ({ item }) => {
	const { numberToCurrency, deleteTransaction } = useContext(TransactionContext);
	return (
		<div className='transaction-details' key={item.sys.id}>
			<div className='details-name'>{item.fields.title}</div>
			<div className='details-date'>
				{DateTime.fromISO(item.fields.date).toFormat("LLL dd',' yyyy")}
			</div>
			<div
				className='details-amount'
				style={{ color: item.fields.isIncome ? "green" : "red" }}
			>
				{numberToCurrency(item.fields.amount)}
			</div>
			<BiTrash
				className='delete-icon'
				onClick={() => deleteTransaction(item.sys.id)}
				size='20px'
			/>
		</div>
	);
};

export default TransactionList;
