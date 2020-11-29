/* 
GAME OF LIFE
Made by Mario Savarese
bored in Valencia, Spain
*/

// Query selectors
let container = document.querySelector(".container")
let generationInfo = document.querySelector("#generation")
let pauseButton = document.querySelector("#pause")
let clearButton = document.querySelector("#clear")
let colsSlider = document.querySelector("#cols")
let rowsSlider = document.querySelector("#rows")
let resetButton = document.querySelector("#newgrid")
let randomColours = document.querySelector("#randomColours")

// Event listeners
clearButton.addEventListener("click", function () {
    paused = true
    swap = true
    pauseButton.innerText = start
    container.innerHTML = ''
    clear(firstBoard)
    createTable(firstBoard)
    recolour(null, firstBoard)
})

pauseButton.addEventListener("click", function () {
    paused = !paused
    pauseButton.innerText = paused ? start : "Stop"
    requestAnimationFrame(redraw)
})


colsSlider.addEventListener("input", function () {
    resetButton.innerText = "Generate new " + colsSlider.value + " x " + rowsSlider.value + " grid"
})

rowsSlider.addEventListener("input", function () {
    resetButton.innerText = "Generate new " + colsSlider.value + " x " + rowsSlider.value + " grid"
})

resetButton.addEventListener("click", function () {
    paused = true
    swap = true
    generation = 1
    cols = parseInt(colsSlider.value)
    rows = parseInt(rowsSlider.value)
    generationInfo.innerText = generation
    pauseButton.innerText = start
    container.innerHTML = ''

    firstBoard = new Array(rows).fill(null).map(() => new Array(cols).fill(null))
    secondBoard = new Array(rows).fill(null).map(() => new Array(cols).fill(null))

    if (randomColours.checked) {
    alive = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
    dead = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
    }  else {
        alive= "teal"
        dead = "white"
    }
    populate(firstBoard)
    createTable(firstBoard)
    recolour(null, firstBoard)

})


let cols = parseInt(colsSlider.value)
let rows = parseInt(rowsSlider.value)
let paused = true
let swap = true
let start = "Start"
let generation = 1

// Cell colours (can substitute hex values)
let alive = "teal" 
let dead = "white"


function populate(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = Math.round(Math.random(1))
        }
    }
    return board
}

function createTable(board) {
    let cell;
    for (let i = 0; i < board.length; i++) {
        let row = document.createElement("div")
        row.className = "row"
        for (let j = 0; j < board[i].length; j++) {
            cell = document.createElement("div")
            cell.className = "cell"
            row.appendChild(cell)
            cell.addEventListener('click', function () {
                changeStatus(i, j)
            })
        }
        container.appendChild(row)
    }
}

function changeStatus(i, j) {
    if (paused) {
        pickBoard = swap ? firstBoard : secondBoard
        pickBoard[i][j] = pickBoard[i][j] == 1 ? 0 : 1
        let cellToChange = document.querySelectorAll(".cell")[j + (i * cols)]
        cellToChange.style.background = pickBoard[i][j] == 1 ? alive : dead
    }
}


function nextGen(board) {
    pickBoard = swap ? secondBoard : firstBoard

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let neighbours = countNeighbours(board, i, j)

            if (board[i][j] == 1 && (neighbours < 2 || neighbours > 3)) {
                pickBoard[i][j] = 0
            }
            else if (board[i][j] == 0 && neighbours == 3) {
                pickBoard[i][j] = 1
            }
            else {
                pickBoard[i][j] = board[i][j]
            }
        }
    }
    return pickBoard
}

function countNeighbours(grid, x, y) {
    let neighbours = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i != 0 || j != 0) {
                let r = (x + i + rows) % rows
                let c = (y + j + cols) % cols
                neighbours += grid[r][c]
            }
        }
    }
    return neighbours
}


function recolour(oldBoard = null, newBoard) {

    if (oldBoard) {
        for (let i = 0; i < oldBoard.length; i++) {
            for (let j = 0; j < oldBoard[i].length; j++) {
                if (oldBoard[i][j] != newBoard[i][j]) {
                    let cell = document.querySelectorAll(".cell")[j + (i * cols)]
                    cell.style.background = (1 - oldBoard[i][j] == 1) ? alive : dead
                }
            }
        }

    } else {

        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[i].length; j++) {
                let cell = document.querySelectorAll(".cell")[j + (i * cols)]
                cell.style.background = newBoard[i][j] == 1 ? alive : dead

            }
        }
    }
}

function clear(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0
        }
    }

}

function redraw() {

    if (!paused) {
        generation += 1
        let oldBoard = swap ? firstBoard : secondBoard
        let newBoard = nextGen(oldBoard)
        swap = !swap
        recolour(oldBoard, newBoard)
        generationInfo.innerText = generation
        requestAnimationFrame(redraw)
    }
}

// Initialise game
resetButton.innerText = "Generate new " + colsSlider.value + " x " + rowsSlider.value + " grid"
let firstBoard = new Array(rows).fill(null).map(() => new Array(cols).fill(null))
let secondBoard = new Array(rows).fill(null).map(() => new Array(cols).fill(null))
populate(firstBoard)
createTable(firstBoard)
recolour(null, firstBoard)
if (!paused) requestAnimationFrame(redraw)