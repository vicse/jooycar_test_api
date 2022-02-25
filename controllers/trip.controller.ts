import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import axios, { AxiosResponse } from 'axios';

import { Trip, Location, Reading } from '../interfaces/trip.interface';
import TripModel from '../models/trip.model';
import { MapBoxApiResponse } from '../interfaces/mapbox.interface';
import { ReadingRequest } from '../interfaces/readingRequest.interface';

export const getTrips = ( req: Request, res: Response) => {

    res.json({
        msg: 'getTrips'
    })

}

export const postTrips = async( req: Request, res: Response) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(422).json({
            error: errors.array({ onlyFirstError: true })[0].msg,
        });
    }

    const { readings } = req.body;

    const trip = {
        start: await buildStartReading( readings ),
        end: await buildEndReading( readings ),
        distance: buildTotalTripDistance( readings ),
        duration: buildTotalTripDurationMinutes( readings ),
        overspeedsCount : buidOverSpeedsCount( readings ),
        boundingBox: builBoundingBox( readings )
    }

    const tripModel: Trip = new TripModel( trip );

    const { _id, start, end, 
        distance, duration, 
        overspeedsCount, boundingBox } = await tripModel.save()

    res.json({
        id: _id,
        start,
        end,
        distance,
        duration,
        overspeedsCount,
        boundingBox
    });

}

const getMinutes = ( millis: number ): number => {
    return Math.floor(millis / 60000)
}

const getHours = ( millis: number ): number => {
    const minutes = getMinutes(millis);
    return Math.floor(minutes / 60)
}

const buildTotalTripDurationMinutes = ( readings: ReadingRequest[] ): number => {
    const totalMillis = readings.reduce((acc, el) => acc + el.time, 0);
    return getMinutes(totalMillis);
}

const buildTotalTripDistance = ( readings: ReadingRequest[] ): number => {
    return readings.reduce((acc, el) => acc + (getHours(el.time)*(el.speed)), 0)
}

const buildReading = async( { time, location: { lat, lon } } : ReadingRequest ): Promise<Reading> => {

    const address = await getAddressByLocation(lat, lon);
    
    return { time, lat, lon, address } as Reading;
}

const buildStartReading = async( readings: ReadingRequest[] ): Promise<Reading> => {

    const startReadingRequest: ReadingRequest = readings
        .reduce(
            (acc, el) => 
            acc.time < el.time ? acc : el
        );

    return buildReading(startReadingRequest);
}

const buildEndReading = async( readings: ReadingRequest[] ): Promise<Reading> => {

    const endReadingRequest: ReadingRequest = readings
        .reduce(
            (acc, el) => 
            acc.time > el.time ? acc : el
        );
    
    return buildReading(endReadingRequest);

}

const builBoundingBox = ( readings: ReadingRequest[] ): Location[] => {

    return readings.reduce((acc, el) => [ ...acc , el.location ], [] as Location[]);

}

const getAddressByLocation = async(lat: number, lon: number): Promise<string> => {

    const mapBoxToken = process.env.MAPBOX_TOKEN;
    const mapBoxUri = process.env.MAPBOX_API_URI;

    try {
        const resAxios: AxiosResponse = await axios.get(`${mapBoxUri}${lon},${lat}.json?access_token=${mapBoxToken}`);
        const resMapBox: MapBoxApiResponse = resAxios.data;
        const address: string = resMapBox.features
            .reduce((acc, el) =>
            el.id.includes('address') ? el.place_name : acc, '');
    
        return address;
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al llamar API MapBox');
    }

}

const buidOverSpeedsCount = ( readings: ReadingRequest[] ): number => {
    const readingsReduce = readings
        .reduce((acc, el) => el.speed > el.speedLimit ? acc.concat(true) : acc.concat(false)
        , [] as boolean[]);

    let counter: number = 0;

    readingsReduce.forEach( (item, index) => {
        if (item && !readingsReduce[index + 1]) {
            return counter++;
        }
    });

    return counter;
}