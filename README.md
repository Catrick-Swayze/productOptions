
## Product options component

 Module to select quantity, color or size before adding an item to the registry.

#### Demo: (http://g.recordit.co/bhIaDImKTE.gif)

------

### Installation

#### Server:

Go into server folder

run  `npm install` to install dependencies

Make sure to have MySQL installed then run `MySQL` then run the following in a MySQL terminal:

`CREATE DATABASE options;USE options;`

run `npm run seed`

if getting any errors: 


`USE options;SET FOREIGN_KEY_CHECKS = 0;TRUNCATE TABLE Stocks;TRUNCATE TABLE Products;TRUNCATE TABLE Stores;`

run `npm run seed` again


#### Client:

Go into client folder

run  `npm install` to install dependencies
run `npm run build` to build the webpack

You should be all set!

------
### CRUD features

#### Create:
To utilize the create functionality, make a put request with a number (the id of the item you wish to create) attached to the end of the endpoint '/products' to store an item onto the database with randomly generated data (ex. '/products/999'). The reason that the item will have randomly generated data is because the module itself does not take any inputs. The client does not allow the user to add an item with the specifications of their likings. For the purposes of this exercise, therefore, I have resorted to Faker.js to complete the Create functionality. 

#### Read:
To utilize the read feature, make a get request with a number (the id of the item you wish to retrieve) at the end of the endpoint '/products/'. The server will return an item with the matching id if the item is already stored on the database.

#### Update:
To update the database, make a put request with a number (the id of the item you wish to update) at the end of the endpoint '/products/'. This feature utilizes the .upsert method, which finds an item with a given id and updates the item, or, if the item does not exist, perform an insert operation. Again, the properties of the updated item will be randomly generated, as the module itself does not take any user inputs. 

#### Delete:
To delete an item on the database, make a delete request with a given id attached to the end of the endpoint '/products/' (ex. '/products/999'). 
