function InsertUser() {
    debugger;
    var userName = $("#AName").val();
    var Email = $("#ALat").val();
    var civilid = $("#CivilName").val();
    var carLicense = $("#CName").val();
    var imagenBase64 = $("#pImageBase64").html();

    $.ajax({
        url: '/Index/InsertuS',
        type: 'POST',
        data: JSON.stringify({
            FullName: userName,
            UserEmail: Email,
            CivilIdNumber: civilid,
            CarLicense: carLicense,
            ProfilePic: imagenBase64


        }),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            //window.reload();
            //$("#addUser").hide();
            //$("#addUser").addClass('hide');
            $('#addUser').modal('hide');

        }

    });

}

function encodeImagetoBase64(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        $("#image").attr("src", reader.result);
        $("#pImageBase64").html(reader.result);

    }
    reader.readAsDataURL(file);
}


function DeleteUser(Id) {
    debugger;
    var result = confirm('Are you sure you wish to delete this record?');
    if (result) {
        $.ajax({
            url: '/Index/Delete?id=' + Id,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function (data) {
                window.reload();
                //$("#addUser").hide();
                //$("#addUser").addClass('hide');
            }

        });
    }

}



//get data for updation....................................................................................................




function EditUser(Id) {
    debugger;
    $.ajax({
        url: '/Index/Edit?Id=' + Id,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        async: true,
        success: function (data) {
            //debugger;
            console.log(data);

            $('#gid').val(data.UserId);
            $('#Name').val(data.FullName);
            $('#emailid').val(data.UserEmail);
            $('#CivilIdNumber').val(data.CivilIdNumber);
            $('#cLicense').val(data.CarLicense);


            var sno = 0;
            var div = $('#CName1');
            div.empty();

            data.CarDetails.forEach(function (event) {

                div.append("<label>CarLicense" + (sno + 1) + "</label>" +
                    "<input class='form-control' id='" + event.Id + "' name='CName1' type='text' value='" + event.CarLicense + "' />");

                sno++;
            });
        }
        //$("#editUser").hide();
        //$("#editUser").addClass('hide');


    });
}




function UpdateUser() {
    debugger;

    var UserId = $("#gid").val();
    var userName = $("#Name").val();
    var Email = $("#emailid").val();
    var CivilIdNumber = $("#CivilIdNumber").val();
    //var carLicense = $("#cLicense").val();
    var carLicense = $('#CName1 input').val();

    var Car = new Array();
    $("input[name='CName1']").each(function () {
        Car.push($(this).attr('id'));
    });

    var CarUser = new Array();
    Car.forEach(function (value) {
        CarUser.push({
            Id: value,
            CarLicense: $("#" + value).val()
        });
        console.log(CarUser);
    });

    $.ajax({
        url: '/Index/EdituS',
        type: 'POST',
        data: JSON.stringify({
            UserId: UserId,
            FullName: userName,
            UserEmail: Email,
            CivilIdNumber: CivilIdNumber,
            CarLicense: carLicense
        }),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            //window.reload();
            //console.log(data.success);

        }

    });
}


//function UpdateUser() {
//    debugger;

//    var UserId = $("#gid").val();
//    var userName = $("#Name").val();
//    var Email = $("#emailid").val();
//    var civilid = $("#CivilIdNumber").val();
//    var carLicense = $("#cLicense").val();

//    $.ajax({
//        url: '/Index/EdutuS',
//        type: 'POST',
//        data: JSON.stringify({
//            UserId:UserId,
//            FullName: userName,
//            UserEmail: Email,
//            CivilIdNumber: civilid,
//            CarLicense: carLicense



//        }),
//        dataType: 'json',
//        contentType: 'application/json',
//        async: false,
//        success: function (data) {
//            //window.reload();
//            //$("#addUser").hide();
//            //$("#addUser").addClass('hide');
//            //$('#addUser').modal('hide');

//        }

//    });

//}


//function UpdateUser() {
//    debugger;
//    var UserId = $("#gid").val();
//    var FullName = $("#Name").val();
//    var UserEmail = $("#emailid").val();
//    var CivilIdNumber = $("CivilIdNumber").val();
//    var carLicense = $("#cLicense").val();

//    $.ajax({
//        url: '/Index/EdituS',
//        type: 'POST',
//        data: JSON.stringify({
//            UserId: UserId,
//            FullName: FullName,
//            UserEmail: UserEmail,
//            CivilIdNumber: CivilIdNumber,
//            carLicense: carLicense

//        }),
//        dataType: 'json',
//        contentType: 'application/json',
//        async: false,
//        success: function (data) {
//            window.reload();
//            $("#EditUser").hide();
//            $("#EditUser").addClass('hide');
//        }

//    });
//}




//function EditUser(Id) {
//    debugger;
//    $.ajax({
//        url: '/Index/Edit?Id=' + Id,
//        type: 'GET',
//        dataType: 'json',
//        contentType: 'application/json',
//        async: true,
//        success: function (data) {
//            debugger;
//            console.log(data);

//            $("#editUser").hide();
//            $("#editUser").addClass('hide');
//        }

//    });

//}

//$(document).ready(function() {
//    $("#image").change(function () {
//        var formData = new FormData();
//        var totalFiles = document.getElementById("image").files.length;
//        for (var i = 0; i < totalFiles; i++) {
//            var file = document.getElementById("image").files[i];
//            formData.append("image", file);
//        }
//        $.ajax({
//            type: "POST",
//            url: '/index/InsertuS',
//            data: formData,
//            dataType: 'json',
//            contentType: false,
//            processData: false
//        }).done(function () {
//            alert('success');
//        }.fail(function (xhr, status, errorThrown) {
//            alert('fail');
//        });
//    });
//});