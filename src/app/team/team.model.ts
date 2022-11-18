import { Country } from "@angular-material-extensions/select-country";
import { IdEntity } from "../shared/id-entity.model";

export class Team implements IdEntity {

    public static empty(): Team {
        return new Team();
    }

    constructor(public id?: string, public name?: string, public foundation?: Date, public logoName?: string, public nationality?: Country) {

    }
    empty(): IdEntity {
        return new Team();
    }
}