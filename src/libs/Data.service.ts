import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  Products = [
    {
      id: 1,
      name: 'Redmi Note 9s',
      price: 35000,
      vendor_id: 2,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Samsung S9',
      price: 50000,
      vendor_id: 1,
      category_id: 1,
    },
    {
      id: 3,
      name: 'Hp Elite',
      price: 80000,
      vendor_id: 2,
      category_id: 3,
    },
    {
      id: 4,
      name: 'Headphones',
      price: 3000,
      vendor_id: 3,
      category_id: 2,
    },
  ];

  Category = [
    {
      id: 1,
      name: 'MOBILE',
      status: 'active',
    },
    {
      id: 2,
      name: 'ACCESSORIES',
      status: 'active',
    },
    {
      id: 3,
      name: 'LAPTOP',
      status: 'active',
    },
    {
      id: 4,
      name: 'FURNITURE',
      status: 'active',
    },
  ];

  Vendor = [
    {
      id: 1,
      first_name: 'Subyyal',
      last_name: 'Siddiqui',
      contact_number: '03001234567',
    },
    {
      id: 2,
      first_name: 'Shahid',
      last_name: 'Anwar',
      contact_number: '03001234567',
    },
    {
      id: 3,
      first_name: 'Abdul',
      last_name: 'Hai',
      contact_number: '03001234567',
    },
    {
      id: 4,
      first_name: 'Jabir',
      last_name: 'Nawaz',
      contact_number: '03001234567',
    },
  ];
}
