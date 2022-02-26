import TripModel from '../trip.model';
import { dbConnection } from '../../database/config';
import { Reading, Location } from '../../interfaces/trip.interface';

beforeAll(async () => {
    await dbConnection();
})

const buildTripModelMock = () => {
    const start: Reading = { 
        time: 1642500462000,
        lat: -33.580158,
        lon: -70.567227,
        address: 'San Fermin 3186'
    };

    const end: Reading = {
        time: 1642500474000,
        lat: -33.580078,
        lon: -70.566408,
        address: 'El Penon 1293'
    }

    const locations: Location[] = [{ lat: -33.580158, lon: -70.567227 }]

    const trip = {
        start,
        end,
        distance: 106762500,
        duration: 136875038,
        overspeedsCount: 2,
        boundingBox: locations
    }

    return trip;
}

describe('saveTrip', () => {

    test('should create Trip', async() => {
    
        const tripModel = new TripModel( buildTripModelMock() );
        const tripDB = await tripModel.save()
    
        const fetched = await TripModel.findById(tripDB.id);
    
        expect(fetched).not.toBeNull();

    })

})

describe('findTrips', () => {

    test('should find Trip', async() => {
    
        const tripModel = new TripModel( buildTripModelMock() );
        await tripModel.save()
    
        const fetched = await TripModel.find();
    
        expect(fetched).toBeInstanceOf( Array );

    })

})