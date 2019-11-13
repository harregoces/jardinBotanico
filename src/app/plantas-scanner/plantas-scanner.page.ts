import {Component, NgZone, OnInit} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-plantas-scanner',
    templateUrl: './plantas-scanner.page.html',
    styleUrls: ['./plantas-scanner.page.scss'],
})
export class PlantasScannerPage implements OnInit {

    public scanSubscription: any;

    constructor(private qrScanner: QRScanner, private route: Router, private ngZone: NgZone) {}

    ngOnInit() {
        this.scan();
    }

    scan() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.qrScanner.show();
                    this.showCamera();
                    this.scanSubscription = this.qrScanner.scan().subscribe((idParam: string) => {
                        const navigationE: NavigationExtras = {
                            queryParams: {
                                id: idParam
                            }
                        }
                        this.stopScanning();
                        this.ngZone.run(() => this.route.navigate(['plantas-view'], navigationE)).then();
                    });
                } else {
                    console.error('Permission Denied', status);
                }
            })
            .catch((e: any) => {
                console.error('Error', e);
            });
    }

    stopScanning() {
        this.scanSubscription.unsubscribe();
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
        this.qrScanner.hide();
        this.hideCamera();
        this.qrScanner.destroy();
    }

    ionViewWillEnter() {
        this.scan();
    }

    ionViewWillLeave() {
        this.stopScanning();
    }

    showCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
        window.document.body.style.backgroundColor = 'transparent';
    }

    hideCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
        window.document.body.style.backgroundColor = '#FFF';
    }

}
