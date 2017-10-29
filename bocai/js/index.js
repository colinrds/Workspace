if (/MSIE [4-8]/.test(navigator.userAgent)) {
    location.href = "browser/index.html"
}
$(function () {
    $(".gameitms a").click(function () {
        var b = $(this).attr("class");
        if (b != "more") {
            if (!$(".login").is(":hidden")) {
                var c;
                if (doLogin) {
                    c = {
                        "游客登录": function () {
                            alert(msg);
                            doLogin("!guest!", "!guest!")
                        }
                    }
                }
                dialog.error("消息", "您还没有登录！", c);
                return false
            }
        }
    });
    $("#cinema").click(function () {
        if (!$(".login").is(":hidden")) {
            var b;
            b = {
                "关闭": function () {
                    $(this).dialog("close")
                }
            };
            dialog.error("消息", "您还没有登录！", b);
            return false
        }
    })
});

function showError() {
    dialog.error("消息", "暂未开通！");
    return false
}

function getLastDay(b, d) {
    var c = new Date(b, d, 1);
    var a = (new Date(c.getTime() - 1000 * 60 * 60 * 24)).getDate();
    return b + "-" + d + "-" + a
}

function showAppInstruction(a, b) {
    $("#" + a).show();
    $("#" + b).hide()
}

function hideAppInstruction() {
    $("#iosInst").hide();
    $("#androidInst").hide();
    $(".back_body1").hide()
};