import { useMachine } from "@xstate/react";
import bookingMachine from "../machines/bookingMachine";

const BaseLayaout = () => {
	// El hook usado para utilizar maquinas es useMachine del cual declaramos state: que muestra el estado actal de la maquina
	const [state, send] = useMachine(bookingMachine);
	console.log(state);
	// Matches nos indica cual es el estado actual
	console.log("matches true", state.matches("initial"));
	console.log("matches false", state.matches("tickets"));
	// Can nos verifica si podemos ir al estado que se le pase como argumento
	console.log("can", state.can("FINISH"));

	return <div>Hola</div>;
};

export default BaseLayaout;
