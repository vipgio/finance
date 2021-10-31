import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { FaCcVisa } from "react-icons/fa";
const Card = ({ balance }) => {
	const { numberToCurrency } = useContext(TransactionContext);
	return (
		<div className='card-body'>
			<div className='card-name'>VISA</div>
			<div className='total-balance'>Total balance</div>
			<div className='card-balance'> {numberToCurrency(balance)}</div>
			<FaCcVisa className='visa-icon' size='50px' />
		</div>
	);
};

export default Card;
