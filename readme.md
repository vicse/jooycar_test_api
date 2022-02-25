# Jooycar API TEST Challange 

## Operaciones

| Operation | Type | URI |
| --------- | ---- | --- |
| Obtiene la lista de viajes.| GET  | 
http://localhost:3000/api/trips/v1 |
| Registra un viaje en Mongo ATLAS. | POST  | 
http://localhost:3000/api/trips/v1 |


## Api's Consumidas

* MapBox - Maps APIs: https://docs.mapbox.com/

## Iniciando
Realizar el siguiente comando para instalar las dependencias

```
npm install
```

### Build Docker Image
 
```
docker build -t api-jooycar
```

### Run Docker Container

```
docker run --rm -p 3000:3000 --name api-jooycar api-jooycar:latest
```