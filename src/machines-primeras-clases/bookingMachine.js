import { createMachine } from "xstate";
// De esta manera se crean las maquinas de estado
const bookingMachine = createMachine({
	id: "buy plane tickets",
	initial: "initial",
	states: {
		initial: {
			on: {
				START: "search",
			},
		},
		search: {
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
});

export default bookingMachine;
