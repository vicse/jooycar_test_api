import { buidOverSpeedsCount, builBoundingBox, buildEndReading, buildStartReading, getAddressByLocation } from './trip.controller';

const buildReadingsMock = () => {
    return { 
        readings: [{
            time: 1642500462000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580158,
                lon: -70.567227
            }
        },
        {
            time: 1642500466000,
            speed: 9,
            speedLimit: 38,
            location: {
                lat: -33.58013,
                lon: -70.566995
            }
        }]
    }
    
}

describe('Unit Test Trip Controller', () => {

    test('builBoundingBox', () => {

        const result = builBoundingBox( buildReadingsMock().readings )

        expect(result).toEqual([
            {lat: -33.580158, lon: -70.567227}, 
            {lat: -33.58013, lon: -70.566995} ])

    });

    test('buildStartReading', () => {

        const result = buildStartReading( buildReadingsMock().readings )

        expect(result).toEqual({
            time: 1642500462000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580158,
                lon: -70.567227
            }
        })

    });

    test('buildEndReading', () => {

        const result = buildEndReading( buildReadingsMock().readings )

        expect(result).toEqual({
            time: 1642500466000,
            speed: 9,
            speedLimit: 38,
            location: {
                lat: -33.58013,
                lon: -70.566995
            }
        })

    });

    test('buidOverSpeedsCount', () => {

        const result = buidOverSpeedsCount( buildReadingsMock().readings )

        expect(result).toEqual(1);

    });


    test('getAddressByLocation', async() => {

        const address = await getAddressByLocation( -33.580078, -70.566408 );

        expect(address).toEqual('El Penon 1293, Puente Alto, Santiago Metropolitan 8150000, Chile');

    });

    

})