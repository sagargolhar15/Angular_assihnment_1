import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'editproduct/:id', component: EditproductComponent },
  { path: 'viewproduct/:id', component: ViewproductComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
