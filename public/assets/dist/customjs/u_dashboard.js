$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    checkActive();
    setSession();
    getData();
});

function getData(){
    $.ajax({
        type: "POST",
        url: "getData_Dashboard",
        dataType: "json",
        success: function (data) {
            document.getElementById("txt_admin_key").value  = data.central['admin_key']; 
            document.getElementById("ctr_rsvp").innerHTML   = data.counter['ctr_rsvp']+ " Orang"; 
            document.getElementById("ctr_log").innerHTML    = data.counter['ctr_log'] + " Tamu"; 
            document.getElementById("ctr_gift").innerHTML   = data.counter['ctr_gift'] + " Pemberi"; 
        }
    });
}

function editData(){
    $.ajax({
        type: "POST",
        url: "editData_Dashboard",
        dataType: "json",
        data: {
            url         : $("#txt_url").val(),
            name        : $("#txt_name").val(),
            email       : $("#txt_email").val(),
            birthdate   : $("#txt_birthdate").val(),
            nohp        : $("#txt_nohp").val(),
            jk          : $("#txt_jk").val(),
            admin_key   : $("#txt_admin_key").val(),
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

function setSession(){
    $.ajax({
        type: "POST",
        url: "setSession",
        dataType: "json",
        data: {
            url : $("#txt_url").val()
        },
        success: function (response) {
            let masa_aktif      = response.data.active_until;
            const arr_masaaktif = masa_aktif.split("-");
            let ma_year         = arr_masaaktif[0];
            let ma_month        = arr_masaaktif[0];
            let ma_day          = arr_masaaktif[0];

            let date1 = new Date();
            let date2 = new Date(response.data.active_until);
            var Difference_In_Time = date2.getTime() - date1.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            if(ma_year >= 2100){
                masa_aktif = "Selamanya";
                document.getElementById("masa_aktif").innerHTML = masa_aktif; 
            }else{
                if(Difference_In_Days > 0){
                    masa_aktif = Math.round(Difference_In_Days) + " Hari";
                }else{
                    masa_aktif = "Habis"
                }
                
                document.getElementById("masa_aktif").innerHTML = masa_aktif; 
            }
        }
    });
}