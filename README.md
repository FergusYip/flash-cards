# flash-cards

A flash card web application implemented using a MERN stack (MongoDB, Express, React, and Node.js). The backend server was written REST principles and is separated into multiple layers for better maintainability. Testing is done with the Mocha framework and Chai assertion library.

# API Documentation

## Items

## Endpoints

### auth

#### POST /auth/register

#### POST /auth/login

#### POST /auth/refresh

### user

#### GET /{userId}

#### DELETE /{userId}

#### PUT /{userId}/set_email

#### PUT /{userId}/set_name

### cards

#### GET /cards

#### POST /cards

#### GET /{cardId}

#### PUT /{cardId}/set_prompt

#### PUT /{cardId}/set_answer

### stacks

#### GET /stacks

#### POST /stacks

#### GET /{stackId}

#### DELETE /{stackId}

#### DELETE /{stackId}/unsafe

#### POST /{stackId}/add

#### POST /{stackId}/add_many

#### DELETE /{stackId}/remove

#### DELETE /{stackId}/remove_many
