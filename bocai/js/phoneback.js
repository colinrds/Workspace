var id = $("#name"),
    qtype = $("#qtype"),
    language = $("#language"),
    mobile = $("#mobile"),
    allFields = $([]).add(id).add(qtype).add(language).add(mobile),
    tips = $(".validateTips");

function updateTips(a) {
    tips.text(a).addClass("ui-state-highlight");
    setTimeout(function () {
        tips.removeClass("ui-state-highlight", 1500)
    }, 500)
}

function checkLength(c, d, b, a) {
    if (c.val().length > a || c.val().length < b) {
        c.addClass("ui-state-error");
        updateTips("" + d + " 的长度必须在 " + b + " 和 " + a + " 之间。");
        return false
    } else {
        return true
    }
}

function checkStatus(a, b) {
    if (a.val().length != 1) {
        a.addClass("ui-state-error");
        updateTips("请选择正确的" + b);
        return false
    } else {
        return true
    }
}

function checkRegexp(b, a, c) {
    if (!(a.test(b.val()))) {
        b.addClass("ui-state-error");
        updateTips(c);
        return false
    } else {
        return true
    }
}
$("#dialog-form").dialog({
    autoOpen: false,
    modal: true,
    height: 300,
    width: 480,
    draggable: false,
    resizable: false,
    buttons: {
        "确认送出": function () {
            var a = true;
            allFields.removeClass("ui-state-error");
            a = a && checkLength(id, "会员账号", 4, 16);
            a = a && checkStatus(qtype, "问题类型");
            a = a && checkStatus(language, "语言");
            a = a && checkRegexp(mobile, /^0?(\+86 |\+886 |\+852 )[0-9]{8,15}$/, "请加上区域码和空格，例如: 大陆地区+86 台湾地区+886 香港地区+852 .");
            if (a) {
                postUrl = "/createPhoneBack";
                $.ajax({
                    url: postUrl,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        id: id.val(),
                        qtype: qtype.val(),
                        language: language.val(),
                        mobile: mobile.val()
                    },
                    success: function (b) {
                        $("#dialog-form").dialog("close");
                        dialog.alert("消息", "提交成功，请您耐心等待客服人员的回电");
                        id.val("");
                        qtype.val("请选择问题类型");
                        language.val("请选择语言");
                        mobile.val("");
                        updateTips("所有的表单字段都是必填的.");
                        if (b.success) {} else {
                            if (b.message) {
                                dialog.error("消息", b.message)
                            } else {
                                dialog.error("消息", "抱歉，提交失败!")
                            }
                        }
                    },
                    error: function (b, d, c) {
                        alert(b.responseText)
                    }
                })
            }
        }
    }
});
$(".phoneback").button().click(function () {
    $("#dialog-form").dialog("open")
});