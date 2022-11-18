import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GenericService } from "../shared/generic.service";
import { Track } from "./track.model";

@Injectable({ providedIn: 'root' })
export class TrackService extends GenericService<Track> {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    protected getApiPath(): string {
        return 'tracks';
    }

    protected mapToEntity(id: string, reponseData: any): Track {

        return new Track(reponseData.name,
            reponseData.country,
            reponseData.length,
            reponseData.firstYear,
            reponseData.imageName,
            id);

    }









}