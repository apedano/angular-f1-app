import { NgModule } from "@angular/core";
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { ButtonModule } from 'primeng/button';


import { CountrySelectorComponent } from "./country-selector/country-selector.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileUploadModule } from 'primeng/fileupload';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth-interceptor.service";


@NgModule({
    declarations: [CountrySelectorComponent, ImageSelectorComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectCountryModule.forRoot('en'),
        FileUploadModule,
        ButtonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService, //can be more
            multi: true //needed for HTTP_INTERCEPTORS classes, This required setting tells Angular that HTTP_INTERCEPTORS is a token for a multiprovider that injects an array of values, rather than a single value. 
        }
    ],
    exports: [CountrySelectorComponent, ImageSelectorComponent]
})
export class SharedModule { }