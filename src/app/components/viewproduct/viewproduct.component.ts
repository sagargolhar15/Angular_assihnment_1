import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent {
  id: any;
  pid: string = ''
  proData: any;
  constructor(private route: ActivatedRoute, private pser: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pser.getData(this.id)
      .subscribe(res => {
        this.proData = res;
      })
  }
  addCart(id: any) {
    if (localStorage.getItem('mycart') != undefined) {
      let cdata: any = localStorage.getItem('mycart');
      let arr = JSON.parse(cdata);
      if (arr.includes(id)) {
        alert("Product Already in a cart")
      }
      else {
        arr.push(id);
        localStorage.setItem('mycart', JSON.stringify(arr));
        alert("Add Cart Succuessfully")
        this.router.navigateByUrl('/');
      }
    }
    else {
      let arr = [];
      arr.push(id);
      localStorage.setItem('mycart', JSON.stringify(arr));
      alert("Add Cart Succuessfully")
      this.router.navigateByUrl('/');
    }
  }
}
