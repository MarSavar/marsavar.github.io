let a = 0
let width = 100
let height = 100

class Cell {
    constructor(alive) {
        this.alive = alive
        this.neighbours = 0
    }

    setNeighbours(neighours) {
        this.neighbours = neighours
    }

}

let dead = "rgb(0,0,0,0)"
let alive = "#63B59B"

function createBoard(cols, rows) {
    const board = new Array(cols)
    for (let i=0; i< board.length; i++) {
        board[i] = new Array(rows)
    }
    return board
}

function populateBoard(board) {
        for (let i = 0; i<board.length; i++) {
            for (let j = 0; j<board[i].length;j++) {
                let alive = Math.round(Math.random())
                board[i][j] = new Cell(alive)
            }
        }
}
let newBoard = createBoard(height, width)
populateBoard(newBoard)

function getNext(generation) {


    let newGen = createBoard(height, width)
    

    for (let i = 0; i< generation.length; i++) {

        for (let j = 0; j<generation[i].length; j++) {

            let totalNeighbours = 0

            for (let y = -1; y < 2; y++) {
                for (let x = -1; x < 2; x++) {
                    if (x != 0 || y != 0) {
                        let c = (y + i + width) % width
                        let r = (x + j + height) % height
                        totalNeighbours += generation[c][r].alive
                    }
                }
                    
            }
     

            if (generation[i][j].alive == 1 && (totalNeighbours < 2 || totalNeighbours > 3)) {
                newGen[i][j] = new Cell(0)
    
            }
            else if (generation[i][j].alive == 0 && totalNeighbours == 3) {
                newGen[i][j] = new Cell(1)
            }
            else {
                newGen[i][j] = new Cell(generation[i][j].alive)
            }
            
    }



}
   return newGen

}


function display(generation) {
    let board = document.querySelector('.container')

    board.innerHTML = '' 


    for (let i = 0; i< generation.length; i++) {
                 let row = document.createElement('div')
                row.className = 'row' 
                for (let j = 0; j<generation[i].length; j++) {
                    let cell = document.createElement('div')
                    cell.className = 'cell'

                    board.appendChild(cell)
        
                    if (generation[i][j].alive === 0) {
                       cell.style.backgroundColor = dead 
                   
                    } 
                    else {
                        cell.style.backgroundColor = alive
                    
                    }

                }
                board.appendChild(row)
            }
        

}
display(newBoard)
newBoard = getNext(newBoard)
let del = 10

const delay = ms => new Promise(res => setTimeout(res, ms));

let gen = 1

let counter = document.querySelector('.generationCount')
counter.innerText = gen

document.getElementById('start').addEventListener('click', async () => {
    
            display(newBoard)
            gen++
            counter.innerText = gen
            newBoard = getNext(newBoard)
            
           

    
  }
)


