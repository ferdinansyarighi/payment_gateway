$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    getData();
});

function getData(){
    $.ajax({
        type: "POST",
        url: "get_opener",
        dataType: "json",
        success: function (data) {
            $("#opt_theme").val(data.opener['id_theme']);
            $("#opt_religion").val(data.opener['agama']);
            $("#opt_music").val(data.music['music_file']);
            $("#txt_surah").val(data.opener['surah_name']);
            $("#txt_isi_surah").val(data.opener['surah_content']);
            $("#txt_pembuka").val(data.opener['open_content']);
            $("#txt_penutup").val(data.opener['close_content']);
        }
    });
}

function editData(){
    $.ajax({
        type: "POST",
        url: "edit_opener",
        dataType: "json",
        data: {
            theme       : $("#opt_theme").val(),
            agama       : $("#opt_religion").val(),
            music       : $("#opt_music").val(),
            surah       : $("#txt_surah").val(),
            isi_surah   : $("#txt_isi_surah").val(),
            pembuka     : $("#txt_pembuka").val(),
            penutup     : $("#txt_penutup").val(),
        },
        success: function (response) {
            if(response.data > 0){
                msgbox('success','Data berhasil dirubah !');
            }else{
                msgbox('warning','Tidak ada data yang dirubah !');
                closeEdit();
            }
        }
    });
}

function setTheme(id){
    $("#opt_theme").val(id);
}

function previewTheme(code){
    window.open('https://lux.aurorashine.id/demo'+code+'/?to=admin', '_blank').focus();
}

function playMusic(){
    $("#music-track").attr("src", "../../assets/audio/"+$("#opt_music").val());

    const audio = document.getElementById("music-track");
	audio.volume = 0.5;
	audio.play();
}

function stopMusic(){
    const audio = document.getElementById("music-track");
	audio.pause();
}