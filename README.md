# Simple Contact Application (In Progress)

## Project Status

**Note:** This project is currently in development. Some features might be incomplete or subject to change.

## Description

Simple Contact is a web application designed to manage contacts efficiently. Users can add, edit, delete, and view contact information, including name, email, mobile number, country, address, and gender. This project demonstrates full-stack development capabilities using ReactJS, Express, MongoDB, and Node.js.

## Features

- Create Contact: Add new contact details to the database.
- Read Contacts: View a list of all saved contacts.
- Update Contact: Edit details of existing contacts.
- Delete Contact: Remove contact information from the database.

## Technical Stack

- Front-end: ReactJS
- Back-end: Node.js, Express
- Database: MongoDB
- Others: axios for API requests, cors for cross-origin resource sharing, mongoose for object data modeling (ODM), dotenv for environment variable management.

(Currently working on implementing additional features and improving the UI/UX.)

## Testing

The application's reliability is ensured through comprehensive testing with React Testing Library and Vitest. External API dependencies like axios are mocked to maintain test robustness. Tests cover:

- Component rendering and user-triggered updates.
- Form handling, including validation and submission.
- Server interactions for creating, reading, updating, deleting data, and handling errors.
- UI response to network conditions.

## Test Coverage

With the current suite of tests, we have achieved significant coverage metrics which contribute to the stability and maintainability of the application:

| File           | % Statements | % Branch | % Functions | % Lines | Uncovered Line #s |
| -------------- | ------------ | -------- | ----------- | ------- | ----------------- |
| All files      | 100          | 98.14    | 100         | 100     |                   |
| src            | 100          | 98.07    | 100         | 100     |                   |
| App.tsx        | 100          | 98.07    | 100         | 100     | 81                |
| src/components | 100          | 100      | 100         | 100     |                   |
| FormTable.tsx  | 100          | 100      | 100         | 100     |                   |

## Live Demo

Made with :heart: by Valid

- Try out the application here: [Simple Contact](https://simple-contact.vercel.app/)

Before running this project, make sure you have the following installed:

- Node.js
- MongoDB
- Yarn (optional, npm can be used as well)

## Installation

To get started with this project, follow these steps:

1. Clone the repository
2. Install the dependencies for the frontend:

```bash
yarn install
```

3. Install the dependencies for the backend:

```bash
yarn install
```

4. Create a `.env` file in the backend directory and add your MongoDB connection string:

```bash
MONGO=[Your MongoDB connection string]
```

5. Start the backend server:

```bash
yarn dev
```

6. Start the frontend application:

```bash
yarn dev
```

## Running Test

To run the automated test suite and generate a coverage report, use the following command in your terminal:

```bash
yarn test
```
