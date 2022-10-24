
// P - Точка. Содержит в себе стартовую z-точку, финишную z-точку 
// и историю в виде последовательности "функция - z-точка". 
// Так же содержит одну V-точку. Не хранит текущих координат само по себе (берет у Z-точек по мере необходимости). 
// Является интерфейсом между Z-обьектами, V-обьектами и Плоскостью. 

// методы:
// .apply(Func) //Пишет функцию в историю и применяет её. 
// .revert(int) // Возвращается на некое число шагов.
// .move(C) //переместить по новым координатам.
// .cameraMove(Сam) // Принимает ссылку на Камеру. Камера изменилась - нужно передать это к V-точке

// P - Точка. Содержит в себе Z-точки. 


function P(sets){
    var self = this

    self.style = sets.name
    self.style = sets.style
    
    self.path = [new Z({x:sets.x, y:sets.y})]
    self.history = []

    self.length = () => (self.path.length())
    self.first = () => (self.path[0])
    self.last = () => (self.path[self.length-1])

    self.apply = function(func){
        self.path[self.length()] = new Z(self.last().eq())
        self.last().do(func)
        self.history.push(func)
    }

    self.move = function(sets){
        if (sets.name)
            self.style = sets.name

        if (sets.style)
            for(key in sets.style):
                self.style[key] = sets.style[key]

        if (sets.x and sets.y or sets.r and sets.f){
            self.first().eq(sets)
            for (z in self.path){
                if (z == z.first())
                    z = undefined
            }

            for(func in self.history){
                self.apply(func)
            }
        }

    }
}
