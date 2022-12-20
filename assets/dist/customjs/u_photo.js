$(document).ready(function () {
    getData();
    checkActive();
    $("#photo_cover").hide();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("body").on("change", "#upload-cover", function (e) {
        var files = e.target.files;

        if(files[0].type == "image/jpg" || files[0].type == "image/jpeg" || files[0].type == "image/png"){
            showProfileModal(files,"cover");
        }else{
            document.getElementById("upload-cover").value = ""; 
            msgbox('error','Format file harus jpg/jpeg/png !');
        }
    });

    $("body").on("change", "#upload-pria", function (e) {
        var files = e.target.files;

        if(files[0].type == "image/jpg" || files[0].type == "image/jpeg" || files[0].type == "image/png"){
            showProfileModal(files,"pria");
        }else{
            document.getElementById("upload-pria").value = ""; 
            msgbox('error','Format file harus jpg/jpeg/png !');
        }
    });

    $("body").on("change", "#upload-wanita", function (e) {
        var files = e.target.files;

        if(files[0].type == "image/jpg" || files[0].type == "image/jpeg" || files[0].type == "image/png"){
            showProfileModal(files,"wanita");
        }else{
            document.getElementById("upload-wanita").value = ""; 
            msgbox('error','Format file harus jpg/jpeg/png !');
        }
    });

    $("body").on("change", "#upload-head", function (e) {
        var files = e.target.files;

        if(files[0].type == "image/jpg" || files[0].type == "image/jpeg" || files[0].type == "image/png"){
            showHeadModal(files,"head");
        }else{
            document.getElementById("upload-head").value = ""; 
            msgbox('error','Format file harus jpg/jpeg/png !');
        }
    });

    $("body").on("change", "#upload-og", function (e) {
        var files = e.target.files;

        if(files[0].type == "image/jpg" || files[0].type == "image/jpeg" || files[0].type == "image/png"){
            showOgModal(files,"og");
        }else{
            document.getElementById("upload-og").value = ""; 
            msgbox('error','Format file harus jpg/jpeg/png !');
        }
    });
});

function getData(){
    $.ajax({
        type: "GET",
        url: "get_image",
        dataType: "json",
        data: {
            id : $("#txt_id").val()
        },
        success: function (data) {
            if(data.theme['level'] == "premium"){
                $("#photo_cover").show();
            }

            if(data.imgcover['img_cover'] == null || data.imgcover['img_cover'] == ""){
                $("#img-cover").attr("src", "../assets/photo/blank.jpg");
            }else{
                d = new Date();
                $("#img-cover").attr("src", "../assets/photo/" + data.imgcover['img_cover'] + "?" + d.getTime());
            }

            if(data.imgpria['img_groom'] == null || data.imgpria['img_groom'] == ""){
                $("#img-profil-pria").attr("src", "../assets/photo/blank.jpg");
            }else{
                d = new Date();
                $("#img-profil-pria").attr("src", "../assets/photo/" + data.imgpria['img_groom'] + "?" + d.getTime());
            }

            if(data.imgwanita['img_bride'] == null || data.imgwanita['img_bride'] == ""){
                $("#img-profil-wanita").attr("src", "../assets/photo/blank.jpg");
            }else{
                d = new Date();
                $("#img-profil-wanita").attr("src", "../assets/photo/" + data.imgwanita['img_bride'] + "?" + d.getTime());
            }

            if(data.imghead['img_head'] == null || data.imghead['img_head'] == ""){
                $("#img-head").attr("src", "../assets/photo/blank.jpg");
            }else{
                d = new Date();
                $("#img-head").attr("src", "../assets/photo/" + data.imghead['img_head'] + "?" + d.getTime());
            }

            if(data.imgog['img_og'] == null || data.imgog['img_og'] == ""){
                $("#img-og").attr("src", "../assets/photo/blank.jpg");
            }else{
                d = new Date();
                $("#img-og").attr("src", "../assets/photo/" + data.imgog['img_og'] + "?" + d.getTime());
            }
        }
    });
}

