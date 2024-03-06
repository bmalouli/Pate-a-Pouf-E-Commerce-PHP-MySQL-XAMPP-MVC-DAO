# Welcome to the Pate-a-Pouf E-commerce website repository!
This project is a transactional web application designed to facilitate the sale of ready-to-eat meals, fresh pasta, sauces and cheeses. It is structured using the Model-View-Controller (MVC) and Data Access Object (DAO) architectural patterns to ensure a clear separation of concerns and scalability. The project features robust client-server communication with PHP, utilizing a database for data storage and comprehensive CRUD (Create, Read, Update, Delete) operations. Completed in November 2023, this platform offers a seamless online shopping experience, complete with a sophisticated admin panel for product and user management, ensuring an efficient and user-friendly interface for both customers and administrators.

## Prerequisites

Before running the application, you need to have XAMPP installed on your machine. XAMPP will provide the necessary services such as Apache for hosting the website and MySQL for database management.

## Installation

Follow these steps to get your application running:

1. **Download and Install XAMPP:**
   - Visit the [official XAMPP download page](https://www.apachefriends.org/download.html) and download the version for your operating system.
   - Follow the installation instructions provided on the page.

2. **Configure Ports:**
   - XAMPP defaults to port 80 for Apache. To change it to port 8080, open the XAMPP control panel, click on 'Apache' - 'Config' → 'httpd.conf'.
   - Search for "Listen 80" and replace it with "Listen 8080".
   - Additionally, search for "ServerName localhost:80" and replace it with "ServerName localhost:8080".

3. **Start Apache and MySQL Services:**
   - Open the XAMPP control panel and start the 'Apache' and 'MySQL' services.

4. **Import the Database:**
   - Navigate to the phpMyAdmin interface in your web browser by visiting 'localhost:8080/phpmyadmin'.
   - Create a new database named `bdboutique` and select the import tab.
   - Click on 'Choose File' and navigate to the `serveur/ressources/bd/bdboutique` directory in the cloned project folder.
   - Select the database file and click on the 'Go' button at the bottom of the page to import it.

5. **Place Project in XAMPP Directory:**
   - Clone the project repository to your local machine.
   - Copy the cloned project into the `htdocs` folder inside your XAMPP installation directory.
   - Ensure that the project folder is named appropriately to be accessed in the following step.

6. **Run the Project:**
   - Open a web browser and go to `localhost:8080/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO` to view the project.
   - You should now be able to interact with the Pate-a-Pouf application on your local machine.

## Project Screenshots

Here are some glimpses into the Pate-a-Pouf application:

### Database Overview
Here is what the database looks like through phpMyAdmin, showcasing the structure and stored data:
![image](https://github.com/bmalouli/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO/assets/116194037/b82b2fe4-8d55-4330-a08d-01479b9c9a20)
![image-1](https://github.com/bmalouli/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO/assets/116194037/66831729-7e35-4aa6-b193-a1e296e47859)
![image-2](https://github.com/bmalouli/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO/assets/116194037/8fe46330-cf01-4dcc-9023-81c83b681dcb)

### Member Registration
This is the member registration form that new users will use to sign up for Pate-a-Pouf:
![image-5](https://github.com/bmalouli/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO/assets/116194037/e9795884-15d7-48e6-aab0-18d2b2b2c1f2)

### Product Management by Admin
Administrators can manage products through this interface, with functionalities to add, edit, and delete items:
![image-3](https://github.com/bmalouli/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO/assets/116194037/8ae227c1-deaa-451b-8b38-e993ab9aa235)

### Member Management by Admin
This is the admin interface for managing member details and privileges:
![image-4](https://github.com/bmalouli/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO/assets/116194037/8b4864f3-ec13-4c5a-80e2-b2e3a6c2a368)

## Demonstration Video
https://github.com/bmalouli/Pate-a-Pouf-E-Commerce-PHP-MySQL-XAMPP-MVC-DAO/assets/116194037/e14c2d0c-d291-46e4-b909-de564e3ee84e


