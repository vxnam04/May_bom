import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { AsyncPipe, DatePipe, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthInterceptor } from './auth.interceptor';

registerLocaleData(vi);

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzEmptyModule,
    NzIconModule,
    NzButtonModule,
    NzLayoutModule,
  ],

  providers: [
    { provide: NZ_MODAL_DATA, useValue: {} },
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
    AsyncPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
