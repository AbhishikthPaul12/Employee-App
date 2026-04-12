# Employee Management System

## Overview

This is a simple web application that helps in managing employee records.
Users can add new employees, view existing records, update details, and remove employees when needed.

The application focuses on providing a clean and easy-to-use interface while performing all basic employee management operations.

## Features

* Add new employee details
* View list of all employees
* View individual employee information
* Edit/update employee details
* Delete employee records
* Instant updates after each operation

## Project Structure

### Frontend Components

* `Home.jsx` → Landing page of the application
* `Header.jsx` → Navigation bar for routing
* `CreateEmp.jsx` → Form to add a new employee
* `EditEmployee.jsx` → Form to update employee details
* `Employee.jsx` → Displays individual employee information
* `ListOfEmps.jsx` → Shows all employees in a list/card view
* `RootLayout.jsx` → Layout wrapper for all pages

---

##  Backend Routes

Base Route: `/employee-api`

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| POST   | `/employees`             | Create a new employee   |
| GET    | `/employees`             | Retrieve all employees  |
| PUT    | `/employees/:employeeId` | Update employee details |
| DELETE | `/employees/:employeeId` | Delete an employee      |