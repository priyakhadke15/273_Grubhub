const query = `CREATE TABLE Persons (
    id varchar(255) PRIMARY KEY NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    profileImage varchar(255),
    isSeller boolean DEFAULT false
);
CREATE TABLE Restaurants (
    restaurantId varchar(255) PRIMARY KEY NOT NULL,
    ownerId varchar(255) references Persons(id),
    image varchar(255),
    address varchar(255),
    cuisine varchar(255),
    zipcode int
);
CREATE TABLE Items (
	itemID varchar(255) PRIMARY KEY NOT NULL,
	restaurantId varchar(255) references Restaurants(restaurantId),
	itemName varchar(255) NOT NULL,
	iDesc varchar(255),
	price double NOT NULL,
	iImage varchar(255),
	secName varchar(255) NOT NULL
);`;

const createTables = connection => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            // release connection first!
            connection.release();

            if (error) {
                reject(error);
            } else {
                resolve({ results, fields });
            }
        });
    });
}

module.exports = { createTables };