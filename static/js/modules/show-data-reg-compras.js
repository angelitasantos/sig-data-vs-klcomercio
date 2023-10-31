$(document).ready(function () {
    MaxRegistros();
    ShowAllDataRegistrosMargem();
});



const GoogleRegistros = "AKfycbynjDq8a_VsCxQ-GfEc66pdlPaTPCLXT93XZ9q0BZgqAhGaqRA16M2K1ynYNnfnot72ww";
// script file sig-compras
var linkAction = 'https://script.google.com/macros/s/AKfycbynjDq8a_VsCxQ-GfEc66pdlPaTPCLXT93XZ9q0BZgqAhGaqRA16M2K1ynYNnfnot72ww/exec';
var linkFormAction = document.querySelector("#form-action");
linkFormAction.setAttribute("action", linkAction);



function MaxRegistros() {
    $.getJSON("https://script.google.com/macros/s/" + GoogleRegistros + "/exec?page=max",
        function (data) {
            $("input[name='inv_no']").val(data);
        });
}

function SearchRegistros(pNo = "") {
    var no = $('#inv_no').val();
    if (pNo != "") no = pNo;

    $.getJSON("https://script.google.com/macros/s/" + GoogleRegistros + "/exec?page=search&no=" + no,
        function (data) {
            if (data == "NOT FOUND") {
                alert('Número Não Encontrado!!!');
            }
            else {
                var record = data.record;

                var StartRow = data.SR;
                var RowCount = data.CNT;

                $('#IsNew').val('N');
                $('#StartRow').val(StartRow);
                $('#RowCount').val(RowCount);

                var i = 0;
                $.each(record, function (key, value) {
                    if (i == 0) {
                        var dt = value[16].substring(0, 10);
                        document.getElementsByName("inv_no")[0].value = value[0];
                        document.getElementsByName("order_type")[0].value = value[1];
                        document.getElementsByName("reg_dt")[0].value = dt;
                        document.getElementsByName("order_status")[0].value = value[3];
                        document.getElementsByName("partner")[0].value = value[4];
                        document.getElementsByName("payment_type")[0].value = value[8];
                        document.getElementsByName("payment_qtd")[0].value = value[9];
                        document.getElementsByName("payment_status")[0].value = value[10];
                        document.getElementsByName("seller")[0].value = value[17];
                        document.getElementsByName("id_partner")[0].value = value[18];
                        document.getElementsByName("phone")[0].value = value[19];
                        document.getElementsByName("city")[0].value = value[20];
                        document.getElementsByName("address")[0].value = value[21];
                        document.getElementsByName("email")[0].value = value[22];
                        document.getElementsByName("reg_add")[0].value = value[23];
                        document.getElementsByName("reg_discount")[0].value = value[24];
                    }
                    else {
                        if (i > 1) BtnAdd();
                        var dtval = value[30].substring(0, 10);
                        document.getElementsByName("id_item")[i].value = value[26];
                        document.getElementsByName("item_nm")[i].value = value[27];
                        document.getElementsByName("qty")[i].value = value[28];
                        document.getElementsByName("lot")[i].value = value[29];
                        document.getElementsByName("validate")[i].value = dtval;
                        document.getElementsByName("price")[i].value = value[31];
                        document.getElementsByName("amt")[i].value = value[32];
                    }
                    i = i + 1;
                });

                GetTotal();
            }
        });

    $('#modalListaRegistros').modal('hide');
}

function ShowAllDataRegistros() {

    $(document).ready(function () {

        $.getJSON("https://script.google.com/macros/s/" + GoogleRegistros + "/exec?page=all",
            function (data) {

                var Table = "", Rows = "", Columns = "";

                $.each(data, function (key, value) {

                    var InvNo = "";
                    Columns = "";

                    $.each(value, function (key1, value1) {

                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (InvNo == "") InvNo = value1;

                    });
                    Rows = Rows + '<tr class="text-center" onclick="SearchRegistros(' + InvNo + ')">' + Columns + '</tr>';
                });

                $("#TBodyAll").html(Rows);
                $("#modalListaRegistros").modal('show');

            });
    });

}

function ShowAllDataRegistrosGeral() {

    $(document).ready(function () {

        $.getJSON("https://script.google.com/macros/s/" + GoogleRegistros + "/exec?page=allGeral",
            function (data) {

                var Table = "", Rows = "", Columns = "";

                $.each(data, function (key, value) {

                    var InvNo = "";
                    Columns = "";

                    $.each(value, function (key1, value1) {

                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (InvNo == "") InvNo = value1;

                    });
                    Rows = Rows + '<tr class="text-center">' + Columns + '</tr>';
                });

                $("#TBody").html(Rows);

            });
    });

}

function ShowAllDataRegistrosMargem() {

    $(document).ready(function () {

        $.getJSON("https://script.google.com/macros/s/" + GoogleRegistros + "/exec?page=allMargem",
            function (data) {

                var Table = "", Rows = "", Columns = "";

                $.each(data, function (key, value) {

                    var InvNo = "";
                    Columns = "";

                    $.each(value, function (key1, value1) {

                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (InvNo == "") InvNo = value1;

                    });
                    Rows = Rows + '<tr class="text-center">' + Columns + '</tr>';
                });

                $("#TBodyMargem").html(Rows);

            });
    });

}