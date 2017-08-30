$(document).ready(function () {
    $('.timepicker').timepicker({
        showInputs: false
    })
    $('#datepicker').datepicker({
        autoclose: true
    })
    $("#datepicker").datepicker("setDate", new Date());
    $("#btn_book").on('click', function(){
        $('#errors').html('');
        $('.reset').val('');
        $('#selectbox').prop('selectedIndex', 0);
    })
})

function datban() {
    let formData = $('form#datban').serialize();
    axios.post('/datban', formData)
        .then(res => {
            if (res.data.data) {
                let success = res.data.data;
                $('#errors').html('');
                $('#myModal').modal('hide');
                $('#thanhcong').html(
                    '<span>Họ Tên : ' + success.nguoidat + '</span><br>' +
                    '<span>Số Điện Thoại :' + success.phone + ' </span><br>' +
                    '<span>Nhà Hàng : '+ success.name_location +'</span><br>' +
                    '<span>Ngày Đặt :' + success.date + ' </span><br>' +
                    '<span>Thời Gian :' + success.time + ' </span><br>' +
                    '<span>Số Người : ' + success.soluong + '</span><br>' +
                    '<span>Ghi Chú : ' + success.note + '</span>'
                );
                $('#datbanthanhcong').modal('show');
                $('.reset').val('');
                $('#selectbox').prop('selectedIndex', 0);
            } else {
                let errors = res.data.errors;
                $('#errors').html('');
                for (err in errors) {
                    $('#errors').append(
                        '<div class="alert alert-danger">' +
                        errors[err].msg +
                        '</div>'
                    );
                }
            }
        })
}