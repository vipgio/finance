import React, { createContext, useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
const contentful = require("contentful");
const contentfulManagement = require("contentful-management");

export const TransactionContext = createContext();

const TransactionContextProvider = (props) => {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [balance, setBalance] = useState(0);
	const [formIsActive, setFormIsActive] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const emptyForm = { title: "", amount: "", isIncome: "", date: "" };
	const [transactionForm, setTransactionForm] = useState(emptyForm);

	const numberToCurrency = (num) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(num);
	};
	const updateList = () => {
		const client = contentful.createClient({
			space: "5rirqymvemuy",
			accessToken: "FYR9n1Y7T1wOypOe1vObsgNJkU_M2fqtN8T_NznjZzE",
		});
		client.getEntries().then((entries) => {
			setTransactions({
				...entries,
				items: entries.items.sort((a, b) => (a.fields.date < b.fields.date ? 1 : -1)),
			});
			setIsLoading(false);
			// console.log(transactions);
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
			accessToken: "CFPAT-gndlrR56UY7koV260gjvpIPPK3-4D0hgn0sh9AhovJI",
		});
		client
			.getSpace("5rirqymvemuy")
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
			accessToken: "CFPAT-gndlrR56UY7koV260gjvpIPPK3-4D0hgn0sh9AhovJI",
		});
		client
			.getSpace("5rirqymvemuy")
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
				console.log(`Entry ${entry.sys.id} published.`);
				// console.log(entry);
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
