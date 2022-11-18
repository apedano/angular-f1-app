import { Country } from "@angular-material-extensions/select-country";
import { IdEntity } from "../shared/id-entity.model";

export class Track implements IdEntity {

    constructor(public name?: string, public country?: Country, public length?: number, public firstYear?: number, public imageName?: string, public id?: string) { }
}