# Groupify Backend Repository

This is the RESTful backend for Groupify, a platform for people to create and join activities nearby.

## Setup

First, you need a MongoDB database to connect to. How you set this up is up to you, and how to set it up is beyond the scope of this section. Once you have your MongoDB server up, open up `signup-login/config.js` and put the URL for your database inside.

In order to deploy the backend, you will need [Docker](https://www.docker.com/get-docker).
Once you have Docker downloaded, run the following commands:

```
git clone https://github.com/DonIsaac/GroupUP-Backend.git
cd GroupUP-Backend
docker build -t groupify-backend .
docker run -b 4000:4000 groupify-backend
```


## How to Use

Once you have spun up the Docker image, you can interface with the API by sending JSON to `localhost:4000/[api-method]` (or wherever your Docker container is deployed).

## Documentation

The following is a list of functionality this API allows. Please keep in mind this was written in 15 hours.

#### Overview
- /user/signup - Signs up a new user
- /user/login - Logs a user in
- /user/signout - Signs a user out
- /activity/add_attendee - Adds an attendee (user) to an activity
- /activity/create_activity - Creates a new activity
- /activity/find_activity - Finds all available activities within an area
- /administrator/system - Gets system information about what the backend is running on

#### Method Descriptions
**/user/signup**

Signs up a new user. After signing the user up, the server then logs the user in.
Logging in is handled using sessions. The user session will expire after 15 minutes, however this value can be configured to your liking.

The signup JSON request is structured as follows:

- **username**: String - The user's username
- **password**: String - The user's password in plaintext (will get hashed on the server)
- **age**: Number - The user's age (optional)
- **description**: String - A profile description (optional)

The signup JSON response is structured as follows:

- **success**: Boolean - True if the signup was successful, false otherwise
- **message**: String - The error message if and only if an error is thrown

The API

**/user/login**

**/user/signout**

**/activity/add_attendee**

**/activity/create_activity**

**/activity/find_activity**

**/administrator/system**
## System Info

This is the database layer of Groupify. The view layer is handled by iOS, and we have no need for an application layer.
