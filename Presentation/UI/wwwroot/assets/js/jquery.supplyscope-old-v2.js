function SupplyScopeDetailCreate(datas, ids) {

    var _backgroundColor = true;

    const _spMainDiv = document.getElementById("supplscopelisttable");
    var _sptMain = "spt_main";
    var _spTable = document.getElementById(_sptMain);
    if (_spTable == null) {

        //_spMainDiv = document.createElement("div");
        //_spMainDiv.className = "form-group row";

        _spTable = document.createElement("table");
        _spTable.id = _sptMain;
        //_spTable.className = "table";
        _spTable.setAttribute("data-toggle", "table")

    }

    var _insertHeader = false;
    var _headerDescL1 = "";
    var _headerIdL1 = "";

    for (var i = 0; i < datas.recordsTotal; i++) {
        if (datas.data[i] != null) {
            var data = datas.data[i];
            _insertHeader = true;
            _headerDescL1 = data.name;
            _headerIdL1 = data.id;
            if ("children" in data && data.children != null && data.children.length > 0) {
                for (var i2 = 0; i2 < data.children.length; i2++) {
                    var dataChildren = data.children[i2];
                    if (dataChildren != null) {
                        if ("children" in dataChildren && dataChildren.children != null && dataChildren.children.length > 0) {
                            //_headerDescL1 = _headerDescL1 + "/" + dataChildren.name;
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
        var _spCell;
        var _InsertLine = false;
        var _tmpId = datas.id;
        var result = ids.find(element => element == _tmpId);
        if (result != undefined) {
            var _sptHeader = "sprh1_" + _headerIdL1;
            _tmpElement = document.getElementById(_sptHeader);
            if (_tmpElement == null && _insertHeader) {
                _insertHeader = false;
                var _spTableRowHeaderL1 = _spTable.insertRow();
                _spTableRowHeaderL1.id = _sptHeader;

                _spCell = _spTableRowHeaderL1.insertCell();
                if (_backgroundColor)
                    _spTableRowHeaderL1.className = "wisebuy-table-tr";

                const _spLabel = document.createElement("label");
                _spLabel.className = "col-form-label text-sm-right font-weight-semibold wisebuy-h5-header1";
                _spLabel.innerHTML = _headerDescL1;
                _spCell.appendChild(_spLabel);

                // Sağ tarfa bosluk koyalım
                for (var i = 1; i <= 9; i++) {
                    _spTableRowHeaderL1.insertCell();
                }

            }

            var _spt = "spr_" + _tmpId;
            _tmpElement = document.getElementById(_spt);
            if (_tmpElement == null)
                _InsertLine = true;

            if (_InsertLine) {

                if ("checkbox10" in datas) {
                    if (datas.checkbox10) {
                        // RadioBox Insert
                        var _spTableRowRadioBox = _spTable.insertRow();
                        _spTableRowRadioBox.id = _spt;
                        if (_backgroundColor)
                            _spTableRowRadioBox.className = "wisebuy-table-tr";

                        _spCell = _spTableRowRadioBox.insertCell();

                        const _spLabel = document.createElement("label");
                        _spLabel.className = "col-form-label text-sm-right font-weight-semibold";
                        _spLabel.innerHTML = datas.name;
                        _spCell.appendChild(_spLabel);

                        // Sol tarfa bosluk koyalım
                        //_spTableRowRadioBox.insertCell();

                        _spCell = _spTableRowRadioBox.insertCell();

                        const _spRadioBoxLn1 = document.createElement("input");
                        _spRadioBoxLn1.setAttribute("type", "radio");
                        _spRadioBoxLn1.name = _spTableRowRadioBox.id + "_checkbox10";
                        _spRadioBoxLn1.id = _spTableRowRadioBox.id + "_checkbox10_0";
                        _spRadioBoxLn1.setAttribute("onclick", "selectCallback(this.id)");
                        _spRadioBoxLn1.setAttribute("value", "0");
                        _spRadioBoxLn1.setAttribute("checked", "1");
                        _spCell.appendChild(_spRadioBoxLn1);

                        var _spRadioBoxLabelLn1 = document.createElement("label");
                        _spRadioBoxLabelLn1.className = "col-form-label text-sm-right font-weight-semibold ml-1";
                        _spRadioBoxLabelLn1.innerHTML = "Manufacturer";
                        _spCell.appendChild(_spRadioBoxLabelLn1);

                        _spCell = _spTableRowRadioBox.insertCell();
                        const _spRadioBoxLn2 = document.createElement("input");
                        _spRadioBoxLn2.setAttribute("type", "radio");
                        _spRadioBoxLn2.name = _spTableRowRadioBox.id + "_checkbox10";
                        _spRadioBoxLn2.id = _spTableRowRadioBox.id + "_checkbox10_1";
                        _spRadioBoxLn2.setAttribute("onclick", "selectCallback(this.id)");
                        _spRadioBoxLn2.setAttribute("value", "0");
                        _spCell.appendChild(_spRadioBoxLn2);

                        var _spRadioBoxLabelLn2 = document.createElement("label");
                        _spRadioBoxLabelLn2.className = "col-form-label text-sm-right font-weight-semibold ml-1";
                        _spRadioBoxLabelLn2.innerHTML = "Trader/Stockist";
                        _spCell.appendChild(_spRadioBoxLabelLn2);

                        // Sağ tarfa bosluk koyalım
                        for (var i = 1; i <= 7; i++) {
                            _spTableRowRadioBox.insertCell();
                        }
                    }
                }
                //CheckBoxEkleme
                var addCheckBox = false;
                var _spTableRowCheckBox = _spTable.insertRow();
                _spTableRowCheckBox.id = "spc_" + _tmpId;
                if (_backgroundColor)
                    _spTableRowCheckBox.className = "wisebuy-table-tr";
                var checkboxTexId = "";

                // Sol tarfa bosluk koyalım
                _spTableRowCheckBox.insertCell();
                var _lineCounter = 0;
                for (var i = 11; i <= 20; i++) {
                    addCheckBox = false;
                    var checkbox = "checkbox" + i;
                    var checked = false;
                    var checkboxPlaceHolder = "";
                    if (checkbox in datas) {
                        switch (i) {
                            case 11:
                                checkboxPlaceHolder = datas.textbox11;
                                checked = datas.checkbox11;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 12:
                                checkboxPlaceHolder = datas.textbox12;
                                checked = datas.checkbox12;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 13:
                                checkboxPlaceHolder = datas.textbox13;
                                checked = datas.checkbox13;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 14:
                                checkboxPlaceHolder = datas.textbox14;
                                checked = datas.checkbox14;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 15:
                                checkboxPlaceHolder = datas.textbox15;
                                checked = datas.checkbox15;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 16:
                                checkboxPlaceHolder = datas.textbox16;
                                checked = datas.checkbox16;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 17:
                                checkboxPlaceHolder = datas.textbox17;
                                checked = datas.checkbox17;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 18:
                                checkboxPlaceHolder = datas.textbox18;
                                checked = datas.checkbox18;
                                if (checked != null)
                                    addCheckBox = true;
                                break;
                            case 19:
                                checkboxPlaceHolder = datas.textbox19;
                                checked = datas.checkbox19;
                                checkboxTexId = _spTableRowCheckBox.id + "_" + checkbox + "_text";
                                //other
                                checkboxPlaceHolder = datas.textbox20;
                                if (checked != null)
                                    addCheckBox = true;
                                break;

                        }

                        //INPUT olusutruldu
                        if (addCheckBox) {
                            var _spChecBboxLabel = document.createElement("label");
                            _spChecBboxLabel.className = "col-form-label text-sm-right font-weight-semibold ml-1";
                            _spChecBboxLabel.innerHTML = checkboxPlaceHolder;

                            const _spCehckbox = document.createElement("input");
                            _spCehckbox.setAttribute("type", "checkbox");
                            _spCehckbox.id = _spTableRowCheckBox.id + "_" + checkbox;
                            _spCehckbox.name = _spCehckbox.id;

                            _spCehckbox.setAttribute("onclick", "selectCallback(this.id)");
                            //_spCehckbox.setAttribute("onclick", "selectCallback(" + _spCehckbox.name + ")");
                            _spCehckbox.setAttribute("value", "0");

                            if (!checked)
                                _spCehckbox.style = "display: none;";

                            var _spTableRowCell = _spTableRowCheckBox.insertCell();
                            _spTableRowCell.appendChild(_spCehckbox);
                            _spTableRowCell.appendChild(_spChecBboxLabel);
                            _lineCounter++

                            //Other
                            if (i == 19) {
                                const _spInput = document.createElement("input");
                                _spInput.className = "form-control ml-1";
                                _spInput.name = checkboxTexId;
                                _spInput.id = _spInput.name;
                                _spInput.autocomplete = "off";
                                _spInput.style = "display: none;";

                                if (checkboxPlaceHolder != null)
                                    _spInput.placeholder = checkboxPlaceHolder;
                                var _spTableRowCell = _spTableRowCheckBox.insertCell();
                                _spTableRowCell.appendChild(_spInput)
                                _lineCounter++

                            }
                        }
                    }
                }

                for (var i = _lineCounter; i <= 10; i++) {
                    _spTableRowCheckBox.insertCell();
                }

                //Texbox ekleme
                _lineCounter = 0;
                var _spTableRowTexbox = _spTable.insertRow();
                _spTableRowTexbox.id = "spt_" + _tmpId;
                if (_backgroundColor)
                    _spTableRowTexbox.className = "wisebuy-table-tr";
                // Sol tarfa bosluk koyalım
                _spTableRowTexbox.insertCell();

                for (var i = 1; i < 10; i++) {
                    var addTexBox = false;
                    var checkbox = "checkbox" + i;
                    var checked = false;
                    var checkboxPlaceHolder = "";
                    if (checkbox in datas) {
                        switch (i) {
                            case 1:
                                checkboxPlaceHolder = datas.textbox1;
                                checked = datas.checkbox1;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 2:
                                checkboxPlaceHolder = datas.textbox2;
                                checked = datas.checkbox2;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 3:
                                checkboxPlaceHolder = datas.textbox3;
                                checked = datas.checkbox3;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 4:
                                checkboxPlaceHolder = datas.textbox4;
                                checked = datas.checkbox4;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 5:
                                checkboxPlaceHolder = datas.textbox5;
                                checked = datas.checkbox5;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 6:
                                checkboxPlaceHolder = datas.textbox6;
                                checked = datas.checkbox6;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 7:
                                checkboxPlaceHolder = datas.textbox7;
                                checked = datas.checkbox7;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 8:
                                checkboxPlaceHolder = datas.textbox8;
                                checked = datas.checkbox8;
                                if (checked != null)
                                    addTexBox = true;
                                break;
                            case 9:
                                checkboxPlaceHolder = datas.textbox9;
                                checked = datas.checkbox9;
                                if (checked != null)
                                    addTexBox = true;
                                break;

                        }

                        //INPUT olusutruldu
                        if (addTexBox) {
                            const _spInput = document.createElement("input");
                            _spInput.className = "form-control";
                            _spInput.name = _spTableRowTexbox.id + "_" + checkbox;
                            _spInput.id = _spInput.name;
                            _spInput.autocomplete = "off";
                            _spInput.setAttribute("type", "number");
                            _spInput.setAttribute("step", "0.01");

                            if (!checked)
                                _spInput.style = "display: none;";

                            if (checkboxPlaceHolder != null)
                                _spInput.placeholder = checkboxPlaceHolder;
                            var _spTableRowCell = _spTableRowTexbox.insertCell();
                            _spTableRowCell.appendChild(_spInput)
                            _lineCounter++
                            //_spTableRowTexbox.insertCell(_spTableRowCell);
                        }
                    }

                }

                for (var i = _lineCounter; i <= 10; i++) {
                    _spTableRowTexbox.insertCell();
                }
                if (_lineCounter > 0) {
                    var _spTableRowBlanked = _spTable.insertRow();
                    _spTableRowBlanked.id = "spb_" + _tmpId;
                }

                _spMainDiv.appendChild(_spTable);
                //TR background Color için ayarlandı.
                if (_lineCounter > 0) {
                    if (_backgroundColor)
                        _backgroundColor = false;
                    else
                        _backgroundColor = true;
                }
            }
        }
    }
    return _spMainDiv;

}
