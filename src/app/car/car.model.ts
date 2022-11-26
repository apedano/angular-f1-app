import { IdEntity } from "../shared/id-entity.model";
import { Season } from "../shared/season.enum";

export class Car implements IdEntity {
    constructor(public season: Number, public name: string, public teamId: string, public imageName: string, public powerUnit: string, public id?: string) { }
}