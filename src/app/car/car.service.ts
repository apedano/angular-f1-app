import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GenericService } from "../shared/generic.service";
import { Car } from "./car.model";

@Injectable({ providedIn: 'root' })
export class CarService extends GenericService<Car> {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    protected getApiPath(): string {
        return 'cars';
    }
    protected mapToEntity(id: string, responseData: any): Car {
        return new Car(
            responseData.season,
            responseData.name,
            responseData.teamId,
            responseData.imageName,
            responseData.powerUnit,
            id
        );
    }

}