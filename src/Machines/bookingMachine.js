import { createMachine } from "xstate";

const bookingMachine = createMachine(
	{
		id: "buy plane tickets",
		initial: "initial",
		states: {
			initial: {
				on: {
					START: {
						target: "search",
						// actions son las acciones de transicion
						actions: "imprimirInicio",
					},
				},
			},
			search: {
				// Entry acciones que se ejecutan al entrar a un estado
				entry: "imprimirEntrada",
				// exit acciones que se ejecutan al salir de un estado
				exit: "imprimirSalida",
				on: {
					CONTINUE: "passengers",
					CANCEL: "initial",
				},
			},
			tickets: {
				on: {
					FINISH: "initial",
				},
			},
			passengers: {
				on: {
					DONE: "tickets",
					CANCEL: "initial",
				},
			},
		},
	},
	{
		//Actions para las funciones que queremos que se ejecuten al estar en un estado
		actions: {
			imprimirInicio: () => console.log("Imprimir inicio"),
			imprimirEntrada: () => console.log("Imprimir entrada a search"),
			imprimirSalida: () => console.log("Imprimir salida del search"),
		},
	}
);

export default bookingMachine;
