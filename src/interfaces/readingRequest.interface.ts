import { Location } from "./trip.interface";

export interface ReadingRequest {
    time: number,
    speed: number,
    speedLimit: number,
    location: Location
}

