# Appointment Booking System

Example full-stack application to book appointments.

## Pre-requisites

You must have these installed:

- [Docker](https://www.docker.com)
  - Version used: 27.3.1, build ce12230
- [PNPM](https://pnpm.io/installation)
  - Version used: 9.13.0

## Docker setup

First, enter the database directory
`cd database`

Now run the following command:
`docker build -t appointment-booking-system-db . && docker run --name appointment-booking-system-db -p 5432:5432 -d appointment-booking-system-db`

## Backend instructions

First, navigate into the backend directory
`cd backend`

Install the dependencies
`pnpm install`

Then, start the server (development mode should do for now)
`pnpm dev`

You can now access the API under [http://localhost:3000/](http://localhost:3000/)

To test the API, run the following command
`pnpm test`

## Frontend instructions

First, navigate into the frontend directory
`cd frontend`

Install the dependencies
`pnpm install`

Then, start the server (development mode should do for now)
`pnpm dev`

You can now access the frontend under [http://localhost:3001](http://localhost:3001)

## Trade-offs

Having little time to do this task, the following must be taken into consideration:

### Technical Choices

- Express (backend) and React (frontend) were chosen for rapid development, not scalability.
- Hardcoded values like URLs should be moved to environment variables for better configurability.
- HTTPS is not implemented but should be used for production readiness.
- Authentication was not added but should be added (using JWT, for example).

### Testing

- Backend includes basic tests, but more coverage is needed for edge cases, such as database connection errors.
- Frontend testing (unit, E2E, snapshot...) is not implemented due to time constraints.
- Future iterations should include testing in CI/CD pipelines.
- Browser/Device support should be verified, as the application has currently been developed and tested only on Safari with a MacBook.

### Future Work

- Implement a state management solution (e.g., Redux, Jotai) for improved frontend scalability.
- Refactor code that could be repeated to improve readability and maintainability.
- Improve design and responsiveness with a more polished UI/UX approach.
- Accessibility and SEO improvements are needed.
- Gitignore updates: Secrets like the database password should not be included in the repository.
- Error messages should be displayed in the frontend (e.g., name is not filled and the user tries to submit the form).
- And surely much more, as there was no proper architectural decision being made before coding.
