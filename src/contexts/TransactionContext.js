import React, { createContext, useState, useEffect } from "react";
import { v1 as uuid } from "uuid";

export const TransactionContext = createContext();

const TransactionContextProvider = (props) => {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [balance, setBalance] = useState(27000);
	useEffect(() => {
		fetch(
			"https://cdn.contentful.com/spaces/5rirqymvemuy/environments/master/entries?access_token=FYR9n1Y7T1wOypOe1vObsgNJkU_M2fqtN8T_NznjZzE"
		)
			.then((res) => res.json())
			.then((data) => {
				const dataArray = data.items.map((element) => {
					return element.fields;
				});
				setTransactions(dataArray);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.data);
			});
		console.log(transactions);
	}, []);
	return (
		<TransactionContext.Provider value={{ transactions, balance, isLoading }}>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;
