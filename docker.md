# Projectaanvraag-angular with Docker

## Prerequisite
- Install Docker Desktop
- appconfig: you'll have to clone [appconfig](https://github.com/cultuurnet/appconfig) in the same folder as where you will clone [projectaanvraag-angular](https://github.com/cultuurnet/projectaanvraag-angular)

## Configure

### Configuration setup
To get or update the configuration files, run the following command in the root of the project
```
$ make config
```

## Start

### Docker

Start the docker containers with the following command. Make sure to execute this inside the root of the project so the `.env` can be used.
```
$ make up
```

### Server

Start the website with the following command. Make sure that [projectaanvraag-silex](https://github.com/cultuurnet/projectaanvraag-silex)
is also running
```
$ make serve
```
