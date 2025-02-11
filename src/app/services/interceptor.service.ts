import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor { 
    
    intercept(request: HttpRequest<any>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }
}