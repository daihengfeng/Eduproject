var loginJs = (function (loginJs) {
    //点击记住我的时候切换状态
    loginJs.rememberMe = function (element) {
        var chkDealer = $('#checkDealer'),
            self = $(element);

        if (parseInt(chkDealer.val(), 10) === 1) {
            self.css('backgroundPosition', '-15px -564px');
            chkDealer.val('0');
        } else if (parseInt(chkDealer.val(), 10) === 0) {
            self.css('backgroundPosition', '-15px -590px');
            chkDealer.val('1');
        }
    };

    //当鼠标点击初次文本时，让输入表间获得焦点
    loginJs.label = function (element) {
        $(element).parents("li").find("input").focus();
    };

    //当在表单内输入内容时，让初次文本隐藏
    loginJs.hiddenText = function (element) {
        var self = $(element),
            text = self.val();

        if (text.length > 0) {
            self.parents('li').find('label').fadeOut();

        } else {
            self.parents('li').find('label').fadeIn();
        }

    };

    //检查输入是否为空，并给出提示
    function checkInput(element) {
        var inputElement = $(element),
            tip = $('#errormsg'),
            error = $('div.error_tip p'),
            bool = 1,
            errorInfor = '';

        //如果输入为空时
        if (inputElement.val() === "") {
            error.show();

            tip.text('输入不能为空!');
            inputElement.css('border-color', 'red');
            inputElement.parent('p').after('<p class="tip_icon">x</p>');

            bool = 0;
        }
        return bool;
    }

    //增加等待按钮
    function addWaitIcon() {
        $('#waitingIcon').removeClass('dn');
        $('#btnLogin').val('');
    }

    //移除等待按钮
    function removeWaitIcon() {
        $('#waitingIcon').addClass('dn');
        $('#btnLogin').val('登录');
    }

    //检测表单的输入
    loginJs.checkInputData = function (boolean) {
        var bool = 1,
            dealerCd = checkInput('#dealercd'),
            userid = checkInput('#username'),
            password = checkInput('#password');

        if (boolean) {
            var checkCode = checkInput('#checkcode');
            if (dealerCd == 0 || userid == 0 || checkCode == 0 || password == 0) {
                bool = 0;
            }
        } else {
            if (dealerCd == 0 || userid == 0 || password == 0) {
                bool = 0;
            }
        }
        return bool;
    };

    //根据表单里面是否有内容来隐藏label字段
    loginJs.blurAndFocus = function () {
        var $txtInput = $('#dealercd,#username,#password,#checkcode');

        $txtInput.each(function () {
            var $self = $(this),
                $label = $self.parents('li').find('label'),
                $labelText = $label.text(),
                $inputVal = $self.val();

            //如果表单的输入
            if ($inputVal.length != 0) {
                $label.hide();
            }

            //输入表单获得焦点时的处理
            $self.focus(function () {
                $self.addClass('input_border');

                $('div.error_tip p').hide().find('span.errorInformation').text('');

                $self.css('border-color', '#3366FF');

                $self.parent('p').siblings('.tip_icon').remove();
                //输入表单失去焦点时的处理
            }).blur(function () {

                $self.removeClass('input_border');
                $self.css('border-color', '#B8D0FF');

                if ($(this).val() === '') {
                    $label.fadeIn();
                }
            });
        });
    };

    //当鼠标点击验证码图片时改变图片文本内容
    loginJs.ChangeCodeImg = function () {
        $('#imgcheckcode').attr('src', 'Handlers/ValidateCodeHandler.ashx?t=' + (new Date()).valueOf());
    }

    //页面初次加载时执行的脚本动作
    loginJs.init = function () {
        loginJs.ChangeCodeImg();
        if ($('#checkDealer').val() === 1) {
            $('div.remenber').css('backgroundPosition', '-15px -590px');
        }
        $('#dealercd').focus();
    };

    //点击登录按钮提交表单时对表单的验证
    loginJs.submitPage = function () {
        var checkCheckCode = parseInt($('#checkCheckCode').val(), 10), //是否存在验证码的标志
            checkDealer = $('#checkDealer').val(), //记住我的标志
            dealercd = $('#dealercd').val(), //销售店代码
            userName = $('#username').val(), //用户名
            pass = $('#password').val(), //密码
            checkCode = $('#checkcode').val(), // 验证码
            bool = loginJs.checkInputData(!!checkCheckCode); //对输入是否为空的验证

        if (bool === 0) {
            return false;
        }

        //添加等待图标
        addWaitIcon();

        //设置提交到后台的参数
        var queryString = "dealercd=" + escape($('#dealercd').val()) +
                          "&username=" + escape($('#username').val()) +
                          "&password=" + $.md5(escape($('#password').val())) +
                          "&checkDealer=" + escape($('#checkDealer').val());

        //如果需要填验证码时,把验证码参数传过去
        if (!!checkCheckCode) {
            queryString += "&checkcode=" + escape($('#checkcode').val());
        }

        $.ajax({
            type: "post",
            url: "Handlers/LoginHandler.ashx",
            data: queryString,
            error: function (msg) {
                //移除等待图标
                removeWaitIcon();
                $('#errormsg').text('服务器有错误！');
            },
            success: function (msg) {
                //如果是用户名或密码错误
                if (msg == "error") {
                    $('#errorIcon').show(); //
                    $('#errormsg').text("用户名或密码错误");
                    $('#waitingIcon').addClass('dn');
                    $('#btnLogin').val('登录');
                    $('#checkCheckCode').val('1'); //把显示验证码的标志修改为1，表示下次提交表单时，需要验证验证码
                    $('#checkCodeBox').removeClass('dn'); //把验证码模块显示出来
                    $('#checkCodeImg').removeClass('dn'); //把验证码模块显示出来
                    loginJs.ChangeCodeImg();
                }
                    //如果登录成功并且是普通用户
                else if (msg == "success") {
                    $('#waitingIcon').addClass('dn');
                    $('#btnLogin').val('登录成功');
                    document.location.href = "Default.aspx"; //如果登录成功则跳到管理界面
                }
                    //如果是验证码错误
                else if (msg == "errorcode") {
                    $('#errorIcon').show();
                    $('#errormsg').text("验证码错误");
                    $('#waitingIcon').addClass('dn');
                    $('#btnLogin').val('登录');

                    //当验证码错误时重新获取验证码
                    loginJs.ChangeCodeImg();
                }
            }
        });
        return false;
    };
    return loginJs;

}(loginJs || {}));


$('document').ready(function () {

    //页面初次加载时执行的脚本动作
    loginJs.init();

    //页面加载完成后
    loginJs.blurAndFocus();

    //页面加载完成后是否记住我
    loginJs.rememberMe('#rememberMe');

    setInterval(function () {
        loginJs.hiddenText('#dealercd');
        loginJs.hiddenText('#username');
        loginJs.hiddenText('#password');
        loginJs.hiddenText('#checkcode');

    }, 1000);
});