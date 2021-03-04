import React, { Component } from 'react'
import { GoogleMapAPI } from '../../constant'


class MapsComponent extends Component {


    callGoogleMapsJS = (callback) => {
        if (!document.getElementById('mapScript')) {
            const script = document.createElement("script");
            script.id = 'mapScript';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPI}&callback=window.initMap`;
            script.type = 'text/javascript';
            script.defer = true;
            script.async = true;
            document.body.appendChild(script);
        }
    }

    makerMaps = (map, infowindow) => {
        // [{
        //     LocationName: "A",
        //     MapLatitude: 12.788327,
        //     MapLongitude: 100.934132

        // },
        // {
        //     LocationName: "B",
        //     MapLatitude: 12.7611189,
        //     MapLongitude: 101.1738252
        // }        ]
        // .map((item, index) => {
        this.props.data.map((item, index) => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.MapLatitude, item.MapLongitude),
                map: map
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(item.LocationName);
                    infowindow.open(map, marker);
                }
            })(marker, index));
        });
    }


    initMap = () => {
        const { data = [] } = this.props;
        if (data.length > 0) {
            let map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: data[0].MapLatitude, lng: data[0].MapLongitude },
                zoom: 12
            });
            // console.log(data)
            this.makerMaps(map, new google.maps.InfoWindow({}));
        }
    }

    componentDidMount() {
        window.initMap = this.initMap;
        this.callGoogleMapsJS();
    }

    render() {
        const { data = [], title } = this.props;
        return data.length > 0 && <div className='box'>
            <style>{`#map{height: 360px;}`}</style>
            <div className="content is-medium">
                <h4>{title}</h4>
                <div id="map"></div>
            </div>
        </div>
    }


}

export default MapsComponent;