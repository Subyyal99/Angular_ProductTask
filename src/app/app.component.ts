import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/libs/Data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ProductTask';
  display: boolean = false;
  displaydlt = false;
  displayVendor = false;
  productForm!: FormGroup;
  firstname: any = '';
  lastname: any = '';
  id: any;
  price: any = '';
  Products :any; 

  constructor(public data: DataService) {
    this.Products = data.Products
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      product_name: new FormControl(),
      product_price: new FormControl(),
      product_category: new FormControl(),
      vendor_id: new FormControl(),
    });
    console.log(this.Products);
  }

  cancel() {
    console.log('jere');
    this.display = false;
  }

  DeleteId(id: number) {
    this.data.Products = this.data.Products.filter((p) => {
      return p.id != id;
    });
    this.Products = this.data.Products;
  }
  GetCategoryProducts(id: number) {
    this.Products = this.data.Products.filter((p) => {
      return p.category_id == id;
    });
    // console.log(this.Products);
    // console.log('service', this.data.Products);
  }
  DeleteProduct() {
    this.displaydlt = true;
  }
  deleteName() {
    var name = this.lastname.toUpperCase();
    console.log(name);
    var flag = false;
    this.data.Products.forEach(function (e, i) {
      if (e.name.toUpperCase() == name) {
        flag = true;
      }
    });
    if (flag) {
      this.data.Products = this.data.Products.filter((p) => {
        return p.name.toUpperCase() != name;
      });
      this.Products = this.data.Products;
      this.lastname = '';
      this.displaydlt = false;
      alert('Product Deleted');
    } else {
      alert('No matching Product found');
      this.lastname = '';
      this.displaydlt = false;
    }
  }

  filter() {
    this.Products = this.data.Products.filter((p) => {
      return p.price < this.price;
    });
    this.price = null;
  }
  SearchProductbyID() {
    this.Products = this.data.Products.filter((p) => {
      return p.id == this.id;
    });
    this.id = null;
  }
  GetVendorProducts() {
    this.displayVendor = true;
  }
  searchVendor() {
    this.firstname = this.firstname.toUpperCase();
    this.lastname = this.lastname.toUpperCase();
    var flag = false;

    this.data.Vendor.forEach((e, i) => {
      if (
        e.first_name.toUpperCase() == this.firstname ||
        e.last_name.toUpperCase() == this.lastname
      ) {
        flag = true;
        this.firstname = e.id;
      }
    });
    if (flag) {
      this.Products = this.data.Products.filter((p) => {
        return p.vendor_id == this.firstname;
      });
      this.firstname = '';
      this.lastname = '';
      this.displayVendor = false;
    } else {
      this.firstname = '';
      this.lastname = '';
      alert('No Vendor found');
      this.displayVendor = false;
    }
  }
  ProductAdd = () => {
    this.display = true;
  };
  SaveProduct() {
    let flag: boolean = false;
    var p_cat =
      this.productForm.controls['product_category'].value.toUpperCase();
    this.data.Category.forEach(function (c, i) {
      if (c.name == p_cat) {
        flag = true;
        p_cat = c.id;
      }
    });
    if (flag) {
      var obj = {
        id: Math.floor(Math.random() * 100),
        name: this.productForm.controls['product_name'].value,
        price: this.productForm.controls['product_price'].value,
        vendor_id: this.productForm.controls['vendor_id'].value,
        category_id: p_cat,
      };
      this.data.Products.push(obj);
      console.log(obj);
      alert('Product Added Successfully');
      this.display = false;
    } else {
      alert('No matching Category found');
    }
  }
  refresh() {
    this.Products = this.data.Products;
  }

  // function DisplayProducts(arr) {
  //   tbody = document.getElementById("product-data");
  //   var rows = "";

  //   arr.forEach(function (product, i) {
  //     rows += `<tr>
  //             <td>${product.id}</td>
  //             <td>${product.name}</td>
  //             <td>${product.price}</td>
  //             <td>${product.vendor_id}</td>
  //             <td>${product.category_id}</td>
  //             <td><button class="dlt" onclick="DeleteId(${product.id})">X</button></td>
  //           </tr>`;
  //   });
  //   tbody.innerHTML = rows;
  // }
  // DisplayProducts(Products);

  // var refresh = () => {
  //   DisplayProducts(Products);
  // };
  // function showproducts() {
  //   tbody2 = document.getElementById("category-data");
  //   tbody3 = document.getElementById("vendor-data");
  //   var rows2 = "";
  //   var rows3 = "";
  //   Category.forEach(function (c, i) {
  //     rows2 += `<tr>
  //         <td>${c.id}</td>
  //         <td>${c.name}</td>
  //         <td>${c.status}</td>
  //         <td><button class="view" onclick="GetCategoryProducts(${c.id})"><i class="bi bi-check2"></i>
  //         </button></td>

  //       </tr>`;
  //   });
  //   tbody2.innerHTML = rows2;
  //   Vendor.forEach(function (v, i) {
  //     rows3 += `<tr>
  //         <td>${v.id}</td>
  //         <td>${v.first_name}</td>
  //         <td>${v.last_name}</td>
  //         <td>${v.contact_number}</td>
  //       </tr>`;
  //   });
  //   tbody3.innerHTML = rows3;
  // }
  // showproducts();

  // var ProductAdd = () => {
  //   document.getElementById("product-add").style.display = "block";
  // };

  // var SaveProduct = () => {
  //   document.getElementById("product-add").style.display = "none";

  //   var p_name = document.getElementById("name").value;
  //   var p_price = document.getElementById("price").value;
  //   var p_cat = document.getElementById("cat").value;
  //   var p_vendor = document.getElementById("v_id").value;
  //   var flag = false;
  //   p_cat = p_cat.toUpperCase();
  //   Category.forEach(function (e, i) {
  //     if (e.name == p_cat) {
  //       flag = true;
  //       p_cat = e.id;
  //     }
  //   });

  //   if (flag == true) {
  //     var obj = {
  //       id: Math.floor(Math.random() * 100),
  //       name: p_name,
  //       price: parseInt(p_price),
  //       vendor_id: p_vendor,
  //       category_id: p_cat,
  //     };
  //     console.log(obj);
  //     Products.push(obj);
  //     alert("Product Added Successfully");
  //     DisplayProducts(Products);
  //   } else {
  //     alert("No matching Category found");
  //   }
  // };

  // var DeleteId = (id) => {
  //   Products = Products.filter(function (p) {
  //     return p.id != id;
  //   });
  //   DisplayProducts(Products);
  // };

  // var DeleteProduct = () => {
  //   document.getElementById("product-dlt").style.display = "block";
  // };

  // var deleteName = () => {
  //   document.getElementById("product-dlt").style.display = "none";
  //   var name = document.getElementById("delete_name").value;
  //   name = name.toUpperCase();
  //   var flag = false;
  //   Products.forEach(function (e, i) {
  //     if (e.name.toUpperCase() == name) {
  //       flag = true;
  //     }
  //   });
  //   if (flag == true) {
  //     Products = Products.filter(function (p) {
  //       return p.name.toUpperCase() != name;
  //     });
  //     DisplayProducts(Products);
  //   } else {
  //     alert("No matching Product found");
  //   }
  // };

  // var GetCategoryProducts = (id) => {
  //   var arr = Products.filter(function (p) {
  //     return p.category_id == id;
  //   });
  //   DisplayProducts(arr);
  // };

  // var GetVendorProducts = () => {
  //   document.getElementById("vendor-search").style.display = "block";
  // };

  // var searchVendor = () => {
  //   document.getElementById("vendor-search").style.display = "none";

  //   var first = document.getElementById("ven-search-first").value;
  //   var last = document.getElementById("ven-search-last").value;
  //   var flag = false;
  //   var first = first.toUpperCase();
  //   var last = last.toUpperCase();

  //   Vendor.forEach(function (e, i) {
  //     if (
  //       e.first_name.toUpperCase() == first ||
  //       e.last_name.toUpperCase() == last
  //     ) {
  //       flag = true;
  //       first = e.id;
  //     }
  //   });
  //   if (flag == true) {
  //     var arr = Products.filter(function (p) {
  //       return p.vendor_id == first;
  //     });
  //     DisplayProducts(arr);
  //   } else {
  //     alert("No Vendor found");
  //   }
  // };

  // var SearchProductbyID = () => {
  //   var id = document.getElementById("pro-search-id").value;
  //   var arr = Products.filter(function (p) {
  //     return p.id == id;
  //   });
  //   DisplayProducts(arr);
  // };

  // var filter = () => {
  //   var max = document.getElementById("product-filter").value;
  //   var arr = Products.filter(function (p) {
  //     console.log(p.price);
  //     return p.price < max;
  //   });
  //   DisplayProducts(arr);
  // };
}
