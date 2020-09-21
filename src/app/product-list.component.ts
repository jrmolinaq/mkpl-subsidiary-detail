import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ProductService } from './services/product.service';
import { ModalService } from './services/modal.service';
import { Product } from './interfaces/product.interface';
import { Paginator, DataPaginator } from './interfaces/paginator.interface';

import { TABLE_HEADERS } from './constants/product-list-constants';
import { Observable } from 'rxjs';

declare const Liferay: any;

@Component({
  selector: 'product-list',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-detail/app/product-list.component.html'
})
export class ProductListComponent implements OnInit {
  @Input() subsidiaryId: number;
  canUpdateInventory = false;
  canReadInventory = false;
  products: Product[];
  dataToPaginate: DataPaginator;
  inventoryDate: string;
  param: string;
  configTable = TABLE_HEADERS;
  modifiers = {
    price: {
      resolver: (value: any) => this.currencyPipe.transform(value, 'COP', '$ ', '.0-0')
    },
    reference: {
      style: 'bold'
    }
  };
  // TODO se quita paginador    @Input() paginator: Paginator;
  @Input() paginator: Product[];

  constructor(
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    // TODO se quita paginador  this.products = this.paginator.data as Product[];
    this.products = this.paginator;
    // TODO se quita this.dataToPaginate = this.paginator.dataPaginator;
    // TODO se quita this.inventoryDate = this.paginator.date;
    this.inventoryDate = '2020-07-31';

    // TODO: permisos de sesión
    this.canUpdateInventory = true;
    this.canReadInventory = true;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  currentPageChange(page: number) { // TODO cambiado  $event: any) {
    /* TODO se cambió, comprobar si funciona el paginador
    this.router
      .navigate([], {
        queryParams: {
          ...this.activeRoute.snapshot.parent.queryParams,
          page: $event
        }
      })
      .then(() => {
        this.getProductList();
      });*/

    // this.getProductList(page);
  }

  searchItem(param: string) { // TODO cambiado     $event: any) {
    /* TODO cambiado
    this.router.navigate([], { queryParams: { param: $event } }).then(() => {
      this.getProductList();
    });
    */
   
   this.getProductList(0, param);
  }

  getProductList(page = 0, param = '') {
    /* TODO cambiado    const {
      page = 0,
      param = ''
    } = this.activeRoute.snapshot.parent.queryParams;*/
    
    /* TODO service nuevo llamado
    this.productService.getProductList(this.subsidiaryId, page, param)
      .subscribe(({ data, dataPaginator, date }) => {
        this.products = data as Product[];
        this.dataToPaginate = dataPaginator;
        this.inventoryDate = date;
      });*/

    /* TODO Dummy   this.products = this.productService.getProductList2(this.subsidiaryId, 0, '');
    this.inventoryDate = '2020-07-31';*/

    this.productService.getProductList3(this.subsidiaryId, param).subscribe(data => {
      this.products = data as Product[];
      this.inventoryDate = '2020-07-31';
    });
  }
}
