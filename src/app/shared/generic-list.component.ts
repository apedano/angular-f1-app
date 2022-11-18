import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { GenericService } from "./generic.service";
import { IdEntity } from "./id-entity.model";

@Component({
    template: ''
})
export abstract class GenericListComponent<T extends IdEntity> implements OnInit, OnDestroy {

    entities: T[] = [];
    loading: boolean = true;
    teamsSubscription!: Subscription;

    constructor(protected entityService: GenericService<T>) { }


    ngOnDestroy(): void {
        this.teamsSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.teamsSubscription = this.entityService.allValuesSubject.subscribe(entityArray => {
            this.entities = entityArray;
            this.loading = false;
            console.log(this.entities);
        });
    }
}