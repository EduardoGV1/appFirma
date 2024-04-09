import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class DocumentoService {
    constructor(
        private http:HttpClient
    ){}

    postFirmarDocumento(data:any){
        return this.http.post(`https://nestjs-pdf-production.up.railway.app/tasks`,data);
        // return this.http.post(`http://localhost:3000/tasks`,data);
    }

    getImageAsBase64(imagePath: string){
        return this.http.get(imagePath, { responseType: 'blob' })
    }
}