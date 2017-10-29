$(function () {
    $(".capcha img, #captcha, .captcha img").click(function () {
        $(this).attr("src", "code?_=" + (new Date()).getTime())
    });
    $("input[name=username]").change(function () {
        var b = $(this).val();
        if (b != "") {
            if (b.length < 4) {
                dialog.error("消息", "帐户名由4-10个字符组成！");
                return
            }
        }
    });
    $("#regForm").submit(function(e){
        var event = e;
        var h = $(".clearfix input[name=username]").val() == undefined ? "" : $(".clearfix input[name=username]").val().trim();
        if (h == "") {
            dialog.error("消息", "请输入账号名称！");
            event.preventDefault();
            return;
        }
        var f = $(".clearfix input[name=fullName]").val();
        if (f !== undefined && f == "") {
            dialog.error("消息", "请输入真实姓名！");
            event.preventDefault();
            return;
        }
        var j = $(".clearfix input[name=email]").val();
        if (j !== undefined && j.trim() == "") {
            dialog.error("消息", "请输入电子邮箱地址！");
            event.preventDefault();
            return;
        } else {
            if (j !== undefined && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(j)) {
                dialog.error("消息", "您的电子邮件格式不正确！");
                event.preventDefault();
                return;
            }
        }
        var e = $("#aff-key").val();
        if (e == "") {
            dialog.error("消息", "请输入邀请码！");
            event.preventDefault();
            return;
        }
        var b = $(".clearfix input[name=mobile]").val();
        var d = new RegExp("^[0-9]*$");
        if (b !== undefined && (b == "" || !d.test(b))) {
            dialog.error("消息", "请输入正确的11位数字手机号码！");
            event.preventDefault();
            return;
        }
        var k = $(".clearfix input[name=wechat]").val();
        var i = new RegExp("^[a-zA-Z0-9-_]+$");
        if (k !== undefined && k.trim() == "") {
            dialog.error("消息", "请输入微信号！");
            event.preventDefault();
            return;
        } else {
            if (k !== undefined && (!i.test(k) || k.length < 4)) {
                dialog.error("消息", "请输入正确的微信号！");
                event.preventDefault();
                return;
            }
        }
        var l = $(".clearfix input[name=password]").val();
        var m = $(".clearfix input[name=password1]").val();
        if (l == "") {
            dialog.error("消息", "请输入密码！");
            event.preventDefault();
            return;
        }
        if (l != m) {
            dialog.error("消息", "输入的密码不一致，请重新输入！");
            event.preventDefault();
            return;
        }
        var c = $("#code").val();
        if (c == "") {
            dialog.error("消息", "请输入验证码！");
            event.preventDefault();
            return;
        }
        var g = getQueryString("aff");
        if (g == "" || g == null) {
            g = LIBS.cookie("affid")
        }
        $("#btnRegister").attr("disabled", "disabled");
        $("#btnRegister").val("提交中，请等待...");
    });
});