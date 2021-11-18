import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { TransactionContext } from "../contexts/TransactionContext";
import { DateTime } from "luxon";

const AddForm = () => {
	const {
		formIsActive,
		setFormIsActive,
		addTransaction,
		isUploading,
		transactionForm,
		setTransactionForm,
	} = useContext(TransactionContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		addTransaction(transactionForm);
		console.log(transactionForm);
	};
	return (
		formIsActive && (
			<div className='add-modal'>
				<IoMdClose
					size='75px'
					onClick={() => setFormIsActive(false)}
					cursor='pointer'
					style={{ position: "fixed", right: "0" }}
				/>
				<form className='add-form' onSubmit={handleSubmit}>
					<div className='add-form-title'>Add a new transaction</div>

					<label>Enter transaction name:</label>
					<input
						type='text'
						required
						disabled={isUploading && true}
						value={transactionForm.title}
						onChange={(e) =>
							setTransactionForm((prev) => ({ ...prev, title: e.target.value }))
						}
					/>

					<label>Enter transaction date:</label>
					<input
						type='datetime-local'
						required
						max={`${DateTime.now().toISODate()}T23:59`} //'2021-11-15T00:00' //????
						value={transactionForm.date}
						disabled={isUploading && true}
						onChange={(e) =>
							setTransactionForm((prev) => ({ ...prev, date: e.target.value }))
						}
					/>

					<label>Enter transaction amount:</label>
					<input
						type='number'
						required
						disabled={isUploading && true}
						min='1'
						value={transactionForm.amount}
						onChange={(e) => {
							setTransactionForm((prev) => ({ ...prev, amount: e.target.value }));
							console.log("amount: ", transactionForm.amount);
						}}
					/>
					<label>Choose income or expense:</label>
					<div className='radio'>
						<input
							className='radio-i'
							type='radio'
							value={true}
							name='isIncome'
							// disabled={isUploading && true}
							onChange={(e) => {
								console.log(e.target.value);
								setTransactionForm((prev) => ({ ...prev, isIncome: true }));
								console.log("before: ", transactionForm);
								setTimeout(() => console.log(transactionForm), 2000);
							}}
						/>
						<label style={{ verticalAlign: "middle" }}>Income</label>

						<input
							className='radio-e'
							type='radio'
							value={false}
							name='isIncome'
							// disabled={isUploading && true}
							onChange={(e) => {
								console.log(e.target.value);
								setTransactionForm((prev) => ({ ...prev, isIncome: false }));
								console.log("before: ", transactionForm);
								setTimeout(() => console.log(transactionForm), 2000);
							}}
						/>
						<label style={{ verticalAlign: "middle" }}>Expense</label>
					</div>
					{/* <div>
						<input
							type='checkbox'
							id='income'
							value={true}
							onClick={(e) => {
								console.log(e.target.value);
								setTransactionForm((prev) => ({ ...prev, isIncome: true }));
								setTimeout(() => console.log(transactionForm), 1000);
							}}
						/>
						<label htmlFor='income'> Income</label>
						<input
							type='checkbox'
							id='expense'
							value={false}
							onClick={(e) => {
								console.log(e.target.value);
								setTransactionForm((prev) => ({ ...prev, isIncome: false }));
								setTimeout(() => console.log(transactionForm), 1000);
							}}
						/>
						<label htmlFor='expense'> Expense</label>
						<div>{transactionForm.isIncome ? "true" : "false"}</div>
					</div> */}

					{!isUploading && <button className='submit-button'>Add transaction</button>}
					{isUploading && (
						<button className='submit-button-loading' disabled>
							Adding transaction...
						</button>
					)}
				</form>
				<div className='form-close-button' onClick={() => setFormIsActive(false)} />
			</div>
		)
	);
};

export default AddForm;
