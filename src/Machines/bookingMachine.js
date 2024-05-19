import { assign, createMachine, fromPromise } from "xstate";
// From promise necesario para trabajar con promesas
import { fetchCountries } from "../utils/api";

// Jerarquia
// Esta es la maquina hijd
const fillCountries = {
	initial: "loading",
	states: {
		loading: {
			invoke: {
				id: "getCountries",
				// Llama a la funcion que devuelve una promesa
				src: fromPromise(() => fetchCountries()),
				onDone: {
					target: "success",
					actions: assign({
						countries: ({ event }) => event.output,
					}),
				},
				onError: {
					target: "failure",
					actions: assign({
						error: "Fallo el request",
					}),
				},
			},
		},
		success: {},
		failure: {
			on: {
				RETRY: { target: "loading" },
			},
		},
	},
};

const bookingMachine = createMachine(
	{
		id: "buy plane tickets",
		initial: "initial",
		context: {
			passengers: [],
			selectCountry: "",
			countries: [],
			error: "",
		},
		states: {
			initial: {
				entry: assign({
					selectCountry: ({ context }) => (
						(context.passengers = []), (context.selectCountry = "")
					),
				}),
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
					CONTINUE: {
						target: "passengers",
						actions: assign({
							selectCountry: ({ event }) => event.selectCountry,
						}),
					},
					CANCEL: "initial",
				},
				// Aqui se insertan las maquinas hijas
				...fillCountries,
			},
			tickets: {
				after: {
					5000: {
						target: "initial",
					},
				},
				on: {
					FINISH: "initial",
				},
			},
			passengers: {
				on: {
					DONE: "tickets",
					CANCEL: "initial",
					ADD: {
						target: "passengers",
						actions: assign({
							passengers: ({ context, event }) => {
								const updatedPassengers = context.passengers.concat(
									event.newPassenger
								);
								return updatedPassengers;
							},
						}),
					},
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
