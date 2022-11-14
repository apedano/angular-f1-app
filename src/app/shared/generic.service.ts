import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, Observer, Subject, Subscription, throwError } from "rxjs";

export abstract class GenericService<T> {

    readonly FIREBASE_BASE_URL: string = 'https://angular-tutorial-rest-api-default-rtdb.europe-west1.firebasedatabase.app/';

    errorSubject: Subject<string> = new Subject();
    allValuesSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    protected abstract getApiPath(): string;

    protected getApiFullUrl(): string {
        return this.FIREBASE_BASE_URL + this.getApiPath() + '.json'
    }

    fetchAllSubscription: Subscription;
    private fetchAllObserver: Partial<Observer<T[]>> = {
        next: allValues => {
            this.allValuesSubject.next(allValues);
        },
        error: err => {
            const errorInstance = <HttpErrorResponse>err;
            console.log(errorInstance);
        }
    };


    constructor(private httpClient: HttpClient) {
        this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    }

    refreshVallValues() {
        this.fetchAllSubscription.unsubscribe();
        this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    }

    createAndStore(newObj: T) {
        this.httpClient.post<{ name: string }>(
            this.getApiFullUrl(), //the url
            newObj, //body, Angular will transform in json
            {
                observe: 'response' //default body 
            }

        ).subscribe({
            next: responseData => { //
                this.refreshVallValues()
                console.log(responseData);
            },
            error: err => {
                this.errorSubject.next(err.message);
            }
        });
    }

    fetchAll(): Observable<T[]> {
        console.log('Refreshing team cache');
        return this.httpClient.get<{ [key: string]: T }>(
            this.getApiFullUrl()).pipe(
                map((originalResponseData: { [key: string]: T }) => {
                    console.log('originalResponseData from fethAll call', originalResponseData);
                    const valuesArray: T[] = [];
                    for (const idKey in originalResponseData) {
                        valuesArray.push({
                            ...originalResponseData[idKey], //we map all the key,value couples of originalResponseData[key] in the new object
                            id: idKey //and we also add the id as the name we get from the firebase object
                        });
                    }
                    return valuesArray
                })
                ,
                catchError(errorRes => {
                    //error handling code goes here
                    //here we return the observable sending the error 
                    //to the subscribers
                    return throwError(() => errorRes);
                })
            );
    }

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