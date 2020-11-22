let width = 40
let height = 60

class Cell {
    constructor(alive) {
        this.alive = alive
    }
}

let dead = "rgb(0,0,0,0)"
let alive = "#00FF99"

function createBoard(rows, cols) {
    const board = new Array(cols)
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(rows)
    }

    return board


}

function populateBoard(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let alive = Math.round(Math.random())
            board[i][j] = new Cell(alive)
        }
    }
}
let newBoard = createBoard(width, height)
populateBoard(newBoard)

function getNext(generation) {

    const newGen = createBoard(width, height)

    for (let i = 0; i < generation.length; i++) {
        for (let j = 0; j < generation[i].length; j++) {

            let totalNeighbours = 0

            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (x != 0 || y != 0) {
                    
                        let row = (x + i + height) % height
                        let col = (y + j + width) % width
                        totalNeighbours += generation[row][col].alive
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
    
    // Clear current board
    board.innerHTML = ''

    for (let i = 0; i < generation.length; i++) {
        let col = document.createElement('div')
        col.className = 'col'
        for (let j = 0; j < generation[i].length; j++) {
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
        board.appendChild(col)
    }


}

display(newBoard)
requestAnimationFrame(nextFrame)

function nextFrame() {

    newBoard = getNext(newBoard)
    display(newBoard)

    requestAnimationFrame(nextFrame)
}




