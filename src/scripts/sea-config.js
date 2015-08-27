seajs.config({
    "base" : "./scripts/",
    "alias" : {
        "jquery ": "core/jquery/jquery",
        "zepto" : "core/zepto/zepto",
        "underscore" : "core/underscore/underscore",
        "backbone" : "core/backbone/backbone"
    },
    "preload" : ["seajs/plugin/text"],
    "map" : [
        [".tpl", ".tpl?" + +new Date]
    ]
});
