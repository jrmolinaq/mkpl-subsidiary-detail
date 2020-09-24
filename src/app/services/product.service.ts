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

  let params;

    if(param === '') {
      params = new HttpParams()
        .set('page', page.toString())
        .set('limit', '10');
    }else {
      params = new HttpParams()
        .set('reference', param)
        .set('name', param)
        .set('page', page.toString())
        .set('limit', '10');
    }

    return this.http
      .get<ListResponse>(
        `http://localhost:8080/o/ProviderCompraDigitalPortlet/api/product/subsidiary/${subsidiaryId}`,
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
}
