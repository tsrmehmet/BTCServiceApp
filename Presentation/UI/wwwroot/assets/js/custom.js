var dateRangePickerSettings = {
    locale: {
        format: "DD/MM/YYYY",
        applyLabel: "Uygula",
        cancelLabel: "Vazgeç",
        fromLabel: "Dan",
        toLabel: "a",
        customRangeLabel: "Seç",
        separator: " - ",
        daysOfWeek: [
            "Pz",
            "Pt",
            "Sl",
            "Çr",
            "Pr",
            "Cm",
            "Ct",
        ],
        monthNames: [
            "Ocak",
            "Þubat",
            "Mart",
            "Nisan",
            "Mayýs",
            "Haziran",
            "Temmuz",
            "Aðustos",
            "Eylül",
            "Ekim",
            "Kasým",
            "Aralýk"
        ],
        "firstDay": 1
    },
};
var dateRangePickerTimeSettings = {
    locale: {
        format: "DD/MM/YYYY HH:mm",
        applyLabel: "Uygula",
        cancelLabel: "Vazgeç",
        fromLabel: "Dan",
        toLabel: "a",
        customRangeLabel: "Seç",
        separator: " - ",
        daysOfWeek: [
            "Pz",
            "Pt",
            "Sl",
            "Çr",
            "Pr",
            "Cm",
            "Ct",
        ],
        monthNames: [
            "Ocak",
            "Þubat",
            "Mart",
            "Nisan",
            "Mayýs",
            "Haziran",
            "Temmuz",
            "Aðustos",
            "Eylül",
            "Ekim",
            "Kasým",
            "Aralýk"
        ],
        "firstDay": 1
    },
};


$(document).ready(function () {

    function isDelete() {
        if (confirm("Silmek istediðinize emin misiniz?")) {
            return true;
        } else {
            return false;
        }
    }

    var validator = $('.formValidate').validate({
        errorClass: 'validation-invalid-label',
        successClass: 'validation-valid-label',
        validClass: 'validation-valid-label',
        highlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
        },
        unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
        },
        //success: function (label) {
        //    label.addClass('validation-valid-label').text('Başarılı.'); // remove to hide Success message
        //},
        errorPlacement: function (error, element) {

            // Unstyled checkboxes, radios
            if (element.parents().hasClass('form-check')) {
                error.appendTo(element.parents('.form-check').parent());
            }

            // Input with icons and Select2
            else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                error.appendTo(element.parent());
            }

            // Input group, styled file input
            else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                error.appendTo(element.parent().parent());
            }

            // Other elements
            else {
                error.insertAfter(element);
            }
        },
    });


    $('.daterange-single').daterangepicker({
        singleDatePicker: true,
        locale: dateRangePickerSettings.locale,
        firstDay: 1
    });

    function addLoadSpiner(el) {
        if (el.length > 0) {
            if ($("#img_" + el[0].id).length > 0) {
                $("#img_" + el[0].id).css('display', 'block');
            }
            else {
                var img = $('<img class="ddloading">');
                img.attr('id', "img_" + el[0].id);
                img.attr('src', '/assets/images/ajax-loader.gif');
                img.css({ 'display': 'block', 'width': '15px', 'height': '15px', 'z-index': '100', 'float': 'right', 'position': 'absolute', 'right': '70px', 'top': '10px' });
                img.prependTo(el[0].nextElementSibling);
            }
            el.prop("disabled", true);
        }
    }
    function hideLoadSpinner(el) {
        if (el.length > 0) {
            if ($("#img_" + el[0].id).length > 0) {
                setTimeout(function () {
                    $("#img_" + el[0].id).css('display', 'none');
                    el.prop("disabled", false);
                }, 500);
            }
        }
    }


    function setSelect2Options(data) {
        if (!data) return;
        var i, l, html, opt;
        for (i = 0, l = data.length; i < l; i++) {
            opt = data[i];
            html += "<option value='" + opt.value + "'>" + opt.text + "</option>";
        }
        if (html) {
            selectCounty.html(html);
        }
        selectCounty.trigger('change');
    }

    var toNumbersArray = arr => arr.map(Number);


    var swalInit = swal.mixin({
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-light'
    });


    function btnDelete(e, actionUrl, actionId) {
        var $this = $(e);
        event.preventDefault(); // prevent form submit 
        swalInit.fire({
            title: 'Emin misiniz?',
            text: "Seçili satırı silmek istediğinizden emin misiniz?",
            showCancelButton: true,
            confirmButtonText: 'Evet',
            cancelButtonText: 'Hayır',
        }).then((result) => {
            if (result.value) {

                $.ajax({
                    url: actionUrl,
                    type: "POST",
                    data: {
                        id: actionId,
                    },
                    success: function (data) {
                        $this.parents('tr').remove();
                        swalInit.fire({
                            title: 'Silme işlemi başarılı',
                            type: 'success',
                            confirmButtonText: 'Tamam',
                            html: true
                        })
                    },
                    error: function (jqXHR, textStatus, errorThrown) { }
                });



            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === swalInit.DismissReason.cancel
            ) {
                swalInit.fire({
                    title: 'Silme işlemi iptal edildi',
                    type: 'error',
                    confirmButtonText: 'Tamam',
                })
            }
        })
    }

}