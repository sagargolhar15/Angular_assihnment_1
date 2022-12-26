import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormControl,AbstractControl, FormGroup, Validators } from '@angular/forms';


function urlValidator(control:AbstractControl)
{
if(!control.value.startsWith('http')|| control.value < 18 )
{
  return {imageErr:true}
}
else{
  return null
}
}
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  productData: any;
  proData: any = { name: '', image: '', price: '', qty: '', category: '', desc: '' }
  upid: string = '';
  constructor(private pser: ProductService,private router: Router) { }

  myForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]+')]),
    price:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
    qty:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
    desc:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]{20,}')]),
    image:new FormControl('',[Validators.required,urlValidator]),
    category:new FormControl('',[Validators.required]),
})
get fdata(){
  return this.myForm.controls;
}
ngOnInit(): void {
}

  postdata() {
    console.log(this.myForm.getRawValue());
    
    this.pser.postData(this.proData)
      .subscribe(res => {
        this.proData = { name: '', image: '', price: '', qty: '', category: '', desc: '' }
        alert("Data added");
        this.router.navigateByUrl('/');
      })
  }
}