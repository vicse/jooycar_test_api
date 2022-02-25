# Jooycar API TEST Challange 

## Operaciones

| Operation | Type | URI |
| --------- | ---- | --- |
| Obtiene la lista de viajes.| GET  | https://atew3wfjgb.execute-api.us-east-1.amazonaws.com/api/trips/v1 |
| Registra un viaje en Mongo ATLAS. | POST  | https://atew3wfjgb.execute-api.us-east-1.amazonaws.com/api/trips/v1 |


## Api's Consumidas

* MapBox - Maps APIs: https://docs.mapbox.com/

## Plugins Serverless usados
* [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): 
Le permite aprovechar los pseudoparámetros de CloudFormation.
* [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler basado en el complemento serverless-webpack: no requiere configuración y es totalmente compatible con las funciones de ES6 / ES7.

## Iniciando
Realizar el siguiente comando para instalar las dependencias

```
npm install
```