CREATE TABLE Products(id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, price INTEGER NOT NULL);

CREATE TABLE Allergens(id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);

CREATE TABLE product_allergens (product_id INTEGER NOT NULL, allergen_id INTEGER NOT NULL,
PRIMARY KEY (product_id, allergen_id),
FOREIGN KEY (product_id) REFERENCES Products(id), FOREIGN KEY (allergen_id) REFERENCES Allergens(id));


INSERT INTO Products(name, price) VALUES ('espresso',250), ('americano', 300), ('latte', 350), ('cappuccino', 400), ('matchalatte', 450), ('cookie', 100), ('cake', 200), ('muffin', 150), ('sandwich', 250);

INSERT INTO Allergens(name) VALUES ('wheat'), ('egg'), ('milk'), ('shrimp');

INSERT INTO product_allergens (product_id, allergen_id) VALUES (3,3), (4,3), (8,2), (8,1);
