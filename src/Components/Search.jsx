import "./Search.css";
import { useState } from "react";

export const Search = ({ send, state }) => {
	const [flight, setFlight] = useState("");

	const goToPassengers = () => {
		send({ type: "CONTINUE", selectCountry: flight });
	};

	const handleSelectChange = (event) => {
		setFlight(event.target.value);
	};

	const options = [];

	state.context.countries.forEach((country) => {
		options.push(country.name.common);
	});

	return (
		<div className="Search">
			<p className="Search-title title">Busca tu destino</p>
			<select
				id="country"
				className="Search-select"
				value={flight}
				onChange={handleSelectChange}
			>
				<option value="" disabled defaultValue>
					Escoge un país
				</option>
				{options.sort().map((option) => (
					<option value={option} key={option}>
						{option}
					</option>
				))}
			</select>
			<button
				onClick={goToPassengers}
				disabled={flight === ""}
				className="Search-continue button"
			>
				Continuar
			</button>
		</div>
	);
};
