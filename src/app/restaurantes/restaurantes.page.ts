import { Component, OnInit } from '@angular/core';
import {ParseProviderService} from '../parse-provider.service';
import {restauranteInterface} from '../../interfaces/restauranteInterface';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.page.html',
  styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {

  itemsrestaurantes: restauranteInterface[]  = [];

  constructor(private parseProvider: ParseProviderService) {
    this.listRestaurante();
   }

   public listRestaurante(): Promise<any> {
    const offset = this.itemsrestaurantes.length;
    const limit = 10;
    return this.parseProvider.getItemsrestaurante(offset, limit).then((result) => {
        for (const restaurantes of result) {
          this.itemsrestaurantes.push(restaurantes);
        }
    }, (error) => {
        console.log(error);
    });
}


  ngOnInit() {
  }

}
