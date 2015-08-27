define(function(require, exports, module) {
    var $ = require("../core/zepto/zepto"),
        mobileAppInstall = function() {
            function getIntentIframe() {
                if (!loadIframe) {
                    var iframe = document.createElement("iframe");
                    iframe.style.cssText = "display:none;width:0px;height:0px;", document.body.appendChild(iframe), loadIframe = iframe
                }
                return loadIframe
            }

            function getChromeIntent(url) {
                return url
            }
            var loadIframe, ua = navigator.userAgent,
                win = window,
                appInstall = {
                    isChrome: ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
                    isAndroid: ua.match(/(Android);?[\s\/]+([\d.]+)?/),
                    isIOS: ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    isWeixin: /MicroMessenger/gi.test(ua),
                    timeout: 500,
                    open: function(appurl, h5url) {
                        var t = Date.now();
                        appInstall.openApp(appurl), setTimeout(function() {
                            Date.now() - t < appInstall.timeout + 100 && h5url && appInstall.openH5(h5url)
                        }, appInstall.timeout)
                    },
                    openApp: function(appurl) {
                        appInstall.isChrome ? win.location.href = appInstall.isAndroid ? getChromeIntent(appurl) : appurl : getIntentIframe().src = appurl
                    },
                    openH5: function(h5url) {
                        win.location.href = h5url
                    }
                };
            return appInstall
        }();
    console.log("$$$$$", $, window.$ = $);
    $("#btn-getapp").on("click", function() {
        var h5url = "http://upbox.com.cn/";
        mobileAppInstall.isIOS && (h5url = "https://itunes.apple.com/cn/app/ji-zhan-lian-meng/id998419963?mt=8"), mobileAppInstall.isAndroid && (h5url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ppsports.upbox"), mobileAppInstall.open("upbox://apps.upbox.com.cn/", h5url)
    })
});
