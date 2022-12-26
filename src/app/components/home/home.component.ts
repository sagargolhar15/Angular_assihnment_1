import { Component,Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productData: any;
  proData:any={name:'',image:'',price:'',qty:''}
   upid:string='';
   searchText:any;
  constructor(private pser:ProductService) { }

  ngOnInit(): void {
    this.pser.getAllProduct()
      .subscribe((res: any) => {
        this.productData = res;
      })
  }
  delPro(id: any) {
    if (confirm("Do u want to delete?")) {
      this.pser.deleteData(id)
        .subscribe(res => {
          if (res) {
            alert("Data Deleted");
            let data = this.productData.filter((user: any) => user._id != id);
            this.productData = data;
          }
        })
    }
  }

  editPro(id:any){
    this.pser.getData(id)
    .subscribe(res=>{
      this.proData={name:res.name,image:res.image,price:res.price,qty:res.qty}
      this.upid=id;
    })
  }
}
