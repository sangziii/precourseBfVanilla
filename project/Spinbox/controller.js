(function(exports){
    function SpinboxController(value) {
        console.log('controller created!');
        this.spinboxModel = new SpinboxModel(50);
        this.spinboxView = new SpinboxView();

        this.spinboxView.render(this.spinboxModel.getData());

        $(".btn-increase").on("click", $.proxy(this.onClickIncrease, this));
        $(".btn-decrease").on("click", $.proxy(this.onClickDecrease, this));
    }

    SpinboxController.prototype = {
        onClickIncrease: function(){
            console.log("+");
            this.spinboxModel.increase();
            this.spinboxView.render(this.spinboxModel.getData());
        },
        onClickDecrease: function(){
            console.log("-");
            this.spinboxModel.decrease();
            this.spinboxView.render(this.spinboxModel.getData());
        }
    }
    exports.SpinboxController = SpinboxController;
})(this)