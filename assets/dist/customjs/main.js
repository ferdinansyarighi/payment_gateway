$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    
    //Initialize Select2 Elements
    $('.select2').select2()

    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    })
});

function checkActive(){
    $.ajax({
        type: "POST",
        url: "getActive_Main",
        dataType: "json",
        data: {
            url : $("#txt_url").val()
        },
        success: function (response) {
            console.log(response.data);
            var date1 = new Date();
            var date2 = new Date(response.data[0].active);

            if(date1 > date2){
                $("#paymentModal").modal('show');
            }
        }
    });
}

function msgbox(stat,message){

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        // iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: false
    })

    if(stat === 'success'){
        Toast.fire({
            icon: 'success',
            title: message
        })
    }else if(stat === 'error'){
        Toast.fire({
            icon: 'error',
            title: message
        })
    }else if(stat === 'warning'){
        Toast.fire({
            icon: 'warning',
            title: message
        })
    }else if(stat === 'info'){
        Toast.fire({
            icon: 'info',
            title: message
        })
    }else if(stat === 'question'){
        Toast.fire({
            icon: 'question',
            title: message
        })
    }
}

function zeroLead(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

var formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});