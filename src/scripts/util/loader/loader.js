define(function(require, exports, module){
    /**
     * loader - 加载器
     */
    var $ = require('$')
        //, log = require('../log/log')
    ;

    var Loader = {}, N = 0;

    /**
     * GET
     * @param  {[type]}   url           [description]
     * @param  {[type]}   params        [description]
     * @param  {Function} callback      [description]
     * @param  {[type]}   beforeSend    [description]
     * @param  {[type]}   errorcallback [description]
     * @param  {[type]}   scope         [description]
     * @return {[type]}                 [description]
     */
    function loader(url, params, callback, beforeSend, errorcallback, scope){
        var sevurl = url, _config = {}, _cdn, prefix = 'js_callback_', callbackName = '',
            beforeCallback = beforeSend || $.noop,
            errorCallback = errorcallback || $.noop,
            opts = {
                from : 'web',
                version : '1.0.0',
                format : 'jsonp'
            }
        ;

        params = $.extend(opts, params);

        /**
         * params : config is an {}
         * { callback : string, others : otherconfig }
         */
        if(params && params.config && !$.isEmptyObject(params)){
            _config = params.config;
            delete params.config;
        }

        _cdn = (_config.callback) ? true : false; //_config.cdn === true &&

        //cdn - no need token
        if(_cdn){
            delete params._cotk;
        }

        sevurl = sevurl.indexOf('?') > -1 ? sevurl + '&' : sevurl + '?';
        sevurl += $.param(params);
        sevurl = sevurl.replace(/&&/, '&').replace(/\?\?/, '?');

        if(sevurl.match(/cb=.*/i)){
            callbackName = /cb=(.*?(?=&)|.*)/.exec(sevurl)[1];
            sevurl = sevurl.replace(/(.*)?(cb=.*?\&+)/, '$1');
        }else{
            callbackName = _cdn ? _config.callback : prefix + (N++);
        }

        return $.ajax({
            dataType : 'jsonp',
            type : 'GET',
            cache : _config.cache === 0 ? false : true,
            url : sevurl,
            jsonp : 'jsonCallback',
            jsonpCallback : function(){
                // callbackName = _cdn ? _config.callback : prefix + (N++);
                return callbackName;
            },
            beforeSend : function(XMLHttpRequest){
                beforeCallback();
            },
            success : function(data) {
                //console.log('data==', data);
                _config = null;
                if (callback && typeof(callback) == 'function') {
                    callback.apply(scope, arguments);
                }
            },
            timeout : 10000,
            statusCode : {
                404 : function(){ errorCallback();},
                500 : function(){ errorCallback();},
                502 : function(){ errorCallback();},
                504 : function(){ errorCallback();},
                510 : function(){ errorCallback();}
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log('Ajax Load error: ', sevurl,  XMLHttpRequest, textStatus, errorThrown);
                errorCallback();
            }

          });
    }


    function getJson(url, params, callback){
        return $.getJSON(url, params, function(){
            if (callback && typeof(callback) == 'function') {
                callback.apply(null, arguments);
            }
        });

        // return $.getJSON(url, params, callback);
    }

    /**
     * POST
     * @param  {[type]} url  [description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    function ajax(url, params, callback, beforeSend, errorcallback, scope){
        var beforeCallback = beforeSend || $.noop,
            errorCallback = errorcallback || $.noop
        ;

        return $.ajax({
            url: url,
            type: "POST",
            data: params,
            beforeSend : function(XMLHttpRequest){
                beforeCallback();
            },
            success: function(data) {
                //{"code":0,"msg":"OK","data":{"login":"lin04com01","_id":"54b9ed4a0ccb53980343529e"}}
                console.log('Ajax Post ===>', url, data, JSON.stringify(params));
                if (callback && typeof(callback) == 'function') {
                    callback.apply(scope, arguments);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log('Ajax Post error: ', url,  XMLHttpRequest, textStatus, errorThrown);
                errorCallback();
            }
        });

    }

    function loader2(url, data, callback){
        $.ajax({
            url : url + $.param(data),
            dataType : 'jsonp',
            jsonp : 'jsonCallback',
            success : function(data){
                if(!data || data.ret < 1){
                    console.log(data.msg , " : " , data.result);
                    return;
                }

                if (callback && typeof(callback) == 'function') {
                    callback.apply(null, arguments);
                }
            }
        });
    }

    Loader = {
        get : loader,
        getJson : getJson,
        post : ajax,
        loader : loader2
    };

    return Loader;

});
