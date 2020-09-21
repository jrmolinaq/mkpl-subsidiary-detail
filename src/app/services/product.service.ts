import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paginator, ListResponse } from '../interfaces/paginator.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductList(
    subsidiaryId: number | string,
    page = 0,
    param = ''
  ): Observable<Paginator> {
    const params = new HttpParams()
      .set('param', param)
      .set('page', page.toString());
    return this.http
      .get<ListResponse>(
        `http://localhost:8080/o/ProviderCompraDigitalPortlet/api/product/subsidiary/${subsidiaryId}`,
        //`https://liferaydev.subocol.com/o/ProviderCompraDigitalPortlet/api/product/subsidiary/${subsidiaryId}`,
        {
          params
        }
      )
      .pipe(
        map(({ content, ...dataPaginator }) => {
          const data = content as Product[];
          return {
            data,
            dataPaginator,
            date: data.length ? data[0].registerDate : ''
          };
        })
      );
  }

  /* TODO borrar Dummy
  getProductList2(providerId: number | string, page = 0, param = ''): Product[] {
    let p1: Product = {reference: 'ABCDE123', name: 'Producto 1', stock: 10, quality: 'GENUINE', price: 100000, 
    applicability: '', irs: '', validation: '', provider: '', notification: true, registerId: '', registerDate: '', externalSubsidiaryId: '', externalDataSendId: ''};
    let p2: Product = {reference: 'ABCDE456', name: 'Producto 2', stock: 20, quality: 'GENUINE', price: 200000, 
    applicability: '', irs: '', validation: '', provider: '', notification: true, registerId: '', registerDate: '', externalSubsidiaryId: '', externalDataSendId: ''};
    let p3: Product = {reference: 'ABCDE789', name: 'Producto 3', stock: 30, quality: 'GENUINE', price: 300000, 
    applicability: '', irs: '', validation: '', provider: '', notification: true, registerId: '', registerDate: '', externalSubsidiaryId: '', externalDataSendId: ''};

    return  Math.random() >= 0.5? [p1, p2, p3]: [];
  }*/

  getProductList3( subsidiaryId: number | string, param = '' ): Observable<any> {
    if(param == ''){
      return this.http.get<any>(
        `http://localhost:8080/o/ProviderCompraDigitalPortlet/api/product/subsidiary/${subsidiaryId}`, {} );
        //`https://liferaydev.subocol.com/o/ProviderCompraDigitalPortlet/api/product/subsidiary/${subsidiaryId}`, {} );
    } else {
      return this.http.get<any>(
        `http://localhost:8080/o/ProviderCompraDigitalPortlet/api/product/subsidiary/${subsidiaryId}?reference=${param}&name=${param}`, {} );
        //`https://liferaydev.subocol.com/o/ProviderCompraDigitalPortlet/api/product/subsidiary/${subsidiaryId}?reference=${param}&name=${param}`, {} );
    }
  }
}
