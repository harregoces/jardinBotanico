import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ParseProviderService} from '../parse-provider.service';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    ILatLng,
    BaseArrayClass,
    MarkerOptions,
    LatLng,
    HtmlInfoWindow
} from '@ionic-native/google-maps';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    // @ts-ignore
    @ViewChild('map') element: ElementRef;
    map: GoogleMap;

    POINTS: BaseArrayClass<any> = new BaseArrayClass<any>();

    constructor(private platform: Platform, private parseProvider: ParseProviderService) {
        this.listMarcadores();
    }

    public listMarcadores(): Promise<any> {
        return this.parseProvider.getItemsMarcadores().then((result) => {
            for (const item of result) {
                const marker = {
                    position: {lat: item.get('latitud'), lng: item.get('longitud')},
                    iconData: item.get('marcador'),
                    my_title: item.get('titulo'),
                    content: item.get('contenido'),
                    photo: item.get('foto')
                };
                console.log('Marker: ', marker);
                this.POINTS.push(marker);
            }

            this.POINTS.forEach((data: any) => {
                data.disableAutoPan = true;
                const markerOptions: MarkerOptions = data;
                this.map.addMarker(markerOptions)
                // tslint:disable-next-line:no-shadowed-variable
                    .then((marker: Marker) => {
                        marker.setIcon(data.iconData);
                        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
                        marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick);
                    });
            });

        }, (error) => {
            console.log(error);
        });
    }

    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
    }

    ionViewDidEnter() {
        this.platform.ready().then(() => {
            this.loadMap();
        });
    }

    loadMap() {
        const bounds: ILatLng[] = this.POINTS.map((data: any, idx: number) => {
            return data.position;
        });

        this.map = GoogleMaps.create(this.element.nativeElement);

        this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
            // tslint:disable-next-line:no-shadowed-variable
            const bounds: ILatLng[] = this.POINTS.map((data: any, idx: number) => {
                return data.position;
            });
            const position = {
                target: bounds
            };
            this.map.animateCamera(position);
        });
    }

    onMarkerClick(params: any) {
        const marker: Marker = params[1] as Marker;
        const content: any = marker.get('content');
        const title: any = marker.get('my_title');
        const photo: any = marker.get('photo');
        const htmlInfoWindow = new HtmlInfoWindow();
        const frame: HTMLElement = document.createElement('div');
        frame.innerHTML = `
        <div class="flip-container" id="flip-container">
          <div class="flipper">
            <div class="front">
            <h3>` + title + `</h3>
            <img src="` + photo + `" style="width: 160px; height: auto">
          </div>
          <div class="back">
            ` + content + `
            </div>
          </div>
        </div>`;

        frame.addEventListener('click', (evt) => {
            const container = document.getElementById('flip-container');
            if (container.className.indexOf(' hover') > -1) {
                container.className = container.className.replace(' hover', '');
            } else {
                container.className += ' hover';
            }
        });
        htmlInfoWindow.setContent(frame, {
            width: '250px'
        });

        if (title) {
            htmlInfoWindow.open(marker);
        }
    }

}
