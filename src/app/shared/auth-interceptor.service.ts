import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    /** 
     * Code which runs before the request leaves the application
     * @param {HttpRequest<any>} req - The intercepted request
     * @param {HttpHandler} next - It is a function that will forward the request to next step towards the outside api
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Inside auth interceptor...', req);
        if (req.url.includes('firebasedatabase.app')) {
            console.log('Inside auth interceptor for firebase calls...');
            const modifiedReq = req.clone(
                {
                    url: req.url,
                    headers: req.headers.append('Auth', 'xyz')
                }
            );
            return next.handle(req)
                .pipe(tap(event => {
                    // console.log(event);
                    if (event.type === HttpEventType.Response) {
                        console.log('Response arrived to the AuthInterceptor', event.body);
                    }
                }));
        }
        return next.handle(req);
    }
}