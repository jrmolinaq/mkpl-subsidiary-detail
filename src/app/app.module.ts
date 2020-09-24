import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardDescriptionComponent } from './card-description.component';
import { CardFieldComponent } from './card-field.component';
import { ProfileInfoComponent } from './profile-info.component';
import { ProductListComponent } from './product-list.component';
import { TableListComponent } from './table-list.component';
import { SearchComponent } from './search.component';
import { SubsidiaryCityListComponent } from './subsidiary-city-list.component';
import { PaginatorComponent } from './paginator.component';

import { ShortLargeStringsPipe } from './pipes/short-large-strings.pipe';
import { CurrencyPipe } from '@angular/common';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		CardDescriptionComponent,
		CardFieldComponent,
		PaginatorComponent,
		ProductListComponent,
		ProfileInfoComponent,
		SearchComponent,
		SubsidiaryCityListComponent,
		TableListComponent,
		ShortLargeStringsPipe
	],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [
		CurrencyPipe,
		ShortLargeStringsPipe
	],
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() {}
}
