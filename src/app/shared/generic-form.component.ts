import { IdEntity } from "./id-entity.model";
import { GenericService } from "./generic.service";
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observer } from "rxjs";


export abstract class GenericFormComponent<T extends IdEntity> {

    protected entity!: T;
    protected loading: boolean = true;
    protected entityForm!: FormGroup;

    private createAndStoreObserver: Partial<Observer<any>> = {
        next: () => {
            this.router.navigate(this.getRedirectUrlAfterSave());
        },
        error: err => {
            console.log(err);
        }
    }

    constructor(private genericService: GenericService<T>, private router: Router) { }

    initEntity(currentRoute: ActivatedRoute) {
        currentRoute.params
            .subscribe(
                (updatedParams: Params) => {
                    if (updatedParams['id']) {
                        let id = updatedParams['id'];
                        this.genericService.getById(id).subscribe(entity => {
                            this.entity = entity;
                            this.onEntityLoaded();
                        });
                    } else {
                        this.entity = this.emptyEntity();
                        this.onEntityLoaded();
                    }
                }
            );
    }

    private onEntityLoaded(): void {
        this.entityForm = this.initEntityForm();
        this.loading = false;
    }

    protected abstract emptyEntity(): T;

    protected abstract initEntityForm(): FormGroup;

    protected onSubmit() {
        this.mapFormToEntity();
        console.log('entityForm', this.entityForm);
        this.genericService.createOrUpdate(this.entity).subscribe(this.createAndStoreObserver);
    }

    protected abstract mapFormToEntity(): void;

    protected abstract getRedirectUrlAfterSave(): any[];


}