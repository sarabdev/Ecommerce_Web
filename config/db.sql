create database ecommerce_db;
use ecommerce_db;
CREATE TABLE ClientInfo (
    ClientId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Phone VARCHAR(255),
    Email VARCHAR(255) NOT NULL UNIQUE,
    Address1 VARCHAR(255),
    Address2 VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    PostalCode VARCHAR(255),
    Country VARCHAR(255) DEFAULT 'USA',
    Username VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash CHAR(60) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE Categories (
    CategoryId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL,
    CategoryDescription TEXT,
    IsActive BIT NOT NULL, -- SQL Server uses BIT instead of BOOLEAN
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ParentCategoryId BIGINT NULL, -- Adjusted to allow NULL values
    SortOrder INT,
    ImageUrl VARCHAR(255),
    MetaTitle VARCHAR(255),
    MetaDescription VARCHAR(255),
    MetaKeywords VARCHAR(255),
    FOREIGN KEY (ParentCategoryId) REFERENCES Categories(CategoryId) -- Optional, only if implementing subcategories
);

CREATE TABLE ProductItems (
    ProductId  BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    Image VARCHAR(255),
    Brand VARCHAR(255),
    Model VARCHAR(255),
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CategoryId BIGINT NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

CREATE TABLE Orders (
    OrderId BIGINT AUTO_INCREMENT PRIMARY KEY,
    ClientId BIGINT NOT NULL,
    OrderDate DATETIME NOT NULL,
    PaymentMethod VARCHAR(255) NOT NULL,
    FOREIGN KEY (ClientId) REFERENCES ClientInfo(ClientId)
);

CREATE TABLE OrderDetails (
    OrderDetailId BIGINT auto_increment PRIMARY KEY,
    OrderId BIGINT NOT NULL,
    ProductId BIGINT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES ProductItems(ProductId)
);


CREATE TABLE Reviews (
    ReviewId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ProductId BIGINT NOT NULL,
    ClientId BIGINT NOT NULL,
    Rating INT NOT NULL,
    Comment TEXT,
    TimeStamp_ DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductId) REFERENCES ProductItems(ProductId),
    FOREIGN KEY (ClientId) REFERENCES ClientInfo(ClientId)
);

CREATE TABLE VendorInfo (
    VendorId BIGINT auto_increment PRIMARY KEY,
    VendorName VARCHAR(255) NOT NULL,
    ContactName VARCHAR(255),
    Phone VARCHAR(255),
    Email VARCHAR(255),
    Address1 VARCHAR(255),
    Address2 VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    PostalCode VARCHAR(255),
    Country VARCHAR(255),
	PasswordHash CHAR(60) NOT NULL
);

CREATE TABLE ProductsFromVendors (
    ProductId BIGINT NOT NULL,
    VendorId BIGINT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    QuantityAvailable INT,
    PRIMARY KEY (ProductId, VendorId),
    FOREIGN KEY (ProductId) REFERENCES ProductItems(ProductId),
    FOREIGN KEY (VendorId) REFERENCES VendorInfo(VendorId)
);