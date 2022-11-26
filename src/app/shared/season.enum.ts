import { LabelAndValue } from "./label-and-value.model";

export class Season {
    public static SEASONS: Number[] = [2022, 2023];

    public static toLabelAndValue(season: Number): LabelAndValue {
        return new LabelAndValue('Season ' + season, season + '');
    }

    public static allToLabelAndValue(): LabelAndValue[] {
        return this.SEASONS.map(s => this.toLabelAndValue(s));
    }
}



