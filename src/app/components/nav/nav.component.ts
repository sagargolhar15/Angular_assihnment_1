import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  count=0;
  productData: any;
  constructor(private pser:ProductService) { }

  ngOnInit(): void {
    if(localStorage.getItem('mycart')!=undefined){
      let cdata:any=localStorage.getItem('mycart');
      let data=JSON.parse(cdata);
      this.count=data.length;
    }
    this.pser.getAllProduct()
    .subscribe((res: any) => {
      this.productData = res;
    })
  }
}
