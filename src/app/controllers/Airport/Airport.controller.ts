import { Controller, Res, Get, Param, HttpStatus } from '@nestjs/common';
import * as request from 'request';
import * as cheerio from 'cheerio';
import * as moment from 'moment';

import { Airport, Summary, LatLng } from '../../interfaces/airport';

@Controller('Airport')
export class AirportController {
    constructor() { }

    @Get('/:id')
    getAirport( @Res() res, @Param('id') id: string) {

        const url = 'https://nfdc.faa.gov/nfdcApps/services/ajv5/airportDisplay.jsp?airportId=' + id;

        request(url, function (error, response, html) {
            if (error)
                return "Error";

            function toLatLng(text: string): LatLng {
                let west: boolean = text.includes("W");
                let south: boolean = text.includes("S");
                text = text.replace(/(\s\/\s)/g, ' ').replace(/(\s+[A-Z]\s*)/g, ' ').trim();
                let coordinates = text.split(" ");
                let lat: number = degreesMinutesSecondsToDecimalDegrees(coordinates[0]) * (south ? -1 : 1);
                let lng: number = degreesMinutesSecondsToDecimalDegrees(coordinates[1]) * (west ? -1 : 1);
                return new LatLng(lat, lng);
            }

            function degreesMinutesSecondsToDecimalDegrees(text: string): number {
                let split = text.split("-");
                return Number((parseInt(split[0]) + (parseInt(split[1]) / 60) + (parseInt(split[2]) / 3600)).toPrecision(10));
            }

            const $ = cheerio.load(html);
            let query;

            let airport: Airport = new Airport(id);

            query = $("#summary").find("td");
            airport.Summary = <Summary>{
                "Location": toLatLng($(query[1]).text().replace(/\s\s+/g, ' ').trim()),
                "Elevation": parseInt($(query[3]).text().replace(/\s\s+/g, ' ').trim()),
                "Variation": $(query[5]).text().replace(/\s\s+/g, ' ').trim(),
                "From City": $(query[7]).text().replace(/\s\s+/g, ' ').trim(),
                "ARTCC": $(query[9]).text().replace(/\s\s+/g, ' ').trim(),
                "Section Chart": $(query[11]).text().replace(/\s\s+/g, ' ').trim(),
                "Time Zone": $(query[13]).text().replace(/\s\s+/g, ' ').trim(),
            }

            query = $("#operations").find("td");
            // airport.Operations = <Operations>{
            // }

            res.json(airport);
        });
    }
}
