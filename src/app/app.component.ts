import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { MessageService } from 'primeng/api';
import { DocumentoService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoFirma';
  uploadedFiles: any[] = [];
  isPDF: boolean = false;
  isPDFFirmado: boolean = false;

  files: any;
  blob: Blob;
  blobFirmado: Blob;
  pdfOriginalBase64: string;
  pdfFirmadoBase64: string;
  imagenBase64: string;
  checked: boolean = false;

  firmaImage:Boolean=false;
  form:FormGroup;


  constructor(
    private messageService: MessageService,
    private documentoService: DocumentoService
  ) {
    console.log('start');
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    this.form = new FormGroup({
      file: new FormControl(),
      isRotate:new FormControl(false)
    })
  }


  // onClick() {
  //   const doc = new jsPDF()
  //   const image = new Image();
  //   image.src = "../assets/images/firmaGreissy.jpg";
  //   doc.save("doc-prueba-angular")
  // }

  onUpload(event: any) {
    console.log('');

    for (let file of event.files) {
      this.convertToBase64(file);
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  onSelectImage(event : any){
    console.log(event);
    const file: File = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      let base64String: string = reader.result as string;
      this.imagenBase64 = base64String.split(',')[1]
      // Aquí puedes usar la cadena base64 como deseado
      console.log('Base64 del archivo seleccionado:', base64String);
    };

    reader.readAsDataURL(file);
    
  }

  onSelect(event: any) {
    // console.log(event);
    // this.documentoService.getImageAsBase64('../assets/images/firma3.jpeg').subscribe(resp => {
      // console.log(resp);
      const reader = new FileReader();
      const file: File = event.files[0];
      reader.readAsDataURL(file);
      // reader.readAsDataURL(resp);
      reader.onload = () => {
        // Aquí puedes hacer lo que quieras con el archivo en base64
        const base64String = reader.result as string;
        const onlyBase64 = base64String.split(',')[1];
        console.log(base64String);
        
        this.imagenBase64 = onlyBase64;
        this.convertToBase64(event.currentFiles[0])
        
      };
      reader.onerror = (error) => {
        console.error('Error al convertir a base64:', error);
      };


    // })


  }

  verArchivo() {
    // console.log(this.files);
    // console.log(this.uploadedFiles);
    this.documentoService.postFirmarDocumento(
      { pdf: this.pdfOriginalBase64, image: this.imagenBase64,rotate:this.form.get('isRotate')?.value }
    ).subscribe((respFirma: any) => {
      console.log(respFirma)
      this.pdfFirmadoBase64 = respFirma.modifiedPdfBase64
      const byteCharacters = atob(this.pdfFirmadoBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      this.blobFirmado = new Blob([byteArray], { type: 'application/pdf' });
      this.isPDFFirmado = true;
    });

    // this.documentoService.postFirmarDocumento({}).subscribe((resp: any) => {
    //   // console.log(resp)
    //   const base64PDFFirmado = resp.modifiedPdfBase64
    // });
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Aquí puedes hacer lo que quieras con el archivo en base64
      const base64String = reader.result as string;
      const onlyBase64 = base64String.split(',')[1]
      // console.log('Archivo en base64:', base64String.split(',')[1]);
      this.pdfOriginalBase64 = base64String.split(',')[1];
      const byteCharacters = atob(base64String.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var pdfArray = new Uint8Array(byteCharacters.length);
      const byteArray = new Uint8Array(byteNumbers);
      this.blob = new Blob([byteArray], { type: 'application/pdf' });
      this.isPDF = true;
    };
    reader.onerror = (error) => {
      console.error('Error al convertir a base64:', error);
    };
  }

}
