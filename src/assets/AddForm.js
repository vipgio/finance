import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TransactionContext } from "../contexts/TransactionContext";
import { DateTime } from "luxon";

const AddForm = () => {
	const { formIsActive, setFormIsActive, addTransaction } =
		useContext(TransactionContext);
	const emptyForm = { title: "", amount: "", isIncome: false, date: "" };
	const [transactionForm, setTransactionForm] = useState(emptyForm);
	const handleSubmit = (e) => {
		e.preventDefault();
		addTransaction(transactionForm);
		setTransactionForm(emptyForm);
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
						value={transactionForm.title}
						onChange={(e) =>
							setTransactionForm((prev) => ({ ...prev, title: e.target.value }))
						}
					/>

					<label>Enter transaction date:</label>
					<input
						type='datetime-local'
						required
						max={`${DateTime.now().toISODate()}T00:00`} //'2021-11-15T00:00' //????
						value={transactionForm.date}
						onChange={(e) =>
							setTransactionForm((prev) => ({ ...prev, date: e.target.value }))
						}
					/>

					<label>Enter transaction amount:</label>
					<input
						type='number'
						required
						min='1'
						value={transactionForm.amount}
						onChange={(e) =>
							setTransactionForm((prev) => ({ ...prev, amount: e.target.value }))
						}
					/>

					<label>Choose income or expanse:</label>
					<div
						className='radio'
						onChange={(e) =>
							setTransactionForm((prev) => ({ ...prev, isIncome: e.target.value }))
						}
					>
						<span>
							<input className='radio-i' type='radio' value={true} name='isIncome' />
							<label style={{ verticalAlign: "middle" }}>Income</label>

							<input className='radio-e' type='radio' value={false} name='isIncome' />
							<label style={{ verticalAlign: "middle" }}>Expanse</label>
						</span>
					</div>

					<button className='submit-button'>Add transaction</button>
					{/* {isUploading && <button disabled>Adding blog...</button>} */}
					{/* {!isUploading && <button>Add blog</button>}
					{isUploading && <button disabled>Adding blog...</button>} */}
				</form>
				<div className='form-close-button' onClick={() => setFormIsActive(false)} />
			</div>
		)
	);
};

export default AddForm;
