
F = {
    exp: (z) => ({r:z.x, f:z.y}),
    ln: (z) => ({x:z.r, y:z.f}),
    multy_1: (a) => (b => {x: (a.x*s.x - a.y*s.y), y: (a.x*b.y + a.y*b.x)}),
    multy: (a) => (b => {r: (a.r+b.r), f: (a.f+b.f)}),
    plus: (a) => (b => {x: (a.x+b.x), y: (a.y+b.y)}),
    pow: (a) => (b => exp(multy(ln(a),b))),
}