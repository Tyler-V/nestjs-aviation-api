export class Airport {
    ICAO: string;
    Summary: Summary;
    Operations: Operations;

    constructor(ICAO: string) {
        this.ICAO = ICAO;
    }
}

export interface Summary {
    "Location": LatLng;
    "Elevation": number;
    "Variation": string;
    "From City": string;
    "ARTCC": string;
    "Section Chart": string;
    "Time Zone": string
}

export interface Operations {
    "Airport Status": string;
    "Facility Use": string;
    "Control Tower": string;
    "Tower Hours": string;
    "Approach/Departure Hours": string;
    "FSS": string;
    "NOTAMs Facility": string;
    "Attendance": string;
    "Wind Indicator": string;
    "Segmented Circle": string;
    "Lights": string;
    "Beacon": string;
    "Landing Fee": string;
    "Fuel": string;
    "Fire and Rescue": string;
    "International Operations": string;
}

export class LatLng {
    Latitude: number;
    Longitude: number;

    constructor(Latitude, Longitude) {
        this.Latitude = Latitude;
        this.Longitude = Longitude;
    }
}