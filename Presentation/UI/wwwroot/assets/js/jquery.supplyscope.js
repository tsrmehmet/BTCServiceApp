function SupplyScopeDetailCreate(datas, ids) {

    var _backgroundColor = true;
    var _headerId = "";
    var _headerDesc = "";

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


    for (var i = 0; i < datas.recordsTotal; i++) {
        if (datas.data[i] != null) {
            var data = datas.data[i];
            _insertHeader = true;
            _headerDesc = data.name;
            _headerId = data.id;
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

        var _tmpId = datas.id;
        var result = ids.find(element => element == _tmpId);
        if (result != undefined) {
            var _spDivHeaderId = 'spDiv_' + _headerId;
            var _spDiv = document.getElementById(_spDivHeaderId);

            if (_spDiv == null) {
                _spDiv = document.createElement('div');
                _spDiv.className = 'card ml-2';
                _spDiv.style = 'max-width: 98%;';
                _spDiv.id = _spDivHeaderId;

                var _LabelId = _spDivHeaderId + '_h51';
                const _sprLabel = document.createElement('h5');
                _sprLabel.className = 'wisebuy-h5-header5 ml-1';
                _sprLabel.textContent = _headerDesc;
                _sprLabel.id = _LabelId;

                _spDiv.appendChild(_sprLabel);

            }

            var _sprParentDivId = "sprPrntDiv_" + datas.parentId;
            var _sprParentDiv = document.getElementById(_sprParentDivId);
            if (_sprParentDiv == null) {

                _sprParentDiv = document.createElement('div');
                _sprParentDiv.className = 'ml-3';
                _sprParentDiv.id = _sprParentDivId;

                _LabelId = _sprParentDivId + '_h52';
                const _sprLabel = document.createElement('h5');
                _sprLabel.className = 'wisebuy-h5-header4 bg-light';
                _sprLabel.textContent = datas.parentName;
                _sprLabel.id = _LabelId;

                _sprParentDiv.appendChild(_sprLabel);

                _spDiv.appendChild(_sprParentDiv);
            }

            var _spCell;
            var _sptMain = _tmpId + "_tbl";
            var _spTable = document.getElementById(_sptMain);

            if (_spTable == null) {

                //_spMainDiv = document.createElement("div");
                //_spMainDiv.className = "form-group row";

                _spTable = document.createElement("table");
                _spTable.id = _sptMain;
                _spTable.className = "ml-3";
                _spTable.setAttribute("data-toggle", "table")

                _sprParentDiv.appendChild(_spTable);

                _spDiv.appendChild(_sprParentDiv);

            }


            var _sptRowId = 'r1_' + _tmpId;
            var _spTableRow_1 = document.getElementById(_sptRowId);
            if (_spTableRow_1 == null) {
                _spTableRow_1 = _spTable.insertRow();
                _spTableRow_1.id = _sptRowId;
                _spTableRow_1.style = 'border-top:1px solid rgba(0,0,0,.125);';

                var _LabelId = _sptRowId + '_l1';
                const _sprLabel = document.createElement('label');
                _sprLabel.className = 'col-form-label text-sm-left font-weight-semibold ml-1';
                _sprLabel.textContent = datas.name;
                _sprLabel.id = _LabelId;


                //add label
                _spCell = _spTableRow_1.insertCell();
                _spCell.style = 'width:320px';
                _spCell.appendChild(_sprLabel);
                //_sprDiv.appendChild(_sprLabel);

                var _RadioBoxId = _sptRowId + '_checkbox10';
                const _sprRadioBox0 = document.createElement("input");
                _sprRadioBox0.setAttribute("type", "radio");
                _sprRadioBox0.name = _RadioBoxId;
                _sprRadioBox0.id = _RadioBoxId + '_0';
                _sprRadioBox0.value = '0';
                _sprRadioBox0.setAttribute('onclick', 'checkedCallback("' + _RadioBoxId + '",this.value)');
                _sprRadioBox0.setAttribute('checked', '1');
                _sprRadioBox0.className = 'ml-2';

                //add radio box
                //_sprDiv.appendChild(_sprRadioBox0);

                var _rboxLabelId = _RadioBoxId + '_c1';
                const _sprLabelrbox1 = document.createElement('label');
                _sprLabelrbox1.className = 'col-form-label text-sm-right font-weight-semibold ml-1';
                _sprLabelrbox1.textContent = 'Manufacturer';
                _sprLabelrbox1.id = _rboxLabelId;

                //add label
                _spCell = _spTableRow_1.insertCell();
                _spCell.appendChild(_sprRadioBox0);
                _spCell.appendChild(_sprLabelrbox1);
                //_sprDiv.appendChild(_sprLabelrbox1);


                const _sprRadioBox1 = document.createElement('input');
                _sprRadioBox1.setAttribute('type', 'radio');
                _sprRadioBox1.name = _RadioBoxId;
                _sprRadioBox1.id = _RadioBoxId + '_1';
                _sprRadioBox1.value = '1';
                _sprRadioBox1.setAttribute('onclick', 'checkedCallback("' + _RadioBoxId + '",this.value)');
                _sprRadioBox1.className = 'ml-2';

                //add radio box
                //_sprDiv.appendChild(_sprRadioBox1);

                _rboxLabelId = _RadioBoxId + '_c2';
                const _sprLabelrbox2 = document.createElement('label');
                _sprLabelrbox2.className = 'col-form-label text-sm-right font-weight-semibold ml-1';
                _sprLabelrbox2.textContent = 'Trader/Stockist';
                _sprLabelrbox2.id = _rboxLabelId;

                //add label
                _spCell = _spTableRow_1.insertCell();
                _spCell.appendChild(_sprRadioBox1);
                _spCell.appendChild(_sprLabelrbox2);
                //_sprDiv.appendChild(_sprLabelrbox2);

                const _sprInput1 = document.createElement('input');
                _sprInput1.className = 'form-control';
                _sprInput1.id = _RadioBoxId + '_value';
                _sprInput1.autocomplete = 'off';
                _sprInput1.setAttribute('type', 'number');
                _sprInput1.value = '0';
                _sprInput1.style = 'display:none';
                _sprInput1.className = 'ml-1';
                //add Radiobox10 value
                //_sprDiv.appendChild(_sprInput1);
                _spCell = _spTableRow_1.insertCell();
                _spCell.appendChild(_sprInput1);

                const _sprInput2 = document.createElement('input');
                _sprInput2.className = 'form-control';
                _sprInput2.id = _sptRowId + '_status';
                _sprInput2.autocomplete = 'off';
                _sprInput2.setAttribute('type', 'number');
                _sprInput2.value = '1';
                _sprInput2.style = 'display:none';
                _sprInput2.className = 'ml-1';
                //add add/delete status
                //_sprDiv.appendChild(_sprInput2);
                _spCell = _spTableRow_1.insertCell();
                _spCell.appendChild(_sprInput2);

                const _sprInput3 = document.createElement('input');
                _sprInput3.className = 'form-control';
                _sprInput3.id = _sptRowId + '_parentid';
                _sprInput3.autocomplete = 'off';
                _sprInput3.value = _spDivHeaderId;
                _sprInput3.style = 'display:none';
                _sprInput3.className = 'ml-1';

                //add parentid value
                _spCell = _spTableRow_1.insertCell();
                _spCell.appendChild(_sprInput3);
                //_sprDiv.appendChild(_sprInput3);


                //_sprParentDiv.appendChild(_sprDiv);

                // Sağ tarfa bosluk koyalım
                for (var i = 1; i <= 2; i++) {
                    _spTableRow_1.insertCell();
                }
            }



            // add checkbox
            var _counterCheckBox = 0;
            var _otherColumId = 0;
            var _otherCheckboxId;
            _sptRowId = 'r2_' + _tmpId;
            var _spTableRow_2 = document.getElementById(_sptRowId);
            if (_spTableRow_2 == null) {
                _spTableRow_2 = _spTable.insertRow();
                _spTableRow_2.id = _sptRowId;

                //blanks cell
                _spCell = _spTableRow_2.insertCell();
                _spCell.style = 'width:320px';

                // checkbox11
                var _check = datas.checkbox11;
                var _innerHTML = datas.textbox11;
                var _checkName = _sptRowId + '_checkbox11';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox12
                var _check = datas.checkbox12;
                var _innerHTML = datas.textbox12;
                var _checkName = _sptRowId + '_checkbox12';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox13
                var _check = datas.checkbox13;
                var _innerHTML = datas.textbox13;
                var _checkName = _sptRowId + '_checkbox13';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox14
                var _check = datas.checkbox14;
                var _innerHTML = datas.textbox14;
                var _checkName = _sptRowId + '_checkbox14';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox15
                var _check = datas.checkbox15;
                var _innerHTML = datas.textbox15;
                var _checkName = _sptRowId + '_checkbox15';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox16
                var _check = datas.checkbox16;
                var _innerHTML = datas.textbox16;
                var _checkName = _sptRowId + '_checkbox16';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox17
                var _check = datas.checkbox17;
                var _innerHTML = datas.textbox17;
                var _checkName = _sptRowId + '_checkbox17';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox18
                var _check = datas.checkbox18;
                var _innerHTML = datas.textbox18;
                var _checkName = _sptRowId + '_checkbox18';
                if (_check) {

                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'selectCallback(this.id)');
                    _spCehckbox.setAttribute('value', '0');


                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;

                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _serpDivR2Add = true;

                }

                // checkbox19
                _check = datas.checkbox19;
                _innerHTML = datas.textbox19;
                _checkName = _sptRowId + '_checkbox19';
                if (_check) {
                    _otherCheckboxId = _sptRowId + '_textbox19';
                    const _spCehckbox = document.createElement('input');
                    _spCehckbox.setAttribute('type', 'checkbox');
                    _spCehckbox.id = _checkName;
                    _spCehckbox.setAttribute('onclick', 'checkedShowHide("' + _sptRowId + '")');
                    _spCehckbox.setAttribute('value', '0');
                    _spCehckbox.className = 'ml-1';

                    //_sprCBoxDiv.appendChild(_spCehckbox);

                    var _spChecBboxLabel = document.createElement('label');
                    _spChecBboxLabel.className = 'col-form-label text-sm-right font-weight-semibold ml-2';
                    _spChecBboxLabel.innerHTML = _innerHTML;


                    //Other value
                    _innerHTML = datas.textbox20;
                    _textName = _otherCheckboxId;


                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    //_spInputText.setAttribute("type", "number");
                    //_spInputText.setAttribute("step", "0.01");
                    _spInputText.setAttribute("disabled", '');
                    _spInputText.className = 'ml-1 mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;


                    //_sprCBoxDiv.appendChild(_spChecBboxLabel);
                    _counterCheckBox++;
                    _spCell = _spTableRow_2.insertCell();
                    _spCell.appendChild(_spCehckbox);
                    _spCell.appendChild(_spChecBboxLabel);
                    _spCell.appendChild(_spInputText);
                    _serpDivR2Add = true;


                }


            }



            //add textbox
            var _counterTextkBox = 0;
            _sptRowId = 'r3_' + _tmpId;
            var _spTableRow_3 = document.getElementById(_sptRowId);
            if (_spTableRow_3 == null) {
                _spTableRow_3 = _spTable.insertRow();
                _spTableRow_3.id = _sptRowId;

                //blanks cell
                _spCell = _spTableRow_3.insertCell();
                _spCell.style = 'width:320px';

                // checkbox1
                var _check = datas.checkbox1;
                var _innerHTML = datas.textbox1;
                var _textName = _sptRowId + '_textbox1';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }

                // checkbox2
                _check = datas.checkbox2;
                _innerHTML = datas.textbox2;
                _textName = _sptRowId + '_textbox2';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }

                // checkbox3
                _check = datas.checkbox3;
                _innerHTML = datas.textbox3;
                _textName = _sptRowId + '_textbox3';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }

                // checkbox4
                _check = datas.checkbox4;
                _innerHTML = datas.textbox4;
                _textName = _sptRowId + '_textbox4';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }

                // checkbox5
                _check = datas.checkbox5;
                _innerHTML = datas.textbox5;
                _textName = _sptRowId + '_textbox5';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }

                // checkbox6
                _check = datas.checkbox6;
                _innerHTML = datas.textbox6;
                _textName = _sptRowId + '_textbox6';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }

                // checkbox7
                _check = datas.checkbox7;
                _innerHTML = datas.textbox7;
                _textName = _sptRowId + '_textbox7';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }

                // checkbox8
                _check = datas.checkbox8;
                _innerHTML = datas.textbox8;
                _textName = _sptRowId + '_textbox8';
                if (_check) {

                    const _spInputText = document.createElement("input");
                    _spInputText.className = "form-control";
                    _spInputText.id = _textName;
                    _spInputText.autocomplete = "off";
                    _spInputText.setAttribute("type", "number");
                    _spInputText.setAttribute("step", "0.01");
                    _spInputText.className = 'mw-100';

                    if (_innerHTML != null)
                        _spInputText.placeholder = _innerHTML;

                    //_sprTBoxDiv.appendChild(_spInputText);
                    _counterTextkBox++;
                    _spCell = _spTableRow_3.insertCell();
                    _spCell.appendChild(_spInputText);
                    _serpDivR3Add = true;

                }



            }

            _sptRowId = 'r_4' + _tmpId;
            var _spTableRow_4 = document.getElementById(_sptRowId);
            if (_spTableRow_4 == null) {
                _spTableRow_4 = _spTable.insertRow();
                _spTableRow_4.id = _sptRowId;

                //blanks cell
                _spCell = _spTableRow_4.insertCell();
                _spCell.style = 'width:320px; height:25px';
                
            }


            _spMainDiv.appendChild(_spDiv);
        }


    }
    return _spMainDiv;

}

