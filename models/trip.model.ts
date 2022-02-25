import { Schema, model } from 'mongoose';
import { Trip } from '../interfaces/trip.interface';

const ReadingSchema = new Schema({
    time: Number,
    lat: Number,
    lon: Number,
    address: String,
}, { _id: false });

ReadingSchema.methods.toJSON = function() {
    const { _id, ...reading } = this.toObject();
    return reading;
}

const LocationSchema = new Schema({
    lat: Number,
    lon: Number
}, { _id: false });

LocationSchema.methods.toJSON = function() {
    const { _id, ...location } = this.toObject();
    return location;
}

const TripSchema = new Schema({

    start: {
        type: ReadingSchema
    },
    end: {
        type: ReadingSchema
    },
    distance: Number,
    duration: Number,
    overspeedsCount: Number,
    boundingBox: [
        LocationSchema
    ]

});

TripSchema.methods.toJSON = function() {
    const { __v, _id, ...trip } = this.toObject();
    return {
        id: _id,
        ...trip
    };
}

export default model<Trip>('Trip', TripSchema);