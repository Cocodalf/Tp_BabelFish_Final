import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';import { Observable } from 'rxjs/Observable';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TranslateService{
    constructor(private http : HttpClient){};

    translate(post){
        return this.http.post("http://192.168.43.33:3000/api", post)  
            .map((res: HttpResponse<any>) => res)
            .catch((err:any) => Observable.throw(err.json().error));
      }
}
