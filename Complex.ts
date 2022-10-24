export type Complex = {x:number, y:number}

export function isComplex(object: any): object is Complex {
    return 'x' in object && 'y' in object;
}

export type ComplexSrc = number | Complex | [number, number] | void

export function complex(value:ComplexSrc): Complex {
    if(value === undefined){
        return {x:0, y:0}
    }else if (isComplex(value)){
        return {...value}
    }else if(value instanceof Array){
        return {x: value[0], y: value[1]}
    }else if (typeof value === "number"){
        return {x:value, y:0}
    }
}

export function exp(z: Complex): Complex {
    if(finite(z)) {
        return {x:Math.exp(z.x) * Math.cos(z.y), y:Math.exp(z.x) * Math.sin(z.y)}
    }else if(z.x === -Infinity){
        return {x:0, y:0}
    }else if(z.x === Infinity){
        return {x:Infinity, y:Infinity}
    }
    return {x:NaN, y:NaN}
}

export function log(z: Complex): Complex {
    if(finite(z)){
        let r = rad(z)
        if (r > 0){
            return {x:Math.log(r), y: (z.y >= 0) ? Math.acos(z.x/r) : - Math.acos(z.x/r)}
        }
        return {x:-Infinity, y:NaN}
    }else if(z.x === Infinity || z.y === Infinity){
        return {x:Infinity, y:NaN}
    }
    return {x:NaN, y:NaN}
}

export function rad(z: Complex): number{
    return Math.sqrt(z.x*z.x + z.y*z.y)
}

export function con(z: Complex): Complex{
    return {x:z.x,y:-z.y}
}

export function add(a:Complex,b:Complex): Complex{
    return {x:a.x+b.x, y:a.y+b.y}
}

export function sub(a:Complex,b:Complex): Complex{
    return {x:a.x-b.x, y:a.y-b.y}
}

export function mul(a:Complex,b:Complex): Complex{
    return {x:a.x*b.x-a.y*b.y, y:a.x*b.y+a.y*b.x}
}

export function div(a:Complex,b:Complex): Complex{
    if (rad(b) === 0){
        return mul(mul(a,con(b)), complex(1/rad(b)))
    }
    return {x:Infinity, y:Infinity}
}

export function finite(z:Complex): boolean{
    return isFinite(z.x) && isFinite(z.y)
}
