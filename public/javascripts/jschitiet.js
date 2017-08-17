$(document).ready(function () {
    $('#btn-datcho').click(function () {
        $('#myModal').modal('hide');
        $('#datbanthanhcong').modal('show');
    })
    $('.timepicker').timepicker({
        showInputs: false
    })
    $('#datepicker').datepicker({
        autoclose: true
    })
    $("#datepicker").datepicker("setDate", new Date());




})

function datban() {
    let formData = $('form#datban').serialize()
    axios.post('/datban' , formData)
}