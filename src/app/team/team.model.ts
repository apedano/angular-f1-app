import { Country } from "@angular-material-extensions/select-country";

export class Team {

    public static empty(): Team {
        return new Team();
    }

    constructor(public name?: string, public foundation?: Date, public logo?: File | null, public nationality?: Country) {

    }
}