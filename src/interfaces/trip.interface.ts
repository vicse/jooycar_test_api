import { Document } from 'mongoose';

export interface Trip extends Document {
    start: Reading,
    end: Reading,
    distance: Number,
    duration: Number,
    overspeedsCount: Number,
    boundingBox: Location[]
}

export interface Reading {
    time: number,
    lat: number,
    lon: number,
    address: string,
}

export interface Location {
    lat: number;
    lon: number;
}