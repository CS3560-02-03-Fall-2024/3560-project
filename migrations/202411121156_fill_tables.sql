USE dispatch_system;

-- Inserting mock data into Caller table
INSERT INTO Caller (caller_ID, first_name, last_name, address, phone_number)
VALUES (1, 'Billy', 'Joe', '3801 W Temple Ave, Pomona, CA 91768', '1234567890');

-- Inserting mock data into DispatchPersonnel table 
INSERT INTO DispatchPersonnel (personnel_ID, first_name, last_name)
VALUES(1, 'Joe', 'Smith');

-- Inserting mock data into Incident table
INSERT INTO Incident (incident_ID, caller_ID, personnel_ID, address, priority, status, description, created_at)
VALUES (1, 1, 1, '123 Oak Blvd, Irvine', 'Medium', 'In Progress', 'Large fire...', '2024-11-13 14:30:00');

-- Inserting mock data into Assignment table
INSERT INTO Assignment (assignment_ID, incident_ID, unit_number, unit_type, backup_needed, status) 
VALUES (1, 1, 101, 'Police', FALSE, 'Completed');