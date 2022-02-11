# Pokemon Demo
This is a demo for using Pokemon API to create a React frontend and Python Django backend.

## Prerequisites
- PostgreSQL needs to be install on local machine
- PostgreSQL database, username and password need to be configured
- Configure environment variables: 
  |  PostgreSQL Configuratoin |   Environment Variable Name |    Default   |  
  | ------------------------- | --------------------------- | ------------ |
  | NAME                      |  PG_DB_NAME                 |  demo        |
  | USER                      |  PG_USER                    |  demo        |   
  | PASSWORD                  |  PG_PASS                    |  demo        |   
  | HOST                      |  PG_HOST                    |  localhost   |         
  | PORT                      |  PG_PORT                    |  5432        |   

## Run backend service
```
cd backend
# Only run first time
python manage.py migrate
python manage.py runserver
```

## Run frontend service
```
cd frontend
npm start
```

## To run tests
```
cd backend
python3 manage.py test pk.tests
```
