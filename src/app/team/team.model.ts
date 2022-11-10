import { Country } from "@angular-material-extensions/select-country";

export class Team {

    public static empty(): Team {
        return new Team();
    }

    constructor(public id?: string, public name?: string, public foundation?: Date, public logo?: string | null, public nationality?: Country) {

    }
}