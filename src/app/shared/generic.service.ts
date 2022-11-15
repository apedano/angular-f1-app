import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, Observer, skip, Subject, Subscription, take, throwError } from "rxjs";
import { IdEntity } from "./id-entity.model";

export abstract class GenericService<T extends IdEntity> {

    readonly FIREBASE_BASE_URL: string = 'https://angular-tutorial-rest-api-default-rtdb.europe-west1.firebasedatabase.app/';

    public errorSubject: Subject<string> = new Subject();
    public allValuesSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    isAllValueSubjectCalledAlready: boolean = false;

    constructor(private httpClient: HttpClient) {
        this.refreshVallValues();
    }

    protected abstract getApiPath(): string;

    protected getApiFullUrl(): string {
        return this.FIREBASE_BASE_URL + this.getApiPath()
    }

    fetchAllSubscription!: Subscription;
    private fetchAllObserver: Partial<Observer<T[]>> = {
        next: allValues => {
            this.allValuesSubject.next(allValues);
            this.isAllValueSubjectCalledAlready = true;
        },
        error: err => {
            const errorInstance = <HttpErrorResponse>err;
            console.log(errorInstance);
        }
    };


    protected refreshVallValues() {
        this.fetchAllSubscription?.unsubscribe();
        this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    }

    public createOrUpdate(obj: T): Observable<HttpResponse<{ name: string }>> {
        let response!: Observable<any>;
        if (obj.id) { //update
            let obj_deep_copy = JSON.parse(JSON.stringify(obj));
            obj_deep_copy.id = null;
            response = this.httpClient.patch(this.getApiFullUrl() + '/' + obj.id + '.json', obj_deep_copy);
        } else {
            response = this.httpClient.post<{ name: string; }>(
                this.getApiFullUrl() + '.json',
                obj, { observe: 'response' });
        }

        return response.pipe(map((responseData: HttpResponse<{ name: string; }>) => {
            this.refreshVallValues();
            return responseData;
        }),
            catchError(errorRes => {
                //error handling code goes here
                //here we return the observable sending the error 
                //to the subscribers
                return throwError(() => errorRes);
            }));
    }

    public getById(id: string): Observable<T> {
        let skipN = 0;
        if (!this.isAllValueSubjectCalledAlready) {
            //the subject will emit the intial empty value first
            this.isAllValueSubjectCalledAlready = true;
            skipN = 1;
        }
        return this.allValuesSubject.pipe(
            skip(skipN),
            map((values: T[]) => values.filter(v => v.id === id)[0]),
        )

    }

    private fetchAll(): Observable<T[]> {
        console.log('Refreshing team cache');
        return this.httpClient.get<{ [key: string]: T }>(
            this.getApiFullUrl() + '.json').pipe(
                map((originalResponseData: { [key: string]: any }) => {
                    // console.log('originalResponseData from fethAll call', originalResponseData);
                    const valuesArray: T[] = [];
                    for (const idKey in originalResponseData) {
                        // console.log('response data T', originalResponseData[idKey]);
                        valuesArray.push(this.mapToEntity(idKey, originalResponseData[idKey]))
                    }
                    return valuesArray
                }),
                catchError(errorRes => {
                    //error handling code goes here
                    //here we return the observable sending the error 
                    //to the subscribers
                    return throwError(() => errorRes);
                })
            );
    }

    public delete(entity: T): Observable<any> {
        return this.httpClient.delete(this.getApiFullUrl() + '/' + entity.id + '.json')
            .pipe(map(() => {
                this.refreshVallValues();
            }),
                catchError(errorRes => {
                    //error handling code goes here
                    //here we return the observable sending the error 
                    //to the subscribers
                    return throwError(() => errorRes);
                }));
    }

    protected abstract mapToEntity(id: string, reponseData: any): T;

    // deleteAll(): Observable<any> {
    //     return this.httpClient.delete(
    //         this.TEAMS_URL,
    //         {
    //             observe: 'events',
    //             responseType: 'json' //'text' - 'blob'
    //         }
    //     ).pipe(
    //         //tap is like pike in streams
    //         //it just executes the code
    //         //whitout altering the returned 
    //         //observable
    //         tap(event => {
    //             console.log(event);
    //             if (event.type === HttpEventType.Sent) {
    //                 console.log('The request has been sent')
    //             }
    //             if (event.type === HttpEventType.Response) {
    //                 console.log('The response has been received')
    //             }
    //         })
    //     );
    // }




}