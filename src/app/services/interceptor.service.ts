import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { MessageService } from 'primeng/api';

import { ApiResponse, isAPiResponse } from "../data/apiResponse";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
            if(event instanceof HttpResponse && isAPiResponse(event.body)) {
                const apiResponse = event.body as ApiResponse;
                if(!apiResponse.success) {
                    // Display error messsage
                    const toastMessage = {
                        severity: 'error',
                        summary: 'Error Occcur',
                        detail: apiResponse.apiMessage,
                        sticky: true,
                      }
                      this.messageService.add(toastMessage);
                }
                return event.clone({body: apiResponse.data});
            }

            return event;
        }));
    }

    constructor(
        private readonly messageService: MessageService,
      ){}
}