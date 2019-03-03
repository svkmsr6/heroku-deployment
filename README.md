# SVK Cabbie
## Welcome to SVK Cabbie
The application provides endpoints to view ratings of cab drivers and also update them

Following are the endpoints exposed by the application:

__GET__ 

['/api/drivers'](https://svk-cabbie-app.herokuapp.com/api/drivers) 

Fetches the list of all the drivers along with their respective rating infos

__GET__ 

['/api/drivers/:id'](https://svk-cabbie-app.herokuapp.com/api/drivers/2) 

Fetches the info of a specific drivers having a numeric id specified as its parameter

__PATCH__ '/api/drivers' 

__REQUEST BODY__ { id, rating}

Updates the rating of a specific driver having an id specified in its request body

[Documentation](https://svk-cabbie-app.herokuapp.com) is available
