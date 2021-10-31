import React, { createContext, useState, useEffect } from "react";

export const TransactionContext = createContext();

const TransactionContextProvider = (props) => {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [balance] = useState(27000);
	const numberToCurrency = (num) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(num);
	};
	useEffect(() => {
		fetch(
			"https://cdn.contentful.com/spaces/5rirqymvemuy/environments/master/entries?access_token=FYR9n1Y7T1wOypOe1vObsgNJkU_M2fqtN8T_NznjZzE"
		)
			.then((res) => res.json())
			.then((data) => {
				setTransactions(data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.data);
			});
		console.log(transactions);
	}, [transactions]);
	return (
		<TransactionContext.Provider
			value={{ transactions, balance, isLoading, numberToCurrency }}
		>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;
