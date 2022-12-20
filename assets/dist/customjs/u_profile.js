$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    getData();
    checkActive();
});

function getData(){
    $.ajax({
        type: "POST",
        url: "getData_Profile",
        dataType: "json",
        success: function (response) {
            document.getElementById("txt_groom_fullname").value     = response.data[0].groom_fullname;
            document.getElementById("txt_bride_fullname").value     = response.data[0].bride_fullname;
            document.getElementById("txt_groom_nickname").value     = response.data[0].groom_nickname;
            document.getElementById("txt_bride_nickname").value     = response.data[0].bride_nickname;
            document.getElementById("txt_groom_dad").value          = response.data[0].groom_dad;
            document.getElementById("txt_groom_mom").value          = response.data[0].groom_mom;
            document.getElementById("txt_bride_dad").value          = response.data[0].bride_dad;
            document.getElementById("txt_bride_mom").value          = response.data[0].bride_mom;
        }
    });
}

function editData(){
    $.ajax({
        type: "POST",
        url: "editData_Profile",
        dataType: "json",
        data: {
            groom_fullname  : $("#txt_groom_fullname").val(),
            bride_fullname  : $("#txt_bride_fullname").val(),
            groom_nickname  : $("#txt_groom_nickname").val(),
            bride_nickname  : $("#txt_bride_nickname").val(),
            groom_dad       : $("#txt_groom_dad").val(),
            groom_mom       : $("#txt_groom_mom").val(),
            bride_dad       : $("#txt_bride_dad").val(),
            bride_mom       : $("#txt_bride_mom").val()
        },
        success: function (response) {
            if(response.data > 0){
                msgbox('success','Data berhasil dirubah !');
            }else{
                msgbox('warning','Tidak ada data yang dirubah !');
            }
        }
    });
}