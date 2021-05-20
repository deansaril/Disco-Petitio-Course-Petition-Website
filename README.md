# disco-petitio
![GitHub Logo](/public/images/Disco_Petitio.png)

For those people from De La salle University that weren't able to enroll to their selected courses for various reasons, this website will allow you to create and sign petitions for the administrators from DLSU to create an additional section for the specified course/s. 

## Contents
The following are the contents of the project:
- controllers - This folder contains files that define the callback functions for a client request.
- helpers - This folder contain a file that processes server validation.
- models - This folder contains the files of the database model.
- public - This folder contains static files such as css, js, and images.
- routes - This folder contains files that describe the response of the server given an HTTP method request to a path in the server.
- views - This folder contains all .hbs files that can be rendered to the server.
- env - This file contains the port, hostname, and the location where the database is located
- index.js - The start of the application.
- package - This contains all the files needed for the module such as the "dependencies". 
- package-lock - This file is to keep track of the exact version of every package that is installed in the module.


## Setting Up

### Locally
1. First, clone this repository by downloading [here](https://github.com/john-rey-edralin/disco-petitio/archive/refs/heads/main.zip), or if git is downloaded, run the following command in the command prompt:
```
git clone https://github.com/john-rey-edralin/disco-petitio
```

2. Once downloaded, in the command prompt, get to the path of the project folder then run the following command in order to load all modules used in this project:
```
npm install
```

3. Once all modules are loaded, run `one` of the following command:
```
node index.js
supervisor index.js
```

4. Once the server is running, click or type the link in any browser but recommendedly use `Google Chrome` for better experience: [http://localhost:3000](http://localhost:3000)

### Online
The heroku deployment of the website is available in [https://disco-petitio.herokuapp.com/](https://disco-petitio.herokuapp.com/)

## Logging in

### User Types
There are two types of users in this web application. The first is a normal user, that creates, edits, and signs a petitions also, can to comment in a petitions. The second is administrator which has all perks of a normal user but can handle the completed petitions and decide if it will accept or reject the petition. It is `impossible` to set someone an admin using the web application and must be set directly in the database so that to prevent manipulation of petitions.

### Admin Account
The following account/s are set as an admin account
```
username: admin
password: 12345678
```
## Used Dependencies
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [hbs](https://www.npmjs.com/package/hbs)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)

## Authors
- Dean Saril
- John Rey Edralin
