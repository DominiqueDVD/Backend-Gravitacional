## Available Scripts

In the project directory, you can run:

### `npx nodemon app`


### Test using docker image

Build docker image using dockefile

```bash
docker build -t Backend-Gravitacional:latest .
```

Run and test docker image

```bash
docker run --name backend-grav --env-file ./.env -p 3100:3100 backend-gravitacional:latest
```

For more info visit https://docs.docker.com/engine/reference/run/