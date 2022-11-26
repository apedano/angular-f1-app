import { Component, OnDestroy, OnInit } from "@angular/core";
import { map, Observable, of, Subscription } from "rxjs";
import { GenericService } from "./generic.service";
import { IdEntity } from "./id-entity.model";

@Component({
    template: ''
})
export abstract class GenericListComponent<T extends IdEntity> implements OnInit, OnDestroy {

    entities: T[] = [];
    loading: boolean = true;
    entitiesSubscription!: Subscription;

    constructor(protected entityService: GenericService<T>) { }


    ngOnDestroy(): void {
        this.entitiesSubscription.unsubscribe();
        this.onDestroy();
    }

    protected onDestroy(): void {
    }

    ngOnInit(): void {
        this.entitiesSubscription = this.entityService.getAll()
            .pipe(
                map((entityArray: T[]) => {
                    this.entities = entityArray;
                }))
            .subscribe(() => {
                this.onEntitiesLoaded();
                this.loading = false;
            });
    }

    protected onEntitiesLoading(): any {
        return true;
    };

    protected onEntitiesLoaded(): void { };

}






