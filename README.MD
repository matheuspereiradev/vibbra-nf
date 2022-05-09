#  Vibbra NF

System with the purpose of helping entrepreneurs formalized as Individual Microentrepreneurs (MEI) who seek an automatic way to organize their Revenues (generation of Invoices) to avoid surprises with tax payments at the end of the year
![home](https://raw.githubusercontent.com/matheuspereiradev/images/main/Captura%20de%20tela%202022-05-08%20005454.png)

![balance](https://raw.githubusercontent.com/matheuspereiradev/images/main/Captura%20de%20tela%202022-05-08%20005519.png)

![create](https://raw.githubusercontent.com/matheuspereiradev/images/main/Captura%20de%20tela%202022-05-08%20005814.png)


![create](https://raw.githubusercontent.com/matheuspereiradev/images/main/Captura%20de%20tela%202022-05-08%20005846.png)

##  🚧 Functionalities

- [x] Post invoice
- [x] Post expenses
- [x] Register partner companies
- [x] Register expense categories
- [x] configure the maximum MEI billing limit
- [x] graphs with expenses by category
- [x] graphs with the generated NF value, month by month
- [x] graphs with the amount of expenses month by month
- [x] charts with simple swing
- [x] indicative of how much billing is still available for the issuance of Invoices
- [x] send alerts after exceeding *x%* of annual billing threshold
- [x] send alerts via email
- [ ] send alerts via SMS
- [ ] archive expense categories

##  📦 Tech

this application was developped using
* `node (typescript)`
* `react`


##  💻 What do you need to run this project?

Before start you need have in your PC:

* Have the `node =>14.19.0`
* Have the `mysql =>8.0.0` (if you no want use mysql read the section use other databases)
* Have the `yarn =>1.22.17 (recommended)` or `npm =>6.14.16`

##  🚀 Run the Vibbra NF

first clone the project 
```
git clone https://git.vibbra.com.br/antonio-matheus/vibbranf.git
```
next step install the dependences
```
cd backend
yarn install
```

```
cd frontend
yarn install
```

create an database
(on mysql use)
```
create database <dbname>
```

now configure the .env file for backend

create an file called `.env` on backend root folder with the structure
```
JWT_SECRET = <your_secret_here>
JWT_EXPIRES_IN = 3h
DB_HOST = <your_mysql_host_here> #localhost is the default value
DB_PORT = <your_mysql_port_here> #3306 is the default value
DB_USER = <your_mysql_user_here> #root is the default value
DB_PASSWORD = <your_mysql_password_here>
DB_DATABASE = <your_mysql_database_here>
MIGRATION_DIR = ./src/shared/infra/typeorm/migrations/**.ts
MIGRATION_CLI_DIR = ./src/shared/infra/typeorm/migrations
MIGRATION_ENTITIES_DIR = ./src/modules/**/models/entities/**.ts
PORT = <here_the_port_you_need_use>
```

now configure the .env file for frontend

create an file called `.env` on backend root folder with the structure
```
REACT_APP_API_URL = <here_set_the_backend_baseurl> #example http://localhost:3008/
```

run migrations
```
yarn typeorm migration:run
```

> 💡 Developemnt tip: for this project is important know about [typeorm CLI](https://orkhan.gitbook.io/typeorm/docs/using-cli#create-a-new-migration) commom commands are `yarn typeorm migration:run`, `yarn typeorm migration:create -n <migration name>`, `yarn typeorm migration:revert`, `yarn typeorm migration:show`, `yarn typeorm query "<query here>"`

now you only need run the script
on backend
```
npm run dev
or
yarn dev
```
on frontend
```
npm run start
or
yarn start
```
here some useful links:
* how install MySql  on [windows](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/mysql-installer.html), [linux](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/linux-installation.html) or [macOS](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/macos-installation.html).
*  how [download node](https://nodejs.org/en/download/).
*  need use more one version of node? [use nvm](https://github.com/nvm-sh/nvm).
* install the [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).

##  💾 Using other databases

With typeorm you can you `mysql,mariadb, posgres, sqlite, mssql, mongodb` and others that you can see on [typeorm documentation](https://typeorm.io/).

for use other databases you need 

1. Install on backend the dependency
2. go to file `backend/ormconfig.js`
3. edit the file to database that you want to use [(here the link for typeorm documentation)](https://typeorm.io/data-source-options)

##  📫 Backend folder structure

BACKEND
```
├── node_modules
├── src 
│ ├── @types                  # Here are the custom types used by typescript
│ ├── modules                 # In this folder are all modules of system
|    └── <module name>  
|         └── controllers     # here are all the Controllers called by the routes and responsible for calling the service
|         └── interfaces      # in this folder are defined interfaces of types used by the module
|         └── routes          # in this folder are the files used by controll the module routes
|         └── models         
|              └── entities   # Here are the methods that make all interactions and operations with the database
|              └── repository # here are the entities abstraction of database tables
|         └── services        # in this folder are the services
|         └── views           # in this folder are the views where is defined the JSON format that are sended for responses
│ └── shared                  # Here are functionaties shared by all modules
|    └── container            # where are all dependency injection configuration
|    └── errors               # where is the class used by custom errors
|    └── helpers              # where are util functions used by all system
|    └── providers            # here are shared providers
|    └── http                 # here are the http configurations
|         └── routes          # here is configured the general routes for modules
|    └── infra                # here is infra functionalities
|         └── typeorm         # here are the typeorm configurations
|              └── migrations # here are the database migrations configurations
└── temp
```
> 💡 Developemnt tip <b>(IMPORTANT)</b> : on `src/module/<module_name>/interfaces` there is an especial interface, the REPOSITORY INTERFACE where are the signature for all methods implemented by model repository

> 💡 Developemnt tip: for protect routes use the middleware *ensureAuthenticate* 

##  🤝 Steps to create a new module

1. Create and run the migration `yarn typeorm migration:create -n <name>`  `yarn typeorm migration:run`
2. Create the module entity
3. Create the repository interface and the create and update interface DTO
>default methods 
> ```
> findAll():  Promise<Array<EntityName>>;
> findByID(id:  number):  Promise<EntityName>;
> create(data:  ICreateInvoiceDTO):  Promise<EntityName>;
> update(data:  IUpdateDTO):  Promise<EntityName>;
> delete(id:  number):  Promise<void>;
>```
4. Implement the model repository methods
5. Create the Container injection dependency on file `src/shared/container/index.ts`
> `container.registerSingleton<InterfaceRepository>('< injection alias>', ModelRepository); `
> read the [tsrynge doc](https://www.npmjs.com/package/tsyringe#register)
6. Create the services (create, update, delete and others that you need)
7. Create the controllers using the services
8. Create the routes using controllers and call it in general route file `src/shared/infra/http/routes/index.routes.ts`
9. Create the view and use on controller responses


##  🤝 Contribute


To contribute to this project send suggestions or bug reports send an email to `matheuslima20111997@gmail.com` or follow these steps:

1. Fork this repository.

2. Create a branch: `git checkout -b <branch_name>`.

3. Make your changes and commit them: `git commit -m '<message_commit>'`

4. Push to the original branch: `git push origin <project_name> / <local>`

5. Create the pull request.

see here on GitHub docs [how create an pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

##  😀 Developed by

<img src="https://lh3.googleusercontent.com/a-/AOh14Gg3LIqc06DlAVuol37E3wm8TTfUQjlUVDamDYT7=s83-c-mo" width="100px;" alt="Foto Matheus Lima"/><br>


<b>Matheus Lima</b>
<p>Software developer</p>

<p>
  <a href="mailto:matheuslima20111997@gmail.com" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/mail-dot-ru.svg" alt="matheus" height="30" width="40" /></a>
  <a href="https://github.com/matheuspereiradev" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg" alt="matheus" height="30" width="40" /></a>
  <a href="https://instagram.com/amatheuslp" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg" alt="matheus" height="30" width="40" /></a>
  <a href="https://wa.me/5588992424740" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/whatsapp.svg" alt="matheus" height="30" width="40" /></a>
  <a href="https://www.linkedin.com/in/matheuspereiradev/" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="matheus" height="30" width="40" /></a>
</p>
