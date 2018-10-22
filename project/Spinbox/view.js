(function(exports){
    function SpinboxView(value) {
        console.log('view created!');
    }
    SpinboxView.prototype = {
        render: function (value) {
            $('.result').val(value);
        }
    };
    exports.SpinboxView = SpinboxView;
})(this)