function initMap() {
    var uluru = {lat: 21.0091710257685, lng: 105.806988626719};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru,
        scrollwheel: false
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}