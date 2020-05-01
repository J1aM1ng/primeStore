let count = 0;

function Vehicle(newBrand, newColor) {
    ++count;
    this.brand = newBrand;
    this.color = newColor;
    this.speed = 0;
    this.run = function() {
        console.log('the ' + this.brand + 'vehicle in ' + this.color + 'is running at the speed of ' + this.speed);
    }
    Object.defineProperties(this, 'brand', {
        writable: false
    })

}

function newVehicle(newBrand, newColor) {
    if (count < 11) {
        return new Vehicle(newBrand, newColor);
    } else {
        console.log('only 11 vehicles can be created!');
    }
}
let exp = newVehicle('benz', 'black');