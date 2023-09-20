function SupplyScopeDetailCreate(datas, options) {
    this.root = document.createElement("div");
    this.root.className = "form-group row";
    let t = this;

    const _spMainDiv = document.createElement("div");
    _spMainDiv.className = "form-group row";

    for (var i = 0; i < datas.recordsTotal; i++) {
        if (datas.data[i] != null) {
            var data = datas.data[i];
            if ("children" in data && data.children != null && data.children.length > 0) {
                for (var i2 = 0; i2 < data.children.length; i2++) {
                    var dataChildren = data.children[i2];
                    if (dataChildren != null) {
                        if ("children" in dataChildren && dataChildren.children != null && dataChildren.children.length > 0) {
                            for (var i3 = 0; i3 < dataChildren.children.length; i3++) {
                                var dataChildren2 = dataChildren.children[i3];
                                if (dataChildren2 != null) {
                                    if ("children" in dataChildren2 && dataChildren2.children != null && dataChildren2.children.length > 0) {

                                    } else {
                                        createSupplyScopeDetail(dataChildren2);
                                    }

                                }
                            }
                        } else {
                            createSupplyScopeDetail(dataChildren);
                        }
                    }
                }
            } else {
                createSupplyScopeDetail(data);
            }
        }
    }

    function createSupplyScopeDetail(datas) {
        var id = datas.id;
        //Secilen gurup icin DIV olusturuldu.
        const _spDiv = document.createElement("div");
        _spDiv.className = "row";
        _spDiv.id = "sp_" + id;

        ////Gurup icerisinde konulacak TEXBOX lar icin  ROW DIV olusuturldu.
        //const _spRowDiv = document.createElement("div");
        //_spRowDiv.className = "row";

        //Ilk LABEL olusutruldu
        const _spLabel = document.createElement("label");
        _spLabel.className = "col-form-label text-sm-right font-weight-semibold col-sm-1";
        _spLabel.innerHTML = datas.name;

        //Olusturulan LABEL ROW DIV in icine yerlestirildi.
        _spDiv.appendChild(_spLabel);

        for (var i = 1; i <= 10; i++) {
            var checkbox = "checkbox" + i;
            var checked = false;
            var checkboxPlaceHolder = "";
            if (checkbox in datas) {

                switch (i) {
                    case 1:
                        checkboxPlaceHolder = datas.textbox1;
                        checked = datas.checkbox1;
                        break;
                    case 2:
                        checkboxPlaceHolder = datas.textbox2;
                        checked = datas.checkbox2;
                        break;
                    case 3:
                        checkboxPlaceHolder = datas.textbox3;
                        checked = datas.checkbox3;
                        break;
                    case 4:
                        checkboxPlaceHolder = datas.textbox4;
                        checked = datas.checkbox4;
                        break;
                    case 5:
                        checkboxPlaceHolder = datas.textbox5;
                        checked = datas.checkbox5;
                        break;
                    case 6:
                        checkboxPlaceHolder = datas.textbox6;
                        checked = datas.checkbox6;
                        break;
                    case 7:
                        checkboxPlaceHolder = datas.textbox7;
                        checked = datas.checkbox7;
                        break;
                    case 8:
                        checkboxPlaceHolder = datas.textbox8;
                        checked = datas.checkbox8;
                        break;
                    case 9:
                        checkboxPlaceHolder = datas.textbox9;
                        checked = datas.checkbox9;
                        break;
                    case 10:
                        checkboxPlaceHolder = datas.textbox10;
                        checked = datas.checkbox10;
                        break;

                }

                //INPUT icin COL DIV olusturuldu.
                const _spInputDiv = document.createElement("div");
                _spInputDiv.className = "col-sm-1";

                //INPUT olusutruldu
                const _spInput = document.createElement("input");
                _spInput.className = "form-control";
                _spInput.name = checkbox;
                _spInput.id = checkbox;
                _spInput.autocomplete = "off";

                if (!checked)
                    _spInput.style = "display: none;";

                if (checkboxPlaceHolder != null)
                    _spInput.placeholder = checkboxPlaceHolder;

                _spInputDiv.appendChild(_spInput);

                _spDiv.appendChild(_spInputDiv);

                //_spRowDiv.appendChild(_spInputDiv);

            }

        }



        _spMainDiv.appendChild(_spDiv);
    }
    return _spMainDiv;

}
