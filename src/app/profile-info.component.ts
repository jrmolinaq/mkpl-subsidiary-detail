import { Component, OnInit, Input } from '@angular/core';
import {
  ProviderGeneralData,
  //ProviderDetails,
  ProviderContactData
} from './interfaces/provider.interface';
import { GENERAL_PROFILE_FIELDS, CONTACT_PROFILE_FIELDS } from './constants/profile-info-constants';
import { ROLES } from './constants/auth';
import { SubsidiaryService } from './services/subsidiary.service';

declare const Liferay: any;

@Component({
  selector: 'profile-info',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-detail/app/profile-info.component.html'
})
export class ProfileInfoComponent implements OnInit {
  //providerDetails: ProviderDetails;
  generalFields: any;
  contactFields = CONTACT_PROFILE_FIELDS;
  objectKeys = Object.keys;
  generalData: ProviderGeneralData;
  contactData: ProviderContactData;
  canEdit = false;
  @Input() roleProfile: string;

  subsidiaryId: string;

  constructor(private subsidiaryService: SubsidiaryService) { }

  ngOnInit() {
    this.subsidiaryId = this.getURLParameter("id");

    this.subsidiaryService.getSubsidiary(this.subsidiaryId).subscribe(user =>{
      this.generalData = {
        /* TODO aquí se usa solo con llamado de sucursal
        name: this.roleProfile === ROLES.subsidiary ? user.alias : user.name, */
        name: user.alias,
        nit: '',//user.nit,
        country: user.location.city.region.country.name,
        city: user.location.city.name,
        address: user.location.address
      };

      this.contactData = {
        // TODO se usa aquí solo par asucursal name: this.roleProfile === ROLES.subsidiary ? user.name : user.contact_name,
        name: user.name,
        phone: user.phone,
        email: user.email,
        adminEmail: user.admin_user.email
      };
      
      // TODO traer permisos desde liferay
      // canEdit es true si (rol es provider && tiene permiso de updateProvider) || (tiene permiso de updateSubsidiary)
      this.canEdit = true;
      this.generalFields = GENERAL_PROFILE_FIELDS[this.roleProfile];
    });

  }

  lastItem(index: number, object: any) {
    return index === this.objectKeys(object).length - 1;
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
