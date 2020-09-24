import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonGeneralData, CommonContactData } from './interfaces/user.interface';
import { Paginator } from './interfaces/paginator.interface';
import { GENERAL_FIELDS, CONTACT_FIELDS } from './constants/common-data';
import { ProductService } from './services/product.service';
import { SubsidiaryService } from './services/subsidiary.service';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-subsidiary-detail/app/app.component.html'
})
export class AppComponent implements OnInit {

	$paginator: Observable<Paginator>;
	$subsidiaryDescription: any;
	canUpdateInventory = false;
	subsidiaryId: number | string;
	generalFields = GENERAL_FIELDS;
	contactFields = CONTACT_FIELDS;
	totalOrders = 0;
  
	generalData: CommonGeneralData;
	contactData: CommonContactData;
  
	constructor(
	  private productService: ProductService,
	  private subsidiaryService: SubsidiaryService
	) { }
  
	ngOnInit() {
	  	// TODO traer permisos desde liferay, si tiene permiso de updateInventory
		this.canUpdateInventory = true;

		this.subsidiaryId = this.getURLParameter("id");
  
		this.subsidiaryService.getSubsidiary(this.subsidiaryId)
			.subscribe( data =>
				this.totalOrders = data.totalOrders
		);
  
	  this.$paginator = this.productService.getProductList(this.subsidiaryId);
	}

	// this.getURLParameter("id")
	private getURLParameter(paramName: string){
	  var pageURL = window.location.search.substring(1);
	  var variables = pageURL.split('&');
	  for (var i = 0; i < variables.length; i++) {
	    var param = variables[i].split('=');
	    if (param[0] == paramName) {
	      return param[1];
	    }
	  }
	}​
}
