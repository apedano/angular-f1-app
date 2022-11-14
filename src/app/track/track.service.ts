import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TrackService {


    readonly TEAMS_URL: string = 'https://angular-tutorial-rest-api-default-rtdb.europe-west1.firebasedatabase.app/tracks.json';

    errorSubject: Subject<string> = new Subject();
    teamsSubject: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);


    fetchAllSubscription: Subscription;
    private fetchAllObserver: Partial<Observer<Team[]>> = {
        next: teamArrays => {
            this.teamsSubject.next(teamArrays);
        },
        error: err => {
            const errorInstance = <HttpErrorResponse>err;
            console.log(errorInstance);
        }
    };


    constructor(private httpClient: HttpClient) {
        this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    }

    refreshTeams() {
        this.fetchAllSubscription.unsubscribe();
        this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    }

    createAndStore(newTeam: Team) {
        this.httpClient.post<{ name: string }>(
            this.TEAMS_URL, //the url
            newTeam, //body, Angular will transform in json
            {
                observe: 'response' //default body 
            }

        ).subscribe({
            next: responseData => { //
                this.refreshTeams()
                console.log(responseData);
            },
            error: err => {
                this.errorSubject.next(err.message);
            }
        });
    }

    fetchAll(): Observable<Team[]> {
        console.log('Refreshing team cache');
        return this.httpClient.get<{ [key: string]: Team }>(
            this.TEAMS_URL).pipe(
                map((originalResponseData: { [key: string]: Team }) => {
                    console.log('originalResponseData from fethAll call', originalResponseData);
                    const teamArray: Team[] = [];
                    for (const teamFromResponse in originalResponseData) {
                        teamArray.push({
                            ...originalResponseData[teamFromResponse], //we map all the key,value couples of originalResponseData[key] in the new object
                            id: teamFromResponse //and we also add the id as the name we get from the firebase object
                        });
                    }
                    return teamArray
                }),
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