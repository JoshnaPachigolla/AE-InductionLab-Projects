import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://raw.githubusercontent.com/JoshnaPachigolla/UseCase1/main/aggregated_res.json';
  getData(){
    return this.http.get(this.apiUrl).toPromise().then((data)=>{
      return data;
    })
    }

  constructor(private http:HttpClient) { }
}
