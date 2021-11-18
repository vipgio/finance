import React, { useState } from "react";

export default function Radio() {
	const [gender, setGender] = useState("");

	const handleChange = (e) => {
		setGender(e.target.value);
	};

	return (
		<div>
			<input type='radio' value='male' onChange={handleChange} name='gender' />
			<label>Male</label>

			<input type='radio' value='female' onChange={handleChange} name='gender' />
			<label for='female'>Female</label>

			<p>
				You gender is {`-->`} {gender}
			</p>
		</div>
	);
}
