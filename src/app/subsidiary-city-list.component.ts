import { Component, OnInit } from '@angular/core';
import { switchMap, pluck, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { SubsidiaryDetail } from './interfaces/subsidiaries.interface';
import { RegionList } from './interfaces/regions-list.interfaces';
import { RegionInterface } from './interfaces/locations.interface';
import { COLOMBIA } from './constants/location';
import { SubsidiaryService } from './services/subsidiary.service';
import { LocationsService } from './services/locations.service';

declare const Liferay: any;

@Component({
  selector: 'subsidiary-city-list',
  templateUrl:
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-detail/app/subsidiary-city-list.component.html'
})
export class SubsidiaryCityListComponent implements OnInit {

  regions: RegionList[];

  constructor(
    private subsidiaryService: SubsidiaryService,
    private locationsService: LocationsService
  ) { }

  ngOnInit() {

    this.subsidiaryService.getSubsidiary(this.getURLParameter("id")).subscribe(data1 => {
      const subsidiary = data1 as SubsidiaryDetail;

      this.locationsService.getRegions(COLOMBIA).pipe(
        pluck('data'),
        switchMap((regions: RegionInterface[]) => {
          return combineLatest(
            regions.map(region =>
              this.locationsService.getCities(region.id).pipe(
                pluck('data'),
                map(cities => ({
                  ...region,
                  cities
                }))
              )
            )
          );
        })
      ).subscribe(data2 => {
        const regions = data2 as RegionList[];

        this.regions = regions.map(region => {
          const regionFound = subsidiary.time_regions_delivery.find(times => times.region.id === region.id);
          return {
            ...region,
            collapsed: true,
            days: regionFound ? regionFound.days : 0,
            cities: region.cities.map(city => {
              const cityFound = subsidiary.time_cities_delivery.find(times => times.city.id === city.id);
              return {
                ...city,
                days: cityFound ? cityFound.days : 0
              }
            })
          };
        });
      });
    });
  }

  toggleRegionContainer(regionIndex: number) {
    this.regions[regionIndex].collapsed = !this.regions[regionIndex].collapsed;
  }

  ifPreviousNotCollapsed(i: number): boolean {
    return i ? !this.regions[i - 1].collapsed : false;
  }

  ifNotLastOrLastNotCollapsed(i: number): boolean {
    if (this.regions.length - 1 !== i) {
      return true;
    }
    return !this.regions[i].collapsed;
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