function setShowHideDiv(datas) {
    var _sprDiv1 = document.getElementById('SelectedSupplyScopeIds');
    //var _ids = $('#selectedSupplyScopeIds').val().split(",");
    var _ids = _sprDiv1.value.split(",");

    for (i = 1, l = datas.recordsTotal; i <= l; i++) {

        var result = _ids.find(element => element == i);
        if (result == undefined) {
            var _spTbl = document.getElementById(i + '_tbl');
            if (_spTbl != null) {
                var _spTblStatus = document.getElementById('r1_' + i + '_status');
                _spTblStatus.value = '0';
                _spTbl.style = 'display:none';
            }

        } else {

            var _spTbl = document.getElementById(i + '_tbl');
            if (_spTbl != null) {
                var _spTblStatus = document.getElementById('r1_' + i + '_status');
                _spTblStatus.value = '1';
                _spTbl.style = 'display:block';
            }

        }


    }

    for (var i = 0; i < datas.recordsTotal; i++) {
        if (datas.data[i] != null) {
            var data = datas.data[i];
            var _showParent = false;
            if ("children" in data && data.children != null && data.children.length > 0) {
                for (var i2 = 0; i2 < data.children.length; i2++) {
                    var dataChildren = data.children[i2];
                    var _showChildren = false;
                    if (dataChildren != null) {
                        if ("children" in dataChildren && dataChildren.children != null && dataChildren.children.length > 0) {
                            //_headerDescL1 = _headerDescL1 + "/" + dataChildren.name;
                            for (var i3 = 0; i3 < dataChildren.children.length; i3++) {
                                var dataChildren2 = dataChildren.children[i3];
                                if (dataChildren2 != null) {
                                    if ("children" in dataChildren2 && dataChildren2.children != null && dataChildren2.children.length > 0) {

                                    } else {
                                        //createSupplyScopeDetail(dataChildren2);
                                        var _sprDivStatus = document.getElementById('r1_' + dataChildren2.id + '_status');
                                        if (_sprDivStatus != null && _sprDivStatus.value == '1')
                                            _showChildren = true;
                                    }

                                }
                            }

                        } else {
                            //createSupplyScopeDetail(dataChildren);
                            var _sprDivStatus = document.getElementById('r1_' + dataChildren.id + '_status');
                            if (_sprDivStatus != null && _sprDivStatus.value == '1')
                                _showChildren = true;
                        }

                        //sprPrntDiv_2
                        if (!_showChildren) {
                            var _sprDivStatus = document.getElementById('sprPrntDiv_' + dataChildren.id);
                            if (_sprDivStatus != null)
                                _sprDivStatus.style = 'display:none';
                        } else {
                            _showParent = true;
                            var _sprDivStatus = document.getElementById('sprPrntDiv_' + dataChildren.id);
                            if (_sprDivStatus != null)
                                _sprDivStatus.style = 'display:block';
                        }


                    }
                }
            }

            if (!_showParent) {
                var _sprDivStatus = document.getElementById('spDiv_' + data.id);
                if (_sprDivStatus != null)
                    _sprDivStatus.style = 'display:none';
            } else {
                var _sprDivStatus = document.getElementById('spDiv_' + data.id);
                if (_sprDivStatus != null)
                    _sprDivStatus.style = 'display:block';
            }

        }
    }

}