export class NoneUnwrapped extends Error {
	constructor(message = "Trying to unwrap a none optional") {
		super(message);
	}
}
