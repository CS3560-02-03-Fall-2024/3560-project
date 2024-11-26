-- This database is designed to manage and store information for the dispatch system
CREATE DATABASE IF NOT EXISTS dispatch_system;
USE dispatch_system;

-- table designated to storing caller information
CREATE TABLE IF NOT EXISTS Caller (
    caller_ID INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address VARCHAR(250),
    phone_number VARCHAR(15) UNIQUE NOT NULL
);

-- table designated to storing dispatch personnel information
CREATE TABLE IF NOT EXISTS DispatchPersonnel (
    personnel_ID INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- table designated to storing incident information
CREATE TABLE IF NOT EXISTS Incident (
    incident_ID INT AUTO_INCREMENT PRIMARY KEY,
    caller_ID INT,
    personnel_ID INT,
    address VARCHAR(250),
    priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caller_ID) REFERENCES Caller(caller_ID), 
    FOREIGN KEY (personnel_ID) REFERENCES DispatchPersonnel(personnel_ID)
);

-- table designated to storing assignment information 
CREATE TABLE IF NOT EXISTS Assignment (
    assignment_ID INT AUTO_INCREMENT PRIMARY KEY,
    incident_ID INT UNIQUE NOT NULL, 
    unit_number INT NOT NULL, 
    unit_type ENUM ('Police', 'Fire', 'Medical') NOT NULL,
    backup_needed BOOLEAN DEFAULT FALSE,
    status ENUM('Pending', 'Dispatched', 'Completed') DEFAULT 'Pending',
    FOREIGN KEY (incident_ID) REFERENCES Incident(incident_ID)
);
