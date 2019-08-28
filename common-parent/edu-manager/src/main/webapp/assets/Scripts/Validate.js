/**********************************************************************************************
 *
 *   脚本用途：用于检验页面上需要验证的表单
 *   注意事项：本函数只能在引入jquery的基础上才能有效，且只适用于salesPas项目，没有通用性
 *
 *   修改时间：2013.01.14
 *   修改时间：2013.04.01
 *   修改时间：2013.09.04
 *
 ***********************************************************************************************************/
var bool = 'true';
var Validate = (function () {

    //定义所有的错误时的提示信息
    var tipInformation = {
        floatNumber: '只能输入正数',
        pNfloatNumber: '不是数字',
        integerNumber: '只能输入正整数',
        pNintegerNumber: '只能输入整数',
        onlyNumber: '只能输入数字',
        moneyNumber:'货币格式错误',
        email: '邮箱格式错误',
        identify: '身份证号码错误',
        postalCode: '邮政编码错误',
        phoneNumber: '电话号码错误',
        faxNumber: '传真号码错误',
        dataOrTime: '时间格式错误',
        timeError: '结束时间不能小于开始时间',
        blankInput: '不能有太多空格',
        noZero: '不能为零',
        noCurrentTime: '超出了今天时间',
        small100: '只能输入0到100之间的数',
        specialCharInput: '不能有特殊字符@#$....',
        small1: '只能输入0到1之间的数',
        onlyChinese: '只能输入中文',
        largest250: '最多250个字',
        currentTime: '不能小于今日日期',
        mustLarger0: '必须大于0',
        httpError: '连接地址格式错误!',
        hasNotChinese: '不能有中文'
    },

    //定义所有验证要用到的正则表达式
    regeExp = {
        identityCode: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}x)$/i, //身份证
        phoneNumber: /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[358]\d{9})$)/, //手机或电话号码     
        postalCode: /^[1-9][0-9]{5}$/, //邮政编码       
        faxNumber: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/, //传真       
        email: /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/, //电子邮箱        
        floatNumber: /^([\+]?\d{0,12}\.?\d+|10\.?\d+)$/, //小数   
        pNfloatNumber: /^([\-\+]?\d{0,12}\.?\d+|10\.?\d+)$/, //小数
        integerNumber: /^[\+]?\d+$/, //正整数
        pNintegerNumber: /^[\-\+]?\d+$/, //整数(包括正整数和负整数)
        onlyNumber: /(^[\-\+]?\d+\.?\d*$)|(^\.?\d+?$)/,///^[\-\+]?(([0-9]+)([\.\,]?[0-9]+))?|([\.\,]([0-9]+)?)$/,
        moneyNumber: /^(([\-\+]?\d+)|([1-9][0-9]{0,2}(,[0-9]{3})*)|0?)(\.\d+)?/,
        blankError: /\s+/, //空字符
        specialChar: /[`~#\$\%\^\&\*\+\=\|\{\}\[\]<>￥\—【】]/g,
        onlyChinese: /^[\u2E80-\u9FFF]+$/, //只能是中文
        hasNotChinese: /[\u2E80-\u9FFF]/, //含有中文 
        dataOrTime: /^(([1-9]\d{3})|([1-9]\d{3}\-(0?[1-9]|1[012])\-(0?[1-9]|[12]\d|3[01]))|([1-9]\d{3}\/(0?[1-9]|1[012])\/(0?[1-9]|[12]\d|3[01])))$/,
        http: /[a-zA-z]+:\/\/[^\s]*/
    };


    //@method 点击出理错误信息的表单时删除错误提示
    //@param {Jquery object} 用于检测的表单元素
    //@param {String} 错误信息的html选择器
    function hiderTheErrorInformation(sele, errorInfor) {
        sele.click(function () {
            sele.siblings(errorInfor).fadeOut().remove();
            sele.parent().css({ position: 'static' });
        });
    }

    //@method 出错时给出错误提示信息
    //@param {Jquery object} 用于检测的表单元素
    //@param {String} 错误信息内容
    function appendErrorInformation(selector, information) {
        var $deletErrorInforf = selector.parents('td').find('.numberTipInformation');

        if ($deletErrorInforf.length > 0) {
            $deletErrorInforf.remove();
        }
        var className = selector.attr('data-name') === 'numberTipInformation2' ?
                'numberTipInformation2' : (selector.attr('data-name') === 'numberTipInformation3' ?
                'numberTipInformation3' : 'numberTipInformation');

        //定义出错时的提示内容的宽度
        if (information.length < 10) {
            var errorInformation = '<div class="' + className +
                    ' fix" style="*width:110px;"><span></span><p>' + information + '</P></div>';
        } else {

            var width = information.length < 20 ? information.length * 16 : information.length * 8,
                left = selector.attr('data-name') === 'numberTipInformation2' ?
                width : (selector.attr('data-name') ===
                       'numberTipInformation3' ? (-width + 20) : 5),

                errorInformation = '<div class="' + className + ' fix" style="width: ' +
                        width + 'px;left:' + left + 'px;"><span></span><p>' + information + '</P></div>';
        }

        selector.parent().css({ position: 'relative' }); //为了兼容IE不在样式表里面定义,而是在脚本里面在需要时再定义

        selector.parent().append(errorInformation);

        $('.' + className).fadeIn();

        //当获取焦点时删除错误提示
        hiderTheErrorInformation(selector, 'div.' + className);
    }


    //@method 检测必填项不能为空，如果为空则给出提示
    //@param {Jquery object} 用于检测的表单元素
    function checkRequestNotNull($selectors) {
        //必填项为空时的检测
        for (var a = 0, len = $selectors.length; a < len; a++) {

            var selector = $selectors[a],
                selectorValue = $(selector).val();

            if (selectorValue === null) {
                selectorValue = '';
            }

            if (selectorValue.length == 0) {
                //如果必填项为空时给出的提示
                $(selector).addClass("inputErrorStyle");
                bool = 'false';
            }
        }
    }


    //@method 检测格式是否正确，如果不正确，则给出错误提示
    //@param {Jquery object} 用于检测的表单元素
    //@param {regExp} 要检测的格式化
    //@param {String} 出错时的错误提示信息
    function checkAndTip($selectors, regExp, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val().toLocaleLowerCase();

            if (selectorValue.length > 0 && !regExp.test(selectorValue)) {
                appendErrorInformation($(selector), tipInfor);
                bool = 'false';
            }
        }
    }


    //@method 对于那些输入不能为0的表单，如果输入了0的数值时的检测
    //@param {Jquery object} 用于检测的表单元素
    //@param {String} 出错时的错误提示信息
    function checkNOZero($selectors, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = parseFloat($(selector).val(), 10);

            if (!selectorValue.isNaN() && selectorValue == 0) {
                appendErrorInformation($(selector), tipInfor);
                bool = 'false';
            }
        }
    }


    //@method 检测开始时间是否大于结束时间,如果大于结束时间，则给出信息提示
    //@param {Jquery object} 开始时间的表单元素
    //@param {Jquery object} 结束时间表单元素
    //@param {String} 出错时的错误提示信息
    function checkStartEndTime($startTimes, $endTimes, tipInfor) {
        if ($startTimes && $startTimes.length != 0) {
            checkAndTip($startTimes, regeExp.dataOrTime, tipInformation.dataOrTime);
        }
        if ($endTimes && $endTimes.length != 0) {
            checkAndTip($endTimes, regeExp.dataOrTime, tipInformation.dataOrTime);
        }

        if (bool === 'true') {
            for (var j = 0, len = $startTimes.length; j < len; j++) {
                //开始时间
                var startTime = $startTimes[j],
                    startTimeValue = $(startTime).val(),
                    //结束时间
                    endTime = $endTimes[j],
                    endTimesValue = $(endTime).val(),
                    //转换时间的格式把横线转换成斜线
                    valTime1 = (startTimeValue.indexOf('-') != -1) ? startTimeValue.split('-').join('/') : startTimeValue,
                    valTime2 = (endTimesValue.indexOf('-') != -1) ? endTimesValue.split('-').join('/') : endTimesValue;

                //比较开始时间与结束时间
                if (Date.parse(valTime1) > Date.parse(valTime2)) {
                    appendErrorInformation($(endTime), tipInfor);
                    bool = 'false';
                }
            }
        }
    }

    //@method 对于那些输入不能大于100的表单，如果输入了大于100的数值时给出错误提示
    //@param {Jquery object} 用于检测的表单元素
    //@param {String} 出错时的错误提示信息
    function checkLarge100($selectors, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val();

            if (selectorValue.length > 0 && (parseFloat(selectorValue) < 0 || parseFloat(selectorValue) > 100)) {
                appendErrorInformation($(selector), tipInfor);
                bool = 'false';
            }
        }
    }

    //@method 对于那些输入不能小于或等于0的表单，如果输入了小于或等于0的数值时给出错误提示
    //@param {Jquery object} 用于检测的表单元素
    //@param {String} 出错时的错误提示信息
    function checkSmall0($selectors, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val();

            if (selectorValue.length > 0 && parseFloat(selectorValue) <= 0) {
                appendErrorInformation($(selector), tipInfor);
                bool = 'false';
            }
        }
    }

    //@method 对于那些输入不能大于1的表单，如果输入了大于1的数值时给出错误提示
    //@param {Jquery object} 用于检测的表单元素
    //@param {regExp} 要检测的格式化
    //@param {String} 出错时的错误提示信息
    function checkLarge1($selectors, regExp, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val();

            if (selectorValue.length > 0 && (parseFloat(selectorValue) < 0 ||
                parseFloat(selectorValue) > 1) && (regExp.test(selectorValue))) {
                appendErrorInformation($(selector), tipInfor);
                bool = 'false';
            }
        }
    }

    //@method 不能含有中文检测
    //@param {Jquery object} 用于检测的表单元素
    //@param {regExp} 要检测的格式化
    //@param {String} 出错时的错误提示信息
    function checkAndTipNo($selectors, regExp, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val();

            if (selectorValue.length > 0 && regExp.test(selectorValue)) {
                appendErrorInformation($(selector), tipInfor);
                bool = 'false';
            }
        }

    }

    //@method 对于文本域,最多只能输入250个字符，当输入超过最大长度时提示错误信息
    //@param {Jquery object} 用于检测的表单元素
    //@param {String} 出错时的错误提示信息
    function checkTextArea($selectors, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val();

            if (selectorValue.length > 250) {
                appendErrorInformation($(selector), tipInfor);
                bool = 'false';
            }
        }
    }

    //@method 检测小数的位数
    //@param {Jquery object} 用于检测的表单元素
    //@param {regExp} 要检测的格式化
    function checkFloatNumber($selectors, regExp) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val();

            if (selectorValue.length > 0) {
                if (regExp.test(selectorValue)) {

                    //去掉小数前面的+号或-号(如果有)
                    var trueValue = selectorValue.indexOf('+') !== -1 ? selectorValue.substring(1) : selectorValue.indexOf('-') !== -1 ? selectorValue.substring(1) : selectorValue;

                    //输入的格式正确时看是否有小数点
                    //如果有小数点
                    if (trueValue.indexOf('.') !== -1) {
                        var nPart = trueValue.split('.')[0], //整数部分
                        pPart = trueValue.split('.')[1], //小数部分
                        dataNumber = $(selector).attr('data-number');

                        if (dataNumber) {
                            if (nPart.length > 8) {
                                appendErrorInformation($(selector), '不能超过8位整数');
                                bool = 'false';
                            } else if (pPart.length > 4) {
                                appendErrorInformation($(selector), '最多四位小数');
                                bool = 'false';
                            }
                        } else {

                            if (nPart == 0 && nPart.length > 1) {
                                appendErrorInformation($(selector), '输入错误');
                                bool = 'false';
                            }
                            if (nPart.length > 8) {
                                appendErrorInformation($(selector), '不能超过8位整数');
                                bool = 'false';
                            } else if (pPart.length > 2) {
                                appendErrorInformation($(selector), '最多两位小数');
                                bool = 'false';
                            }
                        }
                        //如果没有小数点
                    } else {
                        if (trueValue == 0 && trueValue.length > 1) {
                            appendErrorInformation($(selector), '输入错误');
                            bool = 'false';
                        } else if (trueValue.length > 8) {
                            appendErrorInformation($(selector), '不能超过8位整数');
                            bool = 'false';
                        }
                    }
                } else if (!regExp.test(selectorValue)) {
                    appendErrorInformation($(selector), '只能输入正数');
                    bool = 'false';
                }
            }

        }
    }

    //@method 检查整数
    //@param {Jquery object} 用于检测的表单元素
    //@param {regExp} 要检测的格式化
    function checkInterger($selectors, regExp) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val();

            if (selectorValue.length > 0 && !regExp.test(selectorValue)) {
                appendErrorInformation($(selector), '只能输入正整数');
                bool = 'false';
            } else if (selectorValue.length > 0 && regExp.test(selectorValue)) {
                if (selectorValue < -2147483648 || selectorValue > 2147483648) {
                    appendErrorInformation($(selector), '输入超出范围');
                    bool = 'false';
                }
            }
        }
    }

    //@method 于输入时间小于当前系统时间时给出提示
    //@param {Jquery object} 用于检测的表单元素
    //@param {String} 出错时的错误提示信息
    function checkCurrentTime($selectors, tipInfor) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var current = $selectors[i],
                currentTime = $(current).val(), //输入表单的日期
                currentYear = (new Date()).getFullYear(), //当前年分
                currentMonth = (new Date()).getMonth() + 1, //当前月分
                currentDate = (new Date()).getDate(); //当前日

            var currentData = currentYear.toString() + '/' + currentMonth.toString() + '/' + currentDate.toString(); //格式化后的当前日期
            //转换时间的格式把横线转换成斜线
            currentTime = currentTime.indexOf('-') !== -1 ? currentTime.split('-').join('/') : currentTime;

            if (Date.parse(currentTime) < Date.parse(currentData)) {
                appendErrorInformation($(current), tipInfor);
                bool = 'false';
            } else {
                bool = 'true';
            }
        }
    }


    //@method 验证文件上传表单上传的文件格式是否符合要求
    //@param {Jquery object} 用于检测的表单元素
    function checkFileType($selectors) {
        for (var i = 0, len = $selectors.length; i < len; i++) {
            var selector = $selectors[i],
                selectorValue = $(selector).val(),
                dataType = $.trim($(selector).attr('data-fileType')), //获取系统允许上传的文件格式
                dataTypes = dataType.substring(1, dataType.length - 1).toLocaleLowerCase(); //格式化

            //判断上传的路径是否是一个合法的后缀
            if (selectorValue.lastIndexOf('.') !== -1) {
                var uploadType = selectorValue.substring(selectorValue.lastIndexOf('.')).toLocaleLowerCase();

                if (dataTypes.indexOf(uploadType) === -1) {
                    appendErrorInformation($(selector), '只支持[' + dataTypes + ']类型的文件');
                    bool = 'false';
                } else {
                    bool = 'true';
                }
            }
        }
    }


    //@method 获取某个上下文内的所有要验证的表单元素
    //@param {Jquery object} 上下文对象
    function definedValidate(context) {
        return {

            //常规格式
            $requests: $('.request', context), //验证必填项
            $identifys: $('input.identifyCode', context), //身份证
            $phones: $('input.phoneNumber', context), //电话号码或手机号码
            $posts: $('input.postalCoder', context), //邮政编码
            $faxs: $('input.faxNumber', context), //传真
            $emails: $('input.email', context), //电子邮箱

            //与数字有关的格式
            $floats: $('input.floatNumber', context), //正小数
            $pNfloats: $('input.pNfloatNumber', context), //小数(包括正数和负数)
            $integers: $('input.integerNumber', context), //正整数
            $pNintegers: $('input.pNintegerNumber', context), //整数(包括正数和负数)
            $onlyNumber: $('input.onlyNumber', context), //数字(包括小数和整数，也包括正数和负数)
            $moneyNumber: $('input.moneyNumber', context), //数字(包括小数和整数，也包括正数和负数)
            $noZeros: $('input.noZero', context), //不能为0
            $small0s: $('input.larger0', context), //大于0
            $small1s: $('input.small1', context), // 小于1
            $small100s: $('input.small100', context), // 小于100

            //与日期有关的格式
            $datetimes: $('input.datetime', context), //日期格式
            $startTime: $('input.startDateTime', context), //开始时间
            $endTime: $('input.endDateTime', context), //结束时间
            $currentTimes: $('input.leCurrentDate', context), //不大于当前日期
            $currentTimes: $('input.geCurrentDate', context), // 不小于当前日期
            times: (new Date()).valueOf(), //获取到当前系统的格林威治时间

            //与字符有关的格式
            $onlyChinese: $('input.onlyChinese', context), //只能是中文
            $hasNotChinese: $('input.hasNoChinese', context), //不能有中文
            $specialInputs: $('input.specialChar', context), //特殊字符
            //$textAreas: $('textarea', context).not('textarea.importHtml'), //文本域
            $allInputs: $(':input', context), //所有表单
            $fileTypes: $('input.fileType', context),//文件类型
            $https: $('input.http', context)//连接地址
        };
    }

    //@method 验证所有的输入表单
    //@param {Oobject} 当前点击的按钮
    function checkAllInput(idString) {
        /**
         *  获取所有需要验证的表单 
         */
        var context = $('body');
        if (idString) {
            context = $('#' + idString);
        }
        var validate = definedValidate(context);

        //必填项检测
        if (validate.$requests && validate.$requests.length != 0) {
            checkRequestNotNull(validate.$requests);
        }

        //身份证号码检测
        if (validate.$identifys && validate.$identifys.length != 0) {
            checkAndTip(validate.$identifys, regeExp.identityCode, tipInformation.identify);
        }

        //电话号码或手机号码检测
        if (validate.$phones && validate.$phones.length != 0) {
            checkAndTip(validate.$phones, regeExp.phoneNumber, tipInformation.phoneNumber);
        }

        //邮政编码检测
        if (validate.$posts && validate.$posts.length != 0) {
            checkAndTip(validate.$posts, regeExp.postalCode, tipInformation.postalCode);
        }

        //电子邮件检测
        if (validate.$emails && validate.$emails.length != 0) {
            checkAndTip(validate.$emails, regeExp.email, tipInformation.email);
        }

        //传真检测
        if (validate.$faxs && validate.$faxs.length != 0) {
            checkAndTip(validate.$faxs, regeExp.faxNumber, tipInformation.faxNumber);
        }

        //数字检测
        if (validate.$onlyNumber && validate.$onlyNumber.length != 0) {
            checkAndTip(validate.$onlyNumber, regeExp.onlyNumber, tipInformation.onlyNumber);
        }

        //货币格式检测
        if (validate.$moneyNumber && validate.$moneyNumber.length != 0) {
            checkAndTip(validate.$moneyNumber, regeExp.moneyNumber, tipInformation.moneyNumber);
        }

        //小数检测(包括正数和负数)
        if (validate.$pNfloats && validate.$pNfloats.length != 0) {
            checkFloatNumber(validate.$pNfloats, regeExp.pNfloatNumber);
        }

        //小数检测
        if (validate.$floats && validate.$floats.length != 0) {
            checkFloatNumber(validate.$floats, regeExp.floatNumber);
        }

        //整数检测(包括正整数，负整数)
        if (validate.$pNintegers && validate.$pNintegers.length != 0) {
            checkInterger(validate.$pNintegers, regeExp.pNintegerNumber);
        }

        //正整数检测
        if (validate.$integers && validate.$integers.length != 0) {
            checkInterger(validate.$integers, regeExp.integerNumber);
        }

        //日期检测
        if (validate.$datetimes && validate.$datetimes.length != 0) {
            checkAndTip(validate.$datetimes, regeExp.dataOrTime, tipInformation.dataOrTime);
        }

        //不能含有0的检测
        if (validate.$noZeros && validate.$noZeros.length != 0) {
            checkNOZero(validate.$noZeros, tipInformation.noZero);
        }

        //开始时间不能大于结束时间
        if (validate.$startTime && validate.$startTime.length != 0) {
            checkStartEndTime(validate.$startTime, validate.$endTime, tipInformation.timeError);
        }

        //不能大于100
        if (validate.$small100s && validate.$small100s.length != 0) {
            checkLarge100(validate.$small100s, tipInformation.small100);
        }

        //不能大于1
        if (validate.$small1s && validate.$small1s.length != 0) {
            checkLarge1(validate.$small1s, regeExp.onlyNumber, tipInformation.small1);
        }

        //小于等于0的检测
        if (validate.$small0s && validate.$small0s.length != 0) {
            checkSmall0(validate.$small0s, tipInformation.mustLarger0);
        }

        //只能是中文
        if (validate.$onlyChinese && validate.$onlyChinese.length != 0) {
            checkAndTip(validate.$onlyChinese, regeExp.onlyChinese, tipInformation.onlyChinese);
        }

        //不能含有中文
        if (validate.$hasNotChinese && validate.$hasNotChinese.length != 0) {
            checkAndTipNo(validate.$hasNotChinese, regeExp.hasNotChinese, tipInformation.hasNotChinese);
        }

        //不能含有特殊字符
        if (validate.$specialInputs && validate.$specialInputs.length != 0) {
            checkAndTipNo(validate.$specialInputs, regeExp.specialChar, tipInformation.specialCharInput);
        }

        //文本域的输入不能超出250个字
        if (validate.$textAreas && validate.$textAreas.length != 0) {
            checkTextArea(validate.$textAreas, tipInformation.largest250);
        }

        //输入的时间不能小于当前系统时间
        if (validate.$currentTimes && validate.$currentTimes.length != 0) {
            checkCurrentTime(validate.$currentTimes, tipInformation.currentTime);
        }

        //验证文件上传的格式
        if (validate.$fileTypes && validate.$fileTypes.length != 0) {
            checkFileType(validate.$fileTypes);
        }

        //验证连接地址是否正确
        if (validate.$https && validate.$https.length != 0) {

            checkAndTip(validate.$https, regeExp.http, tipInformation.httpError);
        }

        return bool;
    }

    /**
     * 当失去焦点后的处理情况
     */
    function onBlurFun() {
        //必填项
        $('.request').each(function () {
            $(this).focus(function () {
                $(this).removeClass("inputErrorStyle");
            });
        });

        //检查不能有特殊字符
        $('.hasNoSpecialChar').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (regeExp.specialChar.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.specialCharInput);
                    return false;
                }
            });
        });

        //失去焦点后检测身份证
        $('.identifyCode').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.identityCode.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.identify);
                    return false;
                }
            });
        });

        //失去焦点后检测电话号码或手机号码
        $('.phoneNumber').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.phoneNumber.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.phoneNumber);
                    return false;
                }
            });
        });

        //失去焦点后检测邮政编码
        $('.postalCoder').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.postalCode.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.postalCode);
                    return false;
                }
            });
        });

        //失去焦点后检测传真
        $('.faxNumber').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.faxNumber.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.faxNumber);
                    return false;
                }
            });
        });

        //失去焦点后检测电子邮件
        $('.email').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();
                if (selfValue.length > 0 && !regeExp.email.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.email);
                    return false;
                }
            });
        });

        //失去焦点后检测数字
        $('.onlyNumber').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.onlyNumber.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.onlyNumber);
                    return false;
                }
            });
        });

        //失去焦点后检测正小数
        $('.floatNumber').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.floatNumber.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.floatNumber);
                    return false;
                }
            });
        });

        //失去焦点后检测小数(包括正数和负数)
        $('.pNfloatNumber').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();
                if (selfValue.length > 0 && !regeExp.pNfloatNumber.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.pNfloatNumber);
                    return false;
                } else if (selfValue.length > 0 && regeExp.integerNumber.test(selfValue)) {
                    if (selfValue < -2147483648 || selfValue > 2147483647) {
                        appendErrorInformation(self, "输入超出范围");
                        return false;
                    }
                }
            });
        });

        //失去焦点后检测正整数
        $('.integerNumber').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.integerNumber.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.integerNumber);
                    return false;
                } else if (selfValue.length > 0 && regeExp.integerNumber.test(selfValue)) {
                    if (selfValue > 2147483647) {
                        appendErrorInformation(self, "输入超出范围");
                        return false;
                    }
                }
            });
        });

        //失去焦点后检测整数(包括正数和负数)
        $('.pNintegerNumber').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.pNintegerNumber.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.pNintegerNumber);
                    return false;
                }
            });
        });

        //失去焦点后检测开始时间和结束时间
        $('.startDateTime,.endDateTime').each(function () {
            $(this).blur(function () {
                var self = $(this);

                if (self.hasClass('startDateTime')) {
                    var startTime = self,
                        startTimeVal = startTime.val(),
                        endTime = self.parents('td').find('.endDateTime'),
                        endTimeVal = endTime.val(),
                        errorInformation = '开始时间不能大于结束时间';

                } else if (self.hasClass('endDateTime')) {
                    var endTime = self,
                        endTimeVal = endTime.val(),
                        startTime = self.parents('td').find('.startDateTime'),
                        startTimeVal = startTime.val(),
                        errorInformation = '结束时间不能小于开始时间';
                }

                if (startTimeVal.length > 0 && !regeExp.dataOrTime.test(startTimeVal)) {
                    appendErrorInformation(startTime, tipInformation.dataOrTime);
                    return false;
                }
                if (endTimeVal.length > 0 && !regeExp.dataOrTime.test(endTimeVal)) {
                    appendErrorInformation(endTime, tipInformation.dataOrTime);
                    return false;
                }
                //转换时间的格式把横线转换成斜线
                var valTime1 = (startTimeVal.indexOf('-') != -1) ? startTimeVal.split('-').join('/') : startTimeVal,
                    valTime2 = (endTimeVal.indexOf('-') != -1) ? endTimeVal.split('-').join('/') : endTimeVal;

                //比较开始时间与结束时间
                if (Date.parse(valTime1) > Date.parse(valTime2)) {
                    appendErrorInformation(self, errorInformation);

                } else if (Date.parse(valTime1) <= Date.parse(valTime2)) {
                    var $errorInfo = self.parents('td').find('.numberTipInformation');

                    if ($errorInfo.length > 0) {
                        $errorInfo.remove();
                    }
                }
            });
        });

        //失去焦点后检测日期
        $('.datetime').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue.length > 0 && !regeExp.dataOrTime.test(selfValue)) {
                    appendErrorInformation(self, tipInformation.dataOrTime);
                    return false;
                }

            });
        });

        //失去焦点后检测表单输入为能为零
        $('.noZero').each(function () {
            $(this).blur(function () {
                var self = $(this);
                var selfValue = self.val();

                if (selfValue == 0) {
                    appendErrorInformation(self, tipInformation.noZero);
                    return false;
                }
            });
        });

        //失去焦点后检测输入的时间是否小于系统当前时间
        $('.geCurrentDate').each(function () {
            $(this).blur(function () {
                var self = $(this),
                    selfValue = self.val(),
                    //获取当前系统的日期，年/月/日
                    currentYear = (new Date()).getFullYear(),
                    currentMonth = (new Date()).getMonth() + 1,
                    currentDate = (new Date()).getDate(),
                    //将日期格式化为 年/月/日的格式
                    currentData = currentYear.toString() + '/' + currentMonth.toString() + '/' + currentDate.toString();

                //将表单的日期转换格式
                //转换时间的格式把横线转换成斜线
                selfValue = selfValue.indexOf('-') !== -1 ? selfValue.split('-').join('/') : selfValue;

                if (Date.parse(selfValue) > Date.parse(currentDate)) {
                    appendErrorInformation(self, tipInformation.currentTime);
                    return false;
                }
            });
        });
    }

    //返回向外公开的属性和方法
    return {

        //@method 验证页面上所有需要验证的表单
        //@param 当前点击的元素
        ValueInput: function (idString) {

            //验证所需要验证的表单，返回一个布尔值
            var boolen = checkAllInput(idString);

            //当鼠标失去焦点时，对表单进行验证
            onBlurFun();

            if (boolen === 'false') {
                bool = 'true';
                return false;
            } else if (boolen === 'true') {
                bool = 'true';
                return true;
            }
        }
    };
}());
