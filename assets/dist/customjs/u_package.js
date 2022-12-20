var price   = '39000';
var service = '4000';
var total   = '43000';
var item    = 'Paket Bronze 30 Hari'

$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
});

function toPayment(){
    var ext_id = "WEB/"+$("#txt_nama").val()+"/"+zeroLead(parseInt($("#txt_id").val()),5) +"/" + $("#opt_paket").val() + "/" + $("#txt_url").val() + "/" + $("#txt_email").val();
    $.ajax({
        type: "POST",
        url: "createInvoice",
        dataType: "json",
        data: {
            ext_id  : ext_id,
            price   : price,
            service : service,
            total   : total,
            item    : item,
            url     : $("#txt_url").val(),
            id_cust : $("#txt_id").val(),
            name    : $("#txt_nama").val(),
            email   : $("#txt_email").val(),
            phone   : $("#txt_phone").val()
        },
        success: function (response) {
            window.open(response.data.invoice_url);
        }
    });
}

function chgPrice(){
    if($("#opt_paket").val() === "30B"){
        $("#txt_price").val("Rp39.000");
        $("#txt_price2").val("Rp39.000");
        $("#txt_service").val("Rp4.000");
        $("#txt_service2").val("Rp4.000");
        $("#txt_total").val("Rp43.000");
        $("#txt_paket").val("Bronze - 30 Hari");

        price   = '39000';
        service = '4000';
        item    = 'Paket Bronze 30 Hari';
    }else if($("#opt_paket").val() === "99B"){
        $("#txt_price").val("Rp59.000");
        $("#txt_price2").val("Rp59.000");
        $("#txt_service").val("Rp4.000");
        $("#txt_service2").val("Rp4.000");
        $("#txt_total").val("Rp63.000");
        $("#txt_paket").val("Bronze - Selamanya");

        price   = '59000';
        service = '4000';
        item    = 'Paket Bronze Selamanya';
    }else if($("#opt_paket").val() === "30S"){
        $("#txt_price").val("Rp99.000");
        $("#txt_price2").val("Rp99.000");
        $("#txt_service").val("Rp3.000");
        $("#txt_service2").val("Rp3.000");
        $("#txt_total").val("Rp102.000");
        $("#txt_paket").val("Silver - 30 Hari");

        price   = '99000';
        service = '3000';
        item    = 'Paket Silver 30 Hari';
    }else if($("#opt_paket").val() === "99S"){
        $("#txt_price").val("Rp119.000");
        $("#txt_price2").val("Rp119.000");
        $("#txt_service").val("Rp3.000");
        $("#txt_service2").val("Rp3.000");
        $("#txt_total").val("Rp122.000");
        $("#txt_paket").val("Silver - Selamanya");

        price   = '119000';
        service = '3000';
        item    = 'Paket Silver Selamanya';
    }else if($("#opt_paket").val() === "30G"){
        $("#txt_price").val("Rp159.000");
        $("#txt_price2").val("Rp159.000");
        $("#txt_service").val("Rp2.000");
        $("#txt_service2").val("Rp2.000");
        $("#txt_total").val("Rp161.000");
        $("#txt_paket").val("Gold - 30 Hari");

        price   = '159000';
        service = '2000';
        item    = 'Paket Gold 30 Hari';
    }else if($("#opt_paket").val() === "99G"){
        $("#txt_price").val("Rp179.000");
        $("#txt_price2").val("Rp179.000");
        $("#txt_service").val("Rp2.000");
        $("#txt_service2").val("Rp2.000");
        $("#txt_total").val("Rp181.000");
        $("#txt_paket").val("Gold - Selamanya");

        price   = '179000';
        service = '2000';
        item    = 'Paket Gold Selamanya';
    }else if($("#opt_paket").val() === "30P"){
        $("#txt_price").val("Rp209.000");
        $("#txt_price2").val("Rp209.000");
        $("#txt_service").val("Rp1.000");
        $("#txt_service2").val("Rp1.000");
        $("#txt_total").val("Rp41.000");
        $("#txt_paket").val("Platinum - 30 Hari");

        price   = '209000';
        service = '1000';
        item    = 'Paket Platinum 30 Hari';
    }else if($("#opt_paket").val() === "99P"){
        $("#txt_price").val("Rp229.000");
        $("#txt_price2").val("Rp229.000");
        $("#txt_service").val("Rp1.000");
        $("#txt_service2").val("Rp1.000");
        $("#txt_total").val("Rp230.000");
        $("#txt_paket").val("Platinum - Selamanya");

        price   = '229000';
        service = '1000';
        item    = 'Paket Platinum Selamanya';
    }

    total   = parseInt(price) + parseInt(service);
    $("#total_inv").empty();
    $("#total_inv").append("Total : " + formatter.format(total));
}