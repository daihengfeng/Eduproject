/*******************************************************************************************
 *  脚本用途： 用于整站的总体脚本
 *  脚本编写时间： 2013-09-01
 *******************************************************************************************/

var Common = (function (Common) {

    //@method 获取页面地址的查询字符串,并格式化成一个key/value的对象
    //@return Object
    Common.urlParem = (function () {
        //获取查询字符
        var queryString = (location.search.indexOf('?') === -1) ?
                          location.search : location.search.slice(location.search.indexOf('?') + 1),
            arrs = [],
            queryObj = {};

        //格式化查询字符串
        arrs = queryString.split('&');

        //遍历分割的数组,把数组内的元素组成key/value的形式
        for (var i = 0, len = arrs.length; i < len; i++) {
            var key = arrs[i].split('=')[0],
                value = arrs[i].split('=')[1];

            queryObj[key] = value;
        }
        return queryObj;
    }());

    //@method 当点击一个导航时，让该导航获取当前样式,让其它导航失去当前样式
    //@param {String} 鼠标点击的导航元素
    function switchCurrentClass(element) {
        var self = $(element);

        if (!self.hasClass('password_currentTab')) {

            self.parent('li')
                .addClass('nav_current');

            self.parent('li')
                .siblings('li')
                .removeClass('nav_current');

        } else {
            $('.navContent').removeClass('nav_current');
        }
    }

    //@method 点击主导航的每一个选项时显示相应的页面
    //@param {DomObject} 当前鼠标点击的元素
    Common.switchNavigation = function (element) {

        //获取要打开的ifame有关的辅助属性
        var iframeName = $(element).attr('data-name'),
            iframeSrc = $(element).attr('data-url'),
            iframeId = $(element).attr('id'),
            iframeBox = $('#' + iframeName),
            iframeHtml = '<iframe class="' + iframeName + '" id="' + iframeId + '_iframe"' + ' frameborder="0" border="0" ' + 'src="' + iframeSrc + '"style="z-index: 5;position: relative;"></iframe> ',
            iframeTarget = '#' + iframeId + '_iframe',
            iframeParent = $(element).parents('li'),
            iframeSiblings = 'iframe.' + iframeName;

        //切换当前样式
        switchCurrentClass(element);

        //每一次打开新的iframe都把等待图标先删除
        if ($("#waiting_animation").length > 0) {
            $("#waiting_animation").remove();
        }
        //if ($(window.parent.document.getElementById("waiting_animation")).length > 0) {
        //    $(window.parent.document.getElementById("waiting_animation")).remove();
        //}

        //判断是打开第一层iframe还是第二层iframe
        var src = iframeName == "main_iframe" ? "../assets/Images/salesPad_waiting.gif" : "../assets/Images/salesPad_waiting.gif";

        //重新定义等待图标
        var waitingHtml = '<div id="waiting_animation" style="position: absolute;z-index:4;left:0;right:0;top: 200px;text-align:center;"><img title="" src="' + src + '"/></div>';

        //判断所要显示的iframe是否存在，如果存在，则直接显示，如果不存在，则重新生成
        if ($(iframeTarget).length > 0) {
            $(iframeTarget).removeClass('dn')
                           .siblings('iframe')
                           .addClass('dn');
        } else {
            $(iframeSiblings).addClass('dn');

            iframeBox.append(waitingHtml);

            setTimeout(function () {
                iframeBox.append(iframeHtml)
                     .addClass('mainIfram_position');
            },800);
        }
    };

    //点击每个相应的按钮时显示相应的页面
    Common.showPage = function (element,cssStyle,url) {
        var url = (typeof url === 'undefined') ? $(element).attr("data-url") : url,
            pageBox = $("#popupLayer"),
            iframe = pageBox.find("iframe"),
            zIndex = pageBox.css("z-index"),
            wrapBox = $('#wrapBox');

        var waitingHtml = '<div id="waiting_animation" style="position: absolute;z-index: 10;left: 0;right: 0;top: 200px;text-align: center;"><img title="" src="../../Images/salesPad_waiting.gif"/></div>';

        //如果有传进来宽度，高度属性时
        if (cssStyle) {
            var marginTop = cssStyle.marginTop ? cssStyle.marginTop : '20px';
            //如果包裹的div已经存在
            if (wrapBox.length > 0) {
                wrapBox.attr('style', 'width:' + cssStyle.width +
                             '; margin: 0 auto;margin-top: ' + marginTop + ';');
            }else{
                iframe.wrap('<div id="wrapBox" style="width:' + cssStyle.width +
                             '; margin: 0 auto;margin-top: ' + marginTop + ';"></div>')
            }

            iframe.css({ height: cssStyle.height });
        }
        
        pageBox.before(waitingHtml + '<div class="dialog" id="dialog" style="z-index:' + (zIndex - 1) + '"></div>')
               .removeClass("dn")
               .css("z-index", zIndex + 10);

        iframe.attr("src", url)
              .css({ zIndex: zIndex + 20 });
    };

    /**
     * @method 关闭弹也的iframe
     */
    Common.closePage = function () {
        var pageBox = $(window.parent.document.getElementById("popupLayer")),
            dialog = $(window.parent.document.getElementById("dialog")),
            wrapBox = $(window.parent.document.getElementById("wrapBox")),
            waintIcon = $(window.parent.document.getElementById("waiting_animation"));

        if (pageBox.length > 0) {
            pageBox.addClass("dn")
                   .css("z-index", "1")
                   .find("iframe")
                   .removeAttr("src");

            wrapBox.removeAttr('style')
                   .find('iframe')
                   .removeAttr('style');

            dialog.remove();
            waintIcon.remove();
        }
    };

    //点击每个相应的按钮时显示相应的页面
    Common.showPageById = function (id,styleObj) {
        var popupLayer = $('#' + id),
            popuZindex = popupLayer.css('z-index');
            
        if (typeof styleObj != 'undefined') {
            var style = styleObj;
            style.margin = '0 auto';

            popupLayer.find('.form')
                      .addClass('boxShadow')
                      .css(style);
            popupLayer.css({ height: styleObj['height'] });
        }

        popupLayer.after('<div class="dialog" id="dialog" style="z-index:' + (popuZindex - 5) + '"></div>')
                  .removeClass("dn");

        popupLayer.removeClass("dn");
    };

    /**
     * @method 关闭弹也的iframe
     */
    Common.closePageById = function (id) {

        var popupLayer = $('#' + id);

        popupLayer.next('#dialog').remove();
        $('#' + id).addClass('dn');
    };


    Common.openform = function (url,cssStyle) {
        var pageBox = $("#popupLayer"),
            iframe = pageBox.find('iframe'),
            zIndex = pageBox.css("z-index"),
            wrapBox = $('#wrapBox');

        //如果有传进来宽度，高度属性时
        if (cssStyle) {
            var marginTop = cssStyle.marginTop ? cssStyle.marginTop : '20px';
            //如果包裹的div已经存在
            if (wrapBox.length > 0) {
                wrapBox.attr('style', 'width:' + cssStyle.width +
                             '; margin: 0 auto;margin-top: ' + marginTop + ';');
            } else {
                iframe.wrap('<div id="wrapBox" style="width:' + cssStyle.width +
                             '; margin: 0 auto;margin-top: ' + marginTop + ';"></div>');
            }

            iframe.css({ height: cssStyle.height });
        }

        pageBox.after('<div class="dialog" id="dialog"></div>')
          .removeClass("dn")
          .css("z-index", zIndex + 10);

        iframe.attr("src", url).css("z-index", zIndex + 20);
        pageBox.removeClass("dn").css("z-index", zIndex + 10);
    };

    /**
     * @method 选择所有
     */
    Common.checkAll = function (element,idString) {
        var targetElement = event.srcElement,
            totalTable = $(element).parents('.total_table'),
            checkboxs = totalTable.find(':checkbox'),
            trElements = totalTable.find('div tr');

        if ( $(targetElement).attr('id').indexOf(idString) >= 0 &&
               targetElement.tagName == "INPUT" &&
               targetElement.type.toLowerCase() == "checkbox" ) {

            var ischecked = false;
            if (targetElement.checked) {
                ischecked = true;
                trElements.each(function () {
                    var self = $(this);
                    if (self.find(':checkbox').length > 0) {
                        self.addClass('clickzebracrossing');
                    }
                });
            } else {
                trElements.each(function () {
                    var self = $(this);
                    if (self.find(':checkbox').length > 0) {
                        self.removeClass('clickzebracrossing');
                    }
                });
            }

            for (i = 0, len = checkboxs.length; i < len; i++) {
                if (checkboxs[i].id.indexOf("chk") >= 0 &&
                    checkboxs[i].tagName == "INPUT" &&
                    checkboxs[i].type.toLowerCase() == "checkbox")

                    checkboxs[i].checked = ischecked;
            }
        }
    };

    //@method 页面上每一个tab模块的切换
    //@param {DomObject} 当前鼠标点击的元素
    Common.switchTab = function (element, callback) {
        var targetName = $(element).attr("data-tab"),
            $tabContentElements = $("div.hide_tab"),
            $spanTab = $('span[data-tab]');

        $spanTab.each(function () {
            var self = $(this),
                tabVal = self.attr('data-tab');

            if (tabVal === targetName) {

                self.addClass('tab_list_current')
                    .siblings("span")
                    .removeClass('tab_list_current');

                $('[data-tab="' + tabVal + '"]').removeClass('dn')
                                                .siblings('div.hide_tab')
                                                .addClass('dn');
            }
        });

        //如果有加调函数，则执行回调函数
        if (typeof callback === 'function' || typeof callback == 'object') {
            callback();
        }
    };

    //点击展开或收起按钮时显示或隐藏相应条件查询模块
    //Common.spreed = function () {

    //    var $switchSearch = $("#search_detail");
    //    var tableContentHeight = $($("div.tableContent")[0]).height(); //获取表格内容的高度
    //    var topHeight = $switchSearch.height(); //获取查询区的高度

    //    if ($switchSearch.css("display") == "block") {
    //        $('#search_detail').css({ display: 'none' });
    //        $('#switch').attr("title", "点击展开").css("background-position", "-19px -728px");

    //        //当查询模块收起后，重新调整表格的高度
    //        $($("div.tableContent")[0]).height(tableContentHeight + topHeight + 30);

    //    } else {
    //        $('#search_detail').css({ display: 'block' });
    //        $('#switch').attr("title", "点击收起").css("background-position", "-19px -754px");

    //        //当查询模块收起后，重新调整表格的高度
    //        $($("div.tableContent")[0]).height(tableContentHeight - topHeight - 30);
    //    }
    //};

    /**
     * @method 重新调整日期插件的位置调整
     * @param {DomObject} 当前鼠标点击的元素
     * @param {EventObject} 鼠标点击事件的事件对像
     */
    Common.resetDataBoxPos = function (element, event) {
        var fool = showCalendarDefault(element), //获取日期对象
            calendarBox = $('div.calendar')[0], //获取日期模块的最外层div
            x = event.clientX,
            y = event.clientY;

        //重新设置定位方式
        if (y >= 320) {
            $(calendarBox).css({
                position: 'fixed',
                left: (x - 100) + 'px',
                top: (y - 200) + 'px'
            });
        } else {
            $(calendarBox).css({
                position: 'fixed',
                left: (x - 100) + 'px',
                top: (y + 10) + 'px'
            });
        }
        return fool;
    };

    /**
     * @method 根据每行的复选框是否选中来高亮显示选中的行
     * @param {DomObject} 当前鼠标点击的元素
     */
    function setBgColor(self) {

        if (self.hasClass('clickzebracrossing')) {
            self.removeClass('clickzebracrossing');
            self.find(':checkbox').removeAttr('checked');
        } else {
            self.addClass('clickzebracrossing');
            self.find(':checkbox').attr('checked', 'checked');
        }
    }
    Common.switchLine = function (element,event) {
        var self = $(element);
        var targetElement = event.srcElement;
        
        if (targetElement.type !== 'button') {
            if (self.find(':checkbox').length > 0) {
                setBgColor(self);
            }
        }
    };

    return Common;

}(Common || {}));

$(function () {
    (function () {
        timeoutFun.timeoutId = null;
        function timeoutFun() {

            //先清除定时器
            clearTimeout(timeoutFun.timeoutId);

            //重新设置一个定时器
            timeoutFun.timeoutId = setTimeout(function () {

                //为表格的偶数行添加一个背景色
                var tableContent = $('div.total_table').find('table');
                $(tableContent).find('tr:odd').addClass('zebracrossing');

                timeoutFun();
            },10);
        }

        //针对IE7、8浏览器,把代码放在一个定时器里是为了防止触发updatapanel后脚本失效
        if ($.browser.msie) {
            if ($.browser.version < 9) {
                timeoutFun();
            }
        }

        //如果连接是来自首页时，则让关闭按钮显示
        if (Common.urlParem['from'] === 'index') {
            $('#closePage').removeClass('dn');
        }

    }());
});