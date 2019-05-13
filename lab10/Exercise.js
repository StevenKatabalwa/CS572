
var University = /** @class */ (function () {
    function University(name, dept) {
        var _this = this;
        this.name = name;
        this.dept = dept;
        this.graduation = function (year) {
            console.log("Graduating " + _this.dept + " " + year + " students");
        };
    }
    return University;
}());

var mum = new University("MUM", "Computer Science");
mum.graduation(2019);
