import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    
    selector: 'app-pr-file-upload',
    templateUrl: './fileinputs.component.html'
})
export class PrFileUploadComponent implements OnInit, AfterViewInit {
    
    public jusFileUploadElement: any = {
        chooseLabel: "Seleccionar arxiu",
        mode: "advanced",
        name: "jusFileUploadElementSample1",
        id: "jusFileUploadElementSample1",
        customUpload: true, 
        multiple: false,
        showUploadButton: true,
        showCancelButton: true,
        required: true,
        fileLimit: 1,
        maxFileSize: 1024 * 7,
        accept: 'image/png, image/jpeg, image/gif'
    };

    constructor() {}

    ngOnInit() {}

    ngAfterViewInit(): void {
        console.log('File upload component view initialized');
    }

    // Evento al seleccionar un archivo
    public onSelectJusFileUpload(event: any) {
        console.log(">> onSelectJusFileUpload <<", event);
    }

    // Subida personalizada
    public onUploadHandler(event: any) {
        console.log(">> onUploadHandler <<", event);
        if (event.files && event.files.length > 0) {
            const file = event.files[0];

            // Simulación de subida a un backend
            const formData = new FormData();
            formData.append('file', file);

            console.log("Archivo listo para enviar:", file);

            // Aquí iría la llamada a tu servicio HTTP
            // this.fileUploadService.uploadFile(formData).subscribe(response => {
            //     console.log("Archivo subido correctamente", response);
            // }, error => {
            //     console.error("Error al subir el archivo", error);
            // });
        }
    }

    // Manejo de errores
    public onErrorJusFileUpload(event: any) {
        console.error(">> Error al subir archivo <<", event);
    }

    public onKeyDown() { }
}
