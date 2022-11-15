import { NgModule } from "@angular/core";
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { ButtonModule } from 'primeng/button';


import { CountrySelectorComponent } from "./country-selector/country-selector.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileUploadModule } from 'primeng/fileupload';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { SliderModule } from "primeng/slider";
import { DataViewModule } from 'primeng/dataview';
import { AssetImageSelectorComponent } from './asset-image-selector/asset-image-selector.component';
import { CommonModule } from "@angular/common";
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { EntityToolbarComponent } from './entity-toolbar/entity-toolbar.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';




@NgModule({
    declarations: [CountrySelectorComponent, ImageSelectorComponent, YearSelectorComponent, AssetImageSelectorComponent, EntityToolbarComponent],
    imports: [
        FormsModule,
        ToolbarModule,
        CommonModule,
        SliderModule,
        CardModule,
        DataViewModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
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
    exports: [CountrySelectorComponent, ImageSelectorComponent, YearSelectorComponent, AssetImageSelectorComponent, EntityToolbarComponent]
})
export class SharedModule { }