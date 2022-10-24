// Z({x:,y:})

import {Complex, finite} from "./Complex";
import {Color} from "./Color";

type Pixel = {
    point: Complex,
    color: Color
}

type Pixels = Pixel[]

interface ViewObject {
    view: (a:Complex, b:Complex, w:number, h: number) => Pixels
}


function x(): Pixels {
    return []
}

class Point implements ViewObject{
    value: Complex;
    color: Color;
    constructor(value: Complex, color: Color) {
        this.value = value
        this.color = color
    }
    view(a:Complex, b:Complex, w:number, h: number): Pixels{
        let c = this.value
        if(a.x === b.x || a.y === b.y || !finite(a) || !finite(b) ){
            return []
        }

        let x = (c.x - b.x)/(a.x - b.x)
        let y = (c.y - b.y)/(a.y - b.y)

        if(0 < x && x < 1 && 0 < y && y < 1){
            return [{
                point:{x:w*x, y:h*y},
                color: this.color
            }]
        }
        return []
    }
}

class Circule implements ViewObject{
    A: Point;
    B: Point;
    C: Point;
    constructor(A: Point, B: Point, C: Point) {
        this.A = A
        this.B = B;
        this.C = C;
    }
    view(a:Complex, b:Complex, w:number, h: number): Pixels{
        // TODO вычислить настоящие отображаемые точки
        return this.A.view(a,b,w,h).concat(this.B.view(a,b,w,h), this.C.view(a,b,w,h))
    }

}
