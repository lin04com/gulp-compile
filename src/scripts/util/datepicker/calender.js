define(function (require, exports, module) {

    var $ = require('$');

    var datapicker = new Calender('#calendar', {
        start : -1,
        end : 20
    });

    function Calender() {
        this.initialize.apply(this, arguments);
    }

    Calender.prototype = {
        constructor:Calender,
        initialize : function(id, options){
            var nowDate = new Date();
            this.year = nowDate.getFullYear();
            this.month = nowDate.getMonth();
            this.date = nowDate.getDate();

            this.box = $(id);

            this.startDate = new Date(this.year, this.month, this.date + options.start);
            this.endDate = new Date(this.year, this.month, this.date + options.end);

            this.drawDate(new Date());
            this.bindEvent();
        },
        drawDate : function(odate){
            var DomDate = this.box.find('.nowDate');

            this.year = odate.getFullYear();
            this.month = odate.getMonth() + 1;
            this.date = odate.getDate();

            DomDate.innerHTML = this.year + '-' + this.month + '-' + this.date;
            console.log(this.year, this.month, this.date);
        },
        bindEvent : function(){
            var that = this,
                prevdate = this.box.find('prevDate'),
                nextdate = this.box.find('nextDate')
            ;
            prevdate.onclick = function(){
                var idate = new Date(that.year , that.month - 1, that.date - 1);
                console.log(idate, 'prev', that.start, idate==that.start);
                if(idate <= that.startDate){
                    alert('none-');
                    return;
                }
                that.drawDate(idate);
            };
            nextdate.onclick = function(){
                var idate = new Date(that.year , that.month - 1, that.date + 1);
                console.log(idate, 'next', that.end, idate== that.end);
                if(idate >= that.endDate){
                    alert('none+');
                    return;
                }
                that.drawDate(idate);
            };
        }
    };

    return Calender;

});
