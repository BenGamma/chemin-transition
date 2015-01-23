# chemin-transition

# Getting Started
#### 1. Install node:
* http://nodejs.org/download/

#### 2. Install gulp globally:

```sh
$ npm install --global gulp
```

#### 3. Install bower globally

```sh
$ npm install --global bower

```

#### Where do I go now?

##### 1. clone the repository

```sh
$ git clone https://github.com/BenGamma/chemin-transition.git
```

##### 2. go to your root folder and run:

```sh
$ npm install
```

this command will install all the dependencies from package.json into node_modules folder 

##### 3. install bower dependencies

```sh
$ bower install
```

this command will install all the dependencies from bower.json into bower_components folder

##### 4. init gulp
Simply run gulp in your terminal to init the front app

##### Node Server

To lunch the server for the back-end run:
```sh
$ DEBUG=myapp ./bin/www
```

#### Front

All the front files is in app folder to run the server for the front enter this command:

```sh
$ gulp watch-dev
```