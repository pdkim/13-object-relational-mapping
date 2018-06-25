##Travis:


##Heroku:


##Github: 
https://github.com/pdkim/13-object-relational-mapping


##Feature:
Create a HTTP server using express and mongo.  The data should be stored in the schema that that can can be accessed and modified using the CRUD operations.

###Intructions:
1. Go to the github link and clone the repository. You may want to fork prior to cloning the repository.
2. 'npm install' before running anything.
3. If you haven't already, install mongo.  Once installed or already installed, run mongod to get mongo up and running.
4. Create a .env file with the following content:
PORT=3000
MONGODB_URI="mongodb://localhost/lab-13"
5. In another terminal, 'nodemon index.js' to start server.
6. In postman, have a tab for POST, GET, and PUT at the following url: http://localhost:3000/api/v1/workers
7. Go to the GET tab and change path to something like http://localhost:3000/pokemon and and press GET.
    a. You should get a 404 error.
8. Go to POST tab and select Body > Raw. Copy the following information (you can change values on the right as you like): 
    {"firstName" : "Phil", "lastName" : "Kim", "hourlyWage" : "100" }
9. Press POST. You should now recieve a valid object.
10. Copy the id generated in the POST and switch to the GET tab.
11. Replace the 1111 in step 6 with the new id and press GET.
    a. You should now see the same object created in POST.
12. Go to the PUT tab and paste the id in the url. Be sure to include /before pasting the id.
13. In the Body > Raw, change the content to something like the following:
    {"firstName" : "JB", "lastName" : "Tellez", "hourlyWage" : "1000" }
14. Press PUT. You should now get an updated body for the same id.