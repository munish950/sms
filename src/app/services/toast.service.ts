import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: "root"
})
export class ToastService {
    toastMessage = {
        severity: 'success',
        summary: '',
        detail: '',
        sticky: true,
    }
    constructor(private readonly messageService: MessageService){}

    displayMessage(message: string) {
        this.messageService.clear();
        this.toastMessage.detail = message;
        this.toastMessage.severity = 'success';
        this.toastMessage.sticky = false;
        this.messageService.add(this.toastMessage);
    }

    displayError(message: string) {
        this.messageService.clear();
        this.toastMessage.detail = message;
        this.toastMessage.severity = 'error';
        this.messageService.add(this.toastMessage);
    }
}
