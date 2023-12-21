import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { product } from '../Interface/product';
import { CartService } from '../Service/cart.service';
import { NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  selectedCode: number | undefined;
  product: product[] = [];
  pro: product | product[] = [];
  productt: any;
  item: any;
  selectedOption: string = '';

  constructor(private productService: ProductService, private router: Router, private _router: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this._router.paramMap.pipe(
      map(params => this.selectedCode = Number(params.get('id'))),
      switchMap(id => this.productService.getProductById(id).pipe(
        switchMap(pro => this.productService.getData().pipe(
          //   map(products => ({ product, relatedBlogs: product.filter(p => p.id !== id).slice(0, 3) }))
        ))
        // ))
      )))

      .subscribe(data => {
        this.pro = data;
        console.log(this.pro);
        this.productt = this.pro[(this.selectedCode as number - 1)];
        console.log(this.productt);
      })
    console.log(this.selectedCode);


  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.cartService.setSelectedOption(option);
  }
  
  addToCart(item: product) {
    // Gọi phương thức addToCart của CartService để thêm sản phẩm vào giỏ hàng
    if (this.selectOption){
      const NavigationExtras: NavigationExtras = {
        queryParams: {
          option: this.selectOption
        }
      };
      this.router.navigate(['/product-cart'], NavigationExtras);
      
    }else {

    }
    
    try{
      this.cartService.addToCart(item);
      // this.router.navigate(['/product-cart'], { queryParams: { quantity: this.quantity } });
      
    }catch(err){
      console.log(ErrorEvent)
    }
  }
}



 // addProductToCart(item: any) {
  //   // thêm sản phẩm vào giỏ hàng
  //   this.cartService.addItemToCart(item);
  // }