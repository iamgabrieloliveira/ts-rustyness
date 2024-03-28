> \[!IMPORTANT]
> Working In Progress, not ready yet

# TS Rustyness

TS Rustyness is a TypeScript library designed to enhance type safety in your projects, drawing inspiration from Rust's robust type system. It introduces two fundamental types, Option and Result, to handle nullable values and errors more effectively.

## Features

* **Option Type**: Represents a value that may or may not exist, providing a safer alternative to null or undefined.
* **Result Type**: Represents the outcome of an operation, encapsulating either a success value or an error, eliminating the need for exceptions.

## Installation

Install TS Rustyness via npm:

```bash
npm install ts-rustyness
```

## Usage

### Option Type

The Option type is used to handle nullable values.

```ts
import { some, none, type Option } from 'ts-rustyness/option';

// Creating an Option with a value
const someValue: Option<number> = some(42);

// Creating an Option without a value
const noValue: Option<string> = none;

// Unwrapping Option values safely
console.log(someValue.unwrap()); // Output: 42
console.log(noValue.unwrap());   // Output: Error: Attempted to unwrap None
```

### Result Type

The Result type is used to handle operation outcomes, either success or error.

```ts
import { ok, err, type Result } from 'ts-rustyness/result';

// Defining a function that returns a Result
const divide = (x: number, y: number): Result<number, string> => {
    if (y === 0) {
        return err("Division by zero is not allowed");
    }

    return ok(x / y);
}

// Handling Result values
console.log(divide(10, 2).unwrap()); // Output: 5
console.log(divide(10, 0).unwrapErr()); // Output: Division by zero is not allowed
```
