# YEG Historical Photos  
[BetaCityYEG](http://betacity.ca/) has scraped (with permission) the
[City of Edmonton Archives Catalogue](https://archivesphotos.edmonton.ca/) and
has created an online tool to geolocate the site’s historical images.  

Similar to [OldNYC](https://www.oldnyc.org/), BetaCityYEG
hopes to bring its city and region’s history alive with a mobile-friendly
webmap. Once the interface is completed, we will crowdsource the manual
task of geolocating these images. An admin site has been created that
allows multiple users to gelocate an image which updates an online
database, inserting the latitude/longitude.  

## Instructions
If you wish to run this application locally, you will need to do the following:

1. Install [NodeJS](https://nodejs.org/en/download/stable/).

2. On the command line, type the following to install all client-side JavaScript package manager. Note: You might need to prefix the command with ```sudo``` as well if you have permission issues:  
```npm install -g jspm```  

3. On the command line, type the following to install all the necessary dependencies for the application:  
```npm install```  

#### Database Install  
You will need to setup a local database in order for the application to function properly. There are many different options you can use, but I used Postgres. The rest of the instructions are going to assume the use of Postgres.

If you are using Mac OS X, you can install [PostgresApp](http://postgresapp.com). It is a self-contained Postgres database. For other operating systems, please see go to the Postgres [website](http://www.postgresql.org/download/) for more information.  

1. Once Postgres is installed, you will need to create a database for the application to use. Connect to the database using the ```psql``` command and type the following to create a new database:  
```CREATE DATABASE yegphotos;```  

2. Now you will need to create a user in the database for the application to use. Enter the following command while still in ```psql```:  
```CREATE USER yegphotos_user WITH PASSWORD '<<INSERT PASSWORD HERE>>';```  

3. Now you will need to grant the user permission to the database. Type the following while still in ```psql```:  
```GRANT ALL PRIVILEGES ON DATABASE yegphotos TO yegphotos_user;```  

#### Update Configuration Files
You will now need to update the server/datasources.development.json file with the proper database information. Replace the following information in the configuration file:  

1. "database": "yegphotos"
2. "username": "yegphotos_user"
3. "password": "INSERT PASSWORD HERE"  

#### Running the Application
```node .```
