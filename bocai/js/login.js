var msg = "游客盘口只供试玩，与正式会员盘口无关!";
$(function () {
    $("#guestLogin").click(function () {
        alert(msg);
        doLogin("!guest!", "!guest!")
    });
    $(".login input").keypress(function (a) {
        if (a.keyCode == 13) {
            $("#btnlogin").click();
            return false
        }
    });
    $("#btn-register").click(function () {
        location.href = "/register"
    });
    $("#btnlogin").click(function (e) {
        var b = $("#username").val();
        var a = $("#password").val();
        var c = $("#vcode").val();
        if (b == "") {
            dialog.error("消息", "用户名和密码都不能为空");
            return
        }
        if (a == "") {
            dialog.error("消息", "用户名和密码都不能为空");
            return
        }
        if (c == "") {
            dialog.error("消息", "验证码不能为空");
            return
        }
        $("#login_form").submit();
    })
});


