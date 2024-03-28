export class ErrUnwraped extends Error {
  constructor(message = 'Trying to unwrap a result with error') {
    super(message);
  }
}
