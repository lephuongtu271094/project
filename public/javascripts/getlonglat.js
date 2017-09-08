$('#pac-input').keypress(function(event){

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        let getlonglat = $('#pac-input').val()
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ getlonglat)
            .then(res => {
                let lat = res.data.results[0].geometry.location.lat;
                let long = res.data.results[0].geometry.location.lng;
                let address = res.data.results[0].formatted_address;
                let addres = address.split(',')
                $('#address').val(addres[0])
                $('#lat').val(lat)
                $('#long').val(long)
            })
    }
    event.stopPropagation();
});