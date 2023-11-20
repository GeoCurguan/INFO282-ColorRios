# Configuración necesaria y posibles errores

## Inicializar el proyecto

Se debe tener el backend de symfony en la ruta actual (al nivel de docker-compose)

```bash
docker-compose up -d --build
```

## Revisar dockers

```bash
docker exec -it <nombre del docker> bash
```

## Configurar Usuario en Dockerfile de php

## Entrar a mysql

Por mientras para setear el mysql se debe entrar al docker de mysql y ejecutar el script de la base de datos. Esto debería crear las tablas.

```bash
docker exec -it info282-colorrios-colors-mysql-1 bash
mysql -u root -p
1234
use chromosV2
(acá pegar el script de la base de datos)
```

## Si cambia en el docker-compose el nombre de "colors-mysql"

Se debe ajustar el nombre en el archivo .env de symfony. Para que pueda establecer conexión por medio del network de docker.

```bash
DATABASE_URL=mysql://root:1234@colors-mysql:3306/chromosV2
```

## ERROR internal load metadata

Se debe configurar el archivo config.json de .docker, puede aparecer como **"credsStore"** y debe cambiarse a **"credStore"**. [Referencia](https://stackoverflow.com/questions/66912085/why-is-docker-compose-failing-with-error-internal-load-metadata-suddenly)

```json
{
  "credStore": "desktop"
}
```

path: C:\Users\User\.docker\config.json
