import mongoose from 'mongoose';

export interface Trip extends mongoose.Document {
    start: Reading,
    end: Reading,
    distance: Number,
    duration: Number,
    overspeedsCount: Number,
    boundingBox: Location[]
}

export interface Reading extends Document {
    time: number,
    lat: number,
    lon: number,
    address: string,
}

export interface Location extends Document {
    lat: number;
    lon: number;
}