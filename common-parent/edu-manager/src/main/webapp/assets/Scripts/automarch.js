var automarch = {

    search: function (ctrl) {
        var $ctrl = $("#" + ctrl.id),
            pElement = $ctrl.parent('p'),
            ulHtml = '',
            liHtml = '',
            width = $(ctrl).width() + 3,
            ulStyle = 'position: absolute;width:' + width + 'px;*width:' + (width + 1) + 'px;' +
                        'top: 20px;*top:21px;left: 0;z-index: 100;*z-index: 100;margin-left: 0px;' +
                        'overflow-y:scroll;overflow-x:hidden;background-color: white;' +
                        'border: 1px solid #6699FF;border-top:none;' +
                        'list-tyle: none;*padding-left: 0;';

        $(ctrl).parent("p").css({ position: 'relative' ,zIndex: '100'});

        if (ctrl.value.length > 0) {
            var webservice = "GetCompletionList";
            var entityname = $ctrl.attr("entityname");
            var urlpath = $ctrl.attr("urlpath");
            var displayname = $ctrl.attr("displayname");
            var dealerCd = $('#hdDealerCd').val();

            if (entityname != undefined && displayname != undefined) {
                var argument = "'prefixText':'" + $ctrl.val() + "','dealerCd':'" + dealerCd + "','entityName':'" + entityname + "','displayName':'" + displayname + "'";
                $.ajax({
                    type: "Post",
                    url: urlpath + "/" + webservice,
                    contentType: "application/json;charset=utf-8",
                    data: "{" + argument + "}",
                    dataType: "json",
                    success: function (data) {
                        var datas = data.d.split(',');
                        for (var i = 1, len = datas.length; i < len; i++) {

                            liHtml += '<li title="' + datas[i] + '" style="width: 100%; overflow: hidden; *padding-left: 0;*margin-left: 0; padding-left: 3px;display: block;cursor: pointer;list-style: none;">' + datas[i] + '</li>';

                        }

                        ulHtml += '<ul style="' + ulStyle + '">' + liHtml + '</ul>';

                        if ($(ctrl).siblings("ul").length > 0) {
                            $(ctrl).siblings("ul").remove();
                        }

                        $(ctrl).parent("p").append(ulHtml);

                        if ($(ctrl).siblings("ul").find("li").length == 0) {
                            $(ctrl).siblings("ul").remove();
                        }

                        var ulElement = $(ctrl).siblings("ul");
                        if (ulElement.find("li").length > 10) {
                            ulElement.height("150");
                        } else {
                            ulElement.height(ulElement.find("li:eq(0)").height() * (ulElement.find("li").length));
                        }

                        var $liElement = ulElement.find('li');

                        $liElement.each(function () {
                            $(this).click(function () {
                                automarch.getValue($ctrl, ulElement, $(this).text());
                            });
                        });
                        $(ctrl).blur(function () {

                            if ($liElement.length == 0) {
                                ulElement.remove();
                            }

                            var ctrlValue = $(ctrl).val();

                            for (var i = 1, len = datas.length; i < len; i++) {

                                var compareValue = datas[i];
                                if (ctrlValue == compareValue || ctrlValue == "") {
                                    ulElement.remove();
                                }
                            }
                        });
                    },
                    error: function (err) {
                    }
                });
            }
        }
    },
    getValue: function (inputElement, ulElement, text) {
        inputElement.val(text);
        ulElement.remove();
    }

};

var dropdrownlist = {
    refresh: function (ctrl) {
        $self = $("#" + ctrl.id);
        var ddlid = $self.attr("targetid");
        $target = $('#' + ddlid);
        var webservice = "GetDDLResfreshList";
        var entityname = $self.attr("entityname");
        var urlpath = $self.attr("urlpath");
        var entitycd = $self.attr("entitycd");
        var displayname = $self.attr("displayname");
        var dealerCd = $('#hdDealerCd').val();
        var argument = "'dealerCd':'" + dealerCd + "','entityName':'" + entityname + "','entityCd':'" + entitycd + "','displayName':'" + displayname + "'";
        if (entityname != undefined && displayname != undefined && entitycd != undefined) {
            $.ajax({
                type: "Post",
                url: urlpath+"/" + webservice,
                contentType: "application/json;charset=utf-8",
                data: "{" + argument + "}",
                dataType: "json",
                success: function (data) {
                    var jsonList = $.parseJSON(data.d);
                    if (jsonList.length > 0) {
                        var html = '<option selected="selected" value=""></option>';
                        for (var i = 0; i < jsonList.length; i++) {
                            html += '<option value="' + jsonList[i]["FieldCd"] + '">' + jsonList[i]["FieldName"] + '</option>';
                        }
                        $target.html(html);
                    }
                },
                error: function (err) {
                }
            });
        }
    }
};