class Rectangle{
    constructor(width , height , color){
        this.width = width;
        this.height = height;
        this.color = color;
    }
    area(){
        const area = this.width * this.height;
        return area;
    }
    paint(){
        console.log(`painthing with color ${this.color}`);
        
    }
}
const rect = new Rectangle(2 , 4 , "Black");
const area = rect.area();
console.log(rect.width);
console.log(rect.height);


console.log(area);
rect.paint();

