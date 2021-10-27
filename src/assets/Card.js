import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
const Card = () => {
	const { balance } = useContext(TransactionContext);
	return (
		<div className='card-body'>
			<div className='card-name'>VISA</div>
			<div className='total-balance'>Total balance</div>
			<div className='card-balance'> ${balance}</div>
		</div>
	);
};

export default Card;
