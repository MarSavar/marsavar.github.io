const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 400
canvas.height = 400

const sizeOfSquares = 10

let numberOfCols = canvas.width / sizeOfSquares
let numberOfRows =  canvas.height / sizeOfSquares


class Cell {
    constructor(status) {
        this.status = status
    }


}
function countNeighbours(grid, x, y) {
    let neigh = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i != 0 || j != 0) {
            let cols = (i + x + numberOfCols) % numberOfCols
            let rows = (j + y + numberOfRows) % numberOfRows
            console.log(cols,rows)
            neigh += grid[cols][rows].status
            }
            
        }
    }

    return neigh
}

function createGrid() {

    let r = new Array(numberOfRows)
    for (let i = 0; i < r.length; i++) {
        r[i] = new Array(numberOfCols)
    }
    return r
}

function randomlyPopulateGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let status = Math.round(Math.random())
            grid[i][j] = new Cell(status)
        }
    }
}
function pickColour(cell) {
   
    return cell.status == 1 ? "white" :  "#142129"
        
}


function draw(grid) {
    context.fillStyle = "#142129"
    context.fillRect(0, 0, canvas.width, canvas.height)
  
  
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j< grid[i].length; j++) {
            countNeighbours(grid,i,j)
            context.beginPath()
            context.rect(i*sizeOfSquares, j*sizeOfSquares, sizeOfSquares, sizeOfSquares)
            context.fillStyle = pickColour(grid[i][j])
            context.fill()
        }
    }
}

function nextGeneration(grid) {
    let newGen = createGrid()
    
    for (let i=0; i<grid.length;i++) {
        for (let j = 0; j < grid[i].length; j++) {
            
            let neighbours = countNeighbours(grid,i,j)
           
            if (grid[i][j].status == 1 && (neighbours < 2 || neighbours > 3)) {
                newGen[i][j] = new Cell(0)
             
            }
            else if (grid[i][j].status == 0 && neighbours == 3) {
                newGen[i][j] = new Cell(1)
                
            }
            else {
                newGen[i][j] = new Cell(grid[i][j].status)       
                 }
         
        }
    }
    return newGen
}

let a = createGrid()
randomlyPopulateGrid(a)
draw(a)

requestAnimationFrame(update)

function update() {
    a = nextGeneration(a)
    draw(a)
    requestAnimationFrame(update)
}
