import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent {
  id: any;
  productData: any;
  pid:string=''
  proData:any={name:'',image:'',price:'',qty:'',desc:'',category:''}

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
  constructor(private route: ActivatedRoute, private pser: ProductService,private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pser.getData(this.id)
      .subscribe(res => {
        this.proData = { name: res.name, image: res.image, price: res.price,qty:res.qty,category:res.category,desc:res.desc }
        this.pid = this.id;
      })
  }

  updatedata(){
           this.pser.updateData(this.proData,this.pid)
       .subscribe(res=>{
         if(res){
             alert("Data Updated");
             this.proData={name:'',price:'',image:''}
             this.pid='';
             this.pser.getAllProduct()
                  .subscribe((res:any)=>{
                  this.productData=res;
             })
             this.router.navigateByUrl('/');
         }
       })
    }
}
