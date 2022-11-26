import { HttpClient, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GenericService } from "../shared/generic.service";
import { Team } from "./team.model";

@Injectable({ providedIn: 'root' })
export class TeamsService extends GenericService<Team> {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    protected mapToEntity(id: string, reponseData: any): Team {

        //public id?: string, public name?: string, public foundation?: Date, public logo?: string, public nationality?: Country
        return new Team(id,
            reponseData.name,
            new Date(reponseData.foundation),
            reponseData.logoName,
            reponseData.nationality
        );
    }

    protected getApiPath(): string {
        return 'teams';
    }

    public getBylogoName(logoName: string): Observable<Team> {
        return this.getByFilter((t: Team) => t.logoName == logoName).pipe(
            map((teamArray: Team[]) => teamArray[0])
        );
    }

    // readonly TEAMS_URL: string = 'https://angular-tutorial-rest-api-default-rtdb.europe-west1.firebasedatabase.app/teams.json';

    // errorSubject: Subject<string> = new Subject();
    // teamsSubject: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);


    // fetchAllSubscription: Subscription;
    // private fetchAllObserver: Partial<Observer<Team[]>> = {
    //     next: teamArrays => {
    //         this.teamsSubject.next(teamArrays);
    //     },
    //     error: err => {
    //         const errorInstance = <HttpErrorResponse>err;
    //         console.log(errorInstance);
    //     }
    // };


    // constructor(private httpClient: HttpClient) {
    //     this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    // }

    // refreshTeams() {
    //     this.fetchAllSubscription.unsubscribe();
    //     this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    // }

    // createAndStore(newTeam: Team) {
    //     this.httpClient.post<{ name: string }>(
    //         this.TEAMS_URL, //the url
    //         newTeam, //body, Angular will transform in json
    //         {
    //             observe: 'response' //default body 
    //         }

    //     ).subscribe({
    //         next: responseData => { //
    //             this.refreshTeams()
    //             console.log(responseData);
    //         },
    //         error: err => {
    //             this.errorSubject.next(err.message);
    //         }
    //     });
    // }

    // fetchAll(): Observable<Team[]> {
    //     console.log('Refreshing team cache');
    //     return this.httpClient.get<{ [key: string]: Team }>(
    //         this.TEAMS_URL).pipe(
    //             map((originalResponseData: { [key: string]: Team }) => {
    //                 console.log('originalResponseData from fethAll call', originalResponseData);
    //                 const teamArray: Team[] = [];
    //                 for (const idKey in originalResponseData) {
    //                     teamArray.push({
    //                         ...originalResponseData[idKey], //we map all the key,value couples of     in the new object
    //                         id: idKey //and we also add the id as the name we get from the firebase object
    //                     });
    //                 }
    //                 return teamArray
    //             }),
    //             catchError(errorRes => {
    //                 //error handling code goes here
    //                 //here we return the observable sending the error 
    //                 //to the subscribers
    //                 return throwError(() => errorRes);

    //             })
    //         );
    // }

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