import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DownloadFileService } from 'app/core/services/download-file.service';

@Component({
    moduleId: module.id,
    selector: 'jus-pdf-viewer',
    templateUrl: './pdf-viewer.component.html'
})
export class PdfViewerComponent implements OnInit {
    @Input() public urlPdf: string;

    public safeUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer, private downloader: DownloadFileService) {}

    public ngOnInit() {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    public downloadPdf() {
        if (this.urlPdf) {
            let mimeType = 'application/pdf';
            this.downloader.descarrega(this.urlPdf, mimeType).subscribe((response) => {
                if (response != null) {
                    let fileBlob: Blob = response;
                    let blob = new Blob([fileBlob], { type: mimeType });

                    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
                }
            });
        }
    }
}
