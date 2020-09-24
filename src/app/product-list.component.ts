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

  @Input() paginator: Paginator;

  constructor(
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.products = this.paginator.data as Product[];
    this.dataToPaginate = this.paginator.dataPaginator;
    this.inventoryDate = this.paginator.date;

    // TODO: permisos de sesión
    this.canUpdateInventory = false;
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

    this.getProductList(page);
  }

  searchItem(param: string) { // TODO cambiado     $event: any) {
    /* this.router.navigate([], { queryParams: { param: $event } }).then(() => {
      this.getProductList();
    }); */
       
    this.getProductList(0, param);
  }

  getProductList(page = 0, param = '') {
    /* const {
      page = 0,
      param = ''
    } = this.activeRoute.snapshot.parent.queryParams; */
    
    
    this.productService.getProductList(this.subsidiaryId, page, param)
      .subscribe(({ data, dataPaginator, date }) => {
        this.products = data as Product[];
        this.dataToPaginate = dataPaginator;
        this.inventoryDate = date;
      });
  }
}
