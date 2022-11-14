import { Country } from "@angular-material-extensions/select-country";

export class Track {
    constructor(public name: string, public country: Country, public length: number, public firstYear: number, public smallImage: string, public largeImage: string, public id?: string) { }
}