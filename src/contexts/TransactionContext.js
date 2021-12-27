import React, { createContext, useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
const contentful = require("contentful");
const contentfulManagement = require("contentful-management");

export const TransactionContext = createContext();

const TransactionContextProvider = (props) => {
	const emptyForm = { title: "", amount: "", isIncome: "", date: "" };
	const [transactionForm, setTransactionForm] = useState(emptyForm);
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [balance, setBalance] = useState(0);
	const [formIsActive, setFormIsActive] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const numberToCurrency = (num) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(num);
	};
	const updateList = () => {
		const client = contentful.createClient({
			space: process.env.REACT_APP_SPACE,
			accessToken: process.env.REACT_APP_ACCESS_TOKEN,
		});
		client.getEntries().then((entries) => {
			const transactions = entries.items.filter(
				(item) => item.sys.contentType.sys.id === "transaction"
			);
			setTransactions({
				...entries,
				items: transactions.sort((a, b) => (a.fields.date < b.fields.date ? 1 : -1)),
			});
			setIsLoading(false);
		});
	};

	useEffect(() => {
		updateList();
	}, []);

	useEffect(() => {
		if (transactions.items) {
			setBalance(() =>
				transactions.items.reduce(
					(acc, item) =>
						item.fields.isIncome
							? (acc += item.fields.amount)
							: (acc -= item.fields.amount),
					0
				)
			);
		}
	}, [transactions]);

	const deleteTransaction = (id) => {
		setIsLoading(true);
		const client = contentfulManagement.createClient({
			accessToken: process.env.REACT_APP_ACCESS_TOKEN_MANAGEMENT,
		});
		client
			.getSpace(process.env.REACT_APP_SPACE)
			.then((space) => space.getEnvironment("master"))
			.then((environment) => environment.getEntry(id))
			.then((entry) => entry.unpublish())
			.then((entry) => entry.delete())
			.then(() => {
				updateList();
			})
			.catch(console.error);
	};

	const addTransaction = (transactionDetails) => {
		setIsUploading(true);
		const { title, amount, isIncome, date } = transactionDetails;
		const client = contentfulManagement.createClient({
			accessToken: process.env.REACT_APP_ACCESS_TOKEN_MANAGEMENT,
		});
		client
			.getSpace(process.env.REACT_APP_SPACE)
			.then((space) => space.getEnvironment("master"))
			.then((environment) =>
				environment.createEntryWithId("transaction", uuid(), {
					fields: {
						title: {
							"en-US": title,
						},
						amount: {
							"en-US": Number(amount),
						},
						date: {
							"en-US": date,
						},
						isIncome: {
							"en-US": Boolean(isIncome),
						},
					},
				})
			)
			.then((entry) => {
				entry.publish();
			})
			.then(() => {
				setTimeout(() => updateList(), 1000);
			})
			.then(() => {
				setIsLoading(true);
				setIsUploading(false);
				setFormIsActive(false);
				setTransactionForm(emptyForm);
			})
			.catch(console.error);
	};
	return (
		<TransactionContext.Provider
			value={{
				transactions,
				balance,
				isLoading,
				numberToCurrency,
				deleteTransaction,
				setBalance,
				formIsActive,
				setFormIsActive,
				addTransaction,
				isUploading,
				transactionForm,
				setTransactionForm,
			}}
		>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;