function showHeadModal(files,stat){
    var cropper;
    var image = document.getElementById('previewHeader');

    $('#cropHeaderModal').on('shown.bs.modal', function () {
        cropper = new Cropper(image, {
            aspectRatio: 2/3,
            viewMode: 1,
            autoCropArea: 1,
            preview: '.preview',
            dragMode: 'none',
            cropBoxResizable: false,
            toggleDragModeOnDblclick : false
        });
    }).on('hidden.bs.modal', function () {
        cropper.destroy();
        cropper = null;
    });

    $("#stat").val(stat);

    var done = function (url) {
        image.src = url;
        $('#cropHeaderModal').modal('show');
    };

    var reader;
    var file;
    var url;

    if (files && files.length > 0) {
        file = files[0];
        if (URL) {
            done(URL.createObjectURL(file));
        } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
                done(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    $("#save_header_img").click(function () {
        canvas = cropper.getCroppedCanvas({
            width: 250,
            height: 375,
        });
        canvas.toBlob(function (blob) {
            url = URL.createObjectURL(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64data = reader.result;
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "upload_head",
                    data: { 
                        '_token': $('meta[name="_token"]').attr('content'),
                        'image': base64data,
                        id : $("#txt_id").val(),
                        stat : stat
                    },
                    success: function (data) {
                        $('#cropHeaderModal').modal('hide');
                        msgbox('success','Foto berhasil diupload !');
                        getData();
                    }
                });
            }
        });
    })
}

function showOgModal(files,stat){
    var cropper;
    var image = document.getElementById('previewOg');

    $('#cropOgModal').on('shown.bs.modal', function () {
        cropper = new Cropper(image, {
            aspectRatio: 4/3,
            viewMode: 1,
            autoCropArea: 1,
            preview: '.preview',
            dragMode: 'none',
            cropBoxResizable: false,
            toggleDragModeOnDblclick : false
        });
    }).on('hidden.bs.modal', function () {
        cropper.destroy();
        cropper = null;
    });

    $("#stat").val(stat);

    var done = function (url) {
        image.src = url;
        $('#cropOgModal').modal('show');
    };

    var reader;
    var file;
    var url;

    if (files && files.length > 0) {
        file = files[0];
        if (URL) {
            done(URL.createObjectURL(file));
        } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
                done(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    $("#save_og_img").click(function () {
        canvas = cropper.getCroppedCanvas({
            width: 300,
            height: 200,
        });
        canvas.toBlob(function (blob) {
            url = URL.createObjectURL(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64data = reader.result;
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "upload_head",
                    data: { 
                        '_token': $('meta[name="_token"]').attr('content'),
                        'image': base64data,
                        id : $("#txt_id").val(),
                        stat : stat
                    },
                    success: function (data) {
                        $('#cropOgModal').modal('hide');
                        msgbox('success','Foto berhasil diupload !');
                        getData();
                    }
                });
            }
        });
    })
}

function showProfileModal(files,stat){
    var cropper;
    var image = document.getElementById('previewProfile');

    $('#cropProfileModal').on('shown.bs.modal', function () {
        cropper = new Cropper(image, {
            aspectRatio: 1/1,
            viewMode: 1,
            autoCropArea: 1,
            preview: '.preview',
            dragMode: 'none',
            cropBoxResizable: false,
            toggleDragModeOnDblclick : false
        });
    }).on('hidden.bs.modal', function () {
        cropper.destroy();
        cropper = null;
    });

    $("#stat").val(stat);

    var done = function (url) {
        image.src = url;
        $('#cropProfileModal').modal('show');
    };

    var reader;
    var file;
    var url;

    if (files && files.length > 0) {
        file = files[0];
        if (URL) {
            done(URL.createObjectURL(file));
        } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
                done(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    $("#save_profile_img").click(function () {
        canvas = cropper.getCroppedCanvas({
            width: 500,
            height: 500,
        });
        canvas.toBlob(function (blob) {
            url = URL.createObjectURL(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64data = reader.result;
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "upload_head",
                    data: { 
                        '_token': $('meta[name="_token"]').attr('content'),
                        'image': base64data,
                        id : $("#txt_id").val(),
                        stat : stat
                    },
                    success: function (data) {
                        $('#cropProfileModal').modal('hide');
                        msgbox('success','Foto berhasil diupload !');
                        getData();
                    }
                });
            }
        });
    })
}