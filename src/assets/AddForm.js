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
	};
	// const [incomeChecked, setIncomeChecked] = useState(false);
	// const [expenseChecked, setExpenseChecked] = useState(false);

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
						max={`${DateTime.now().toISODate()}T23:59`} //'2021-11-15T23:59'
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
						step='0.01'
						value={transactionForm.amount}
						onChange={(e) =>
							setTransactionForm((prev) => ({ ...prev, amount: e.target.value }))
						}
					/>
					<label>Choose income or expense:</label>
					<div className='radio'>
						<div className='radio-income'>
							<input
								className='radio-i'
								type='radio'
								value={true}
								name='isIncome'
								disabled={isUploading && true}
								required
								// checked={incomeChecked}
								onChange={() =>
									setTransactionForm((prev) => ({ ...prev, isIncome: true }))
								}
							/>
							<label
								style={{ verticalAlign: "middle" }}
								// onClick={() => {
								// 	setExpenseChecked(false);
								// 	setIncomeChecked(true);
								// }}
							>
								Income
							</label>
						</div>

						<div className='radio-expense'>
							<input
								className='radio-e'
								type='radio'
								value={false}
								name='isIncome'
								disabled={isUploading && true}
								required
								// checked={expenseChecked}
								onChange={() =>
									setTransactionForm((prev) => ({ ...prev, isIncome: false }))
								}
							/>
							<label
								className='radio-e-label'
								style={{ verticalAlign: "middle" }}
								// onClick={() => {
								// 	setExpenseChecked(true);
								// 	setIncomeChecked(false);
								// }}
							>
								Expense
							</label>
						</div>
					</div>

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
