const COLS = 7
const ROWS = 6
let turn = turn1 = 'aquamarine'
let turn2 = 'salmon'
let gameOver = false
let winner
let container = document.querySelector('.container')
let topRow = document.createElement('div')
topRow.className = 'topRow'
container.appendChild(topRow)



for (let i = 0; i < ROWS; i++) {
    let row = document.createElement('div')
    row.className = 'row'
    for (let j = 0; j < COLS; j++) {
        let cell = document.createElement('div')
        cell.className = 'col'
        cell.style.backgroundColor = 'white'
        row.appendChild(cell)
        cell.addEventListener('mousemove', function () {
            document.querySelectorAll('.topCol')[j % COLS].style.backgroundColor = turn == turn2 ? turn1 : turn2
        })
        cell.addEventListener('mouseleave', function () {
            document.querySelectorAll('.topCol')[j % COLS].style.backgroundColor = 'lightslategray'
        })
        cell.addEventListener('click', function () {
            
            if (!gameOver) {
                let n = COLS * (ROWS - 1) + (j % COLS)
                while (n >= 0) {
                    let x = cells[n]
                    if (x.style.backgroundColor == 'white') {
                        turn = turn == turn2 ? turn1 : turn2
                        x.style.backgroundColor = turn;
                        x.style.opacity = '1'
                        break;
                    }
                    n -= COLS

                }

                if (checkHorizontal() || checkVertical() || checkDiagonals1() || checkDiagonals2()) {
                    updateStatus(winner + " WINS!")
                    gameOver = true
                }
                else if (checkFull()) {
                    updateStatus("The board is full :(")
                    gameOver = true
                }

                if (gameOver) {

                    newGame = document.createElement('button')
                    newGame.id = 'newGame'
                    newGameText = document.createTextNode('Play again')
                    newGame.appendChild(newGameText)
                    document.body.appendChild(newGame)
                    newGame.addEventListener('click', function () {
                        for (i = 0; i < COLS * ROWS; i++) {
                            cells[i].style.backgroundColor = 'white'
                            cells[i].style.opacity = 0.4
                        }
                        document.getElementById('status').parentNode.removeChild(document.getElementById('status'))
                        document.getElementById('newGame').parentNode.removeChild(document.getElementById('newGame'))
                        gameOver = false
                    })


                }
            }
        })

    }
    document.querySelector(".container").appendChild(row)
}
for (let i = 0; i < COLS; i++) {
    let topCol = document.createElement('div')
    topCol.className = "topCol"
    topRow.appendChild(topCol)

}

let cells = document.querySelectorAll('.col')

function checkHorizontal() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS - 3; j++) {
            let startingCell = j + (i * COLS)
            let winningCells = [startingCell, startingCell + 1, startingCell + 2, startingCell + 3]
            let winningColours = winningCells.map(x => cells[x].style.backgroundColor)
            if (winningColours.every((val, i, arr) => val == arr[0]) && winningColours[0] != "white") {
                winner = winningColours[0]
                return true
            }

        }
    }
    return false
}

function checkVertical() {
    for (let i = 0; i < ROWS - 3; i++) {
        for (let j = 0; j < COLS; j++) {
            let startingCell = j + (i * COLS)
            let winningCells = [startingCell, startingCell + COLS, startingCell + COLS*2, startingCell + COLS*3]
            let winningColours = winningCells.map(x => cells[x].style.backgroundColor)
            if (winningColours.every((val, i, arr) => val == arr[0]) && winningColours[0] != "white") {
                winner = winningColours[0]
                return true
            }
        }
    }
    return false
}

function checkDiagonals1() {
    for (let i = 0; i < ROWS - 3; i++) {
        for (let j = 0; j < COLS - 3; j++) {
            let startingCell = j + (i * COLS)
            let winningCells = [startingCell, startingCell + COLS + 1,
                                startingCell + COLS * 2 + 2, startingCell + COLS * 3 + 3]
                let winningColours = winningCells.map(x => cells[x].style.backgroundColor)
                if (winningColours.every((val, i, arr) => val == arr[0]) && winningColours[0] != "white") {
                    winner = winningColours[0]
                    return true
            }
        }
    }
    return false
}

function checkDiagonals2() {
    for (let i = 0; i < ROWS - 3; i++) {
        for (let j = 3; j < COLS; j++) {
            let startingCell = j + (i * COLS)
            let winningCells = [startingCell, startingCell + COLS - 1,
                                startingCell + COLS * 2 - 2, startingCell + COLS * 3 - 3]
                let winningColours = winningCells.map(x => cells[x].style.backgroundColor)
                if (winningColours.every((val, i, arr) => val == arr[0]) && winningColours[0] != "white") {
                    winner = winningColours[0]
                    return true
            }
        }
    }
    return false
}

function checkFull() {
    for (i = 0; i < COLS * ROWS; i++) {
        if (cells[i].style.backgroundColor == 'white') {
            return false
        }
    }
    return true
}

function updateStatus(text) {
    let x = document.createElement('h1')
    x.id = 'status'
    let y = document.createTextNode(text)
    x.appendChild(y)
    document.body.appendChild(x)
}
