// Z - точка. Самая простая и базовая единица. Постоянно хранит в себе некие абсолютные координаты на плоскости
// Отвечает за умное их изменение в случае необходимости.
// Z.eq() - присвоение, числовой объект
// Z.do() - изменение, функция
// Является расширенным полным числовым обьектом.

import {Complex, isComplex, complex, add, ComplexSrc} from "./Complex";

type ComplexLike = ComplexPoint | ComplexSrc

export class ComplexPoint {
    value: Complex

    constructor(point: ComplexLike) {
        this.value = complex(point instanceof ComplexPoint ?
            point.value : point)
    }

    eq(other: ComplexPoint){
        this.value = [...other.value]
    }

    apply(fn: (v:ComplexPoint) => ComplexPoint ){
        return this.eq(fn(this))
    }

    add(point: ComplexSrc){
        const other = new ComplexPoint(point)
        return new ComplexPoint(add(this.value, other.value))
    }

    sub(point: ComplexSrc){
        const other = new Complex(point)
        return new Complex({
            x: this.x - other.x,
            y: this.y - other.y
        })
    }

    mul(point: someComplex){
        const other = new Complex(point)
        return new Complex({
            m: this.m + other.m,
            a: this.a + other.a
        })
    }

    div(point: someComplex){
        const other = new Complex(point)
        return new Complex({
            m: this.m - other.m,
            a: this.a - other.a
        })
    }
}


//
//
// Z = function(sets){
//     self = this
//     this.eq = function(C){
//         if (C == undefined){
//             return {x:self.x,y:self.y,r:self.r,f:self.f}
//         }
//
//         let x,y,r,f,t
//
//         t = 'f' // finite, zero, infinite, nan
//
//         if(C.x !== undefined && C.y !== undefined){
//             x = Number(C.x)
//             y = Number(C.y)
//             if(isFinite(x) && isFinite(y)){
//                 r = Math.sqrt(x*x+y*y)
//                 if(r > 0){
//                     f = (y >= 0) ? Math.acos(x/r) : - Math.acos(x/r)
//                     r = Math.log(r)
//                 }
//                 else {
//                     t = 'z'
//                 }
//             } else {
//                 t = 'i'
//             }
//         }
//         else if(C.r !== undefined && C.f !== undefined){
//             r = Number(C.r)
//             f = Number(C.f)
//
//             if(isFinite(r) && isFinite(f)){
//                 x = Math.exp(r)*Math.cos(f)
//                 y = Math.exp(r)*Math.sin(f)
//             }else if(C.r === Infinity){
//                 t = 'i'
//             }else if(C.r === -Infinity){
//                 t = 'z'
//             }else{
//                 t = 'n'
//             }
//         }
//         else{
//             t = 'n'
//         }
//         self.x = x
//         self.y = y
//         self.r = r
//         self.f = f
//         self.t = t
//         return self
//     }
//     this.do = function(Func){
//         self.eq(Func(self.eq()))
//         return self
//     }
//     this.eq(sets)
// }
