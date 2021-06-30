import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { of } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pymesbackend.azurewebsites.net/api/proveedores';
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }
  post(proveedor: Proveedor) {
    return this.httpClient.post(this.resourceUrl, proveedor);
  }
}
