import { useMachine } from "@xstate/react";
import bookingMachine from "../machines/bookingMachine";

const BaseLayaout = () => {
	// El hook usado para utilizar maquinas es useMachine del cual declaramos state: que muestra el estado actal de la maquina
	const [state, send] = useMachine(bookingMachine);
	console.log(state);
	return <div>Hola</div>;
};

export default BaseLayaout;
