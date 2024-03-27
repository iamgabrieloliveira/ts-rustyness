export class NoneUnwraped extends Error {
	constructor(message = "Trying to unwrap a none optional") {
		super(message);
	}
}
