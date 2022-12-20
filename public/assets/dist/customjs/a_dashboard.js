$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#myTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: 'payment_json',
        columns: [
            { data: 'name', name: 'name' },
            { data: 'reff_no', name: 'reff_no' },
            { data: 'code', name: 'code' },
            { data: 'amount', name: 'amount' },
            { data: 'status', name: 'status' },
        ]
    });
});