import React, { createContext, useState, useEffect } from "react";
import { v1 as uuid } from "uuid";

export const TransactionContext = createContext();

const TransactionContextProvider = (props) => {
	const [transactions, setTransactions] = useState([
		{ name: "Netflix", amount: -200, id: uuid() },
		{ name: "Apple", amount: -100, id: uuid() },
		{ name: "Salary", amount: 1500, id: uuid() },
	]);
	const [balance, setBalance] = useState(5000);
	const addTransaction = () => {};
	return (
		<TransactionContext.Provider value={{ transactions, balance }}>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;
