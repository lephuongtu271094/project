$(document).ready(function () {
    $('.timepicker').timepicker({
        showInputs: false
    })
    $('#datepicker').datepicker({
        autoclose: true
    })
    $("#datepicker").datepicker("setDate", new Date());
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
                    '<span>Họ Tên : ' + success.name_dat + '</span><br>' +
                    '<span>Số Điện Thoại :' + success.so_dat + ' </span><br>' +
                    '<span>Nhà Hàng : </span><br>' +
                    '<span>Ngày Đặt :' + success.date_dat + ' </span><br>' +
                    '<span>Thời Gian :' + success.time_dat + ' </span><br>' +
                    '<span>Số Người : ' + success.soluong + '</span><br>' +
                    '<span>Ghi Chú : ' + success.ghichu + '</span>'
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