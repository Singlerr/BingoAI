import React from "react";
import {Square} from './Square.js'
import {Brain} from './Brain.js'

let game
export class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(25).fill(0),
            verticalBingo: Array(5).fill(false),
            horizontalBingo: Array(5).fill(false),
            step: 0

        }
    }
    reset(){
        this.setState({
            squares: Array(25).fill(0),
            verticalBingo: Array(5).fill(false),
            horizontalBingo: Array(5).fill(false),
            step: 0
        })
        this.game = new Brain(this.props)
    }
    checkBingoByPosition(i) {
        let squares= this.state.squares.slice();
        return this.checkHorizontalBingo(i,  squares)[0] ||
            this.checkVerticalBingo(i,  squares)[0]
    }
    checkHorizontalTotalBingo(i){
        let squares= this.state.squares.slice();
        let horizontalBingo = this.state.horizontalBingo.slice()
        let b = false

        let pos = Array(i,i-1,i+1,i-5,i+5)

        for(let p in pos){
            let {bingo,index} = this.checkHorizontalBingo(p,squares)
            b = b || bingo
            squares[index] = bingo
        }
        return [b,squares]
    }
    checkVerticalTotalBingo(i){
        let squares= this.state.squares.slice();
        let horizontalBingo = this.state.verticalBingo.slice()
        let b = false

        let pos = Array(i,i-1,i+1,i-5,i+5)

        for(let p in pos){
            let {bingo,index} = this.checkVerticalBingo(p,squares)
            b = b || bingo
            if(bingo)
                squares[index] = bingo
        }
        return [b,squares]
    }
    checkBingo(i) {
        let {hBingo,hIndexes} = this.checkHorizontalTotalBingo(i)
        let {vBingo,vIndexes} = this.checkVerticalTotalBingo(i)
        return [hBingo||vBingo,hIndexes,vIndexes]
    }

    checkHorizontalBingo(i, squares) {
        let start = i / 5
        for(let k = start;k<=start+4;k++){
            if(squares[k] != '1') {
                return [false,-1]
            }
        }
        return [true,start]
    }

    checkVerticalBingo(i, squares) {
        let start = i % 5;
        for(let k = start;k<=24;k+=5)
            if(squares[k] != '1')
                return [false,-1]
        return [true,start]
    }

    handleClick(i) {
        let squares = this.state.squares.slice();
        if (squares[i] == 1) {
            return false;
        }
        if ((i + 1) / 5 === 1) {
            let down = squares[i + 5];
            if ((i + 1) % 5 === 1) {
                let right = squares[i + 1]

                if (right == 1)
                    squares[i + 1] = 0
                else
                    squares[i + 1] = 1
                if (down == 1)
                    squares[i + 5] = 0
                else
                    squares[i + 5] = 1
            } else if ((i + 1) % 5 === 0) {
                let left = squares[i - 1]

                if (left == 1)
                    squares[i - 1] = 0
                else
                    squares[i - 1] = 1
                if (down == 1)
                    squares[i + 5] = 0
                else
                    squares[i + 5] = 1
            } else {
                let right = squares[i + 1]

                if (right == 1)
                    squares[i + 1] = 0
                else
                    squares[i + 1] = 1
                if (down == 1)
                    squares[i + 5] = 0
                else
                    squares[i + 5] = 1
                let left = squares[i - 1]

                if (left == 1)
                    squares[i - 1] = 0
                else
                    squares[i - 1] = 1
                if (down == 1)
                    squares[i + 5] = 0
                else
                    squares[i + 5] = 1
            }
        } else if ((i + 1) / 5 === 5) {
            let up = squares[i - 5];
            if ((i + 1) % 5 === 1) {
                let right = squares[i + 1]
                if (right == 1)
                    squares[i + 1] = 0
                else
                    squares[i + 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
            } else if ((i + 1) % 5 === 0) {
                let left = squares[i - 1]
                if (left == 1)
                    squares[i - 1] = 0
                else
                    squares[i - 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
            } else {
                let right = squares[i + 1]
                if (right == 1)
                    squares[i + 1] = 0
                else
                    squares[i + 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
                let left = squares[i - 1]
                if (left == 1)
                    squares[i - 1] = 0
                else
                    squares[i - 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
            }
        } else {
            let up = squares[i - 5];
            let down = squares[i + 5];
            if ((i + 1) % 5 === 1) {
                let right = squares[i + 1]
                if (right == 1)
                    squares[i + 1] = 0
                else
                    squares[i + 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
                if (down == 1)
                    squares[i + 5] = 0
                else
                    squares[i + 5] = 1
            } else if ((i + 1) % 5 === 0) {
                let left = squares[i - 1]
                if (left == 1)
                    squares[i - 1] = 0
                else
                    squares[i - 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
                if (down == 1)
                    squares[i + 5] = 0
                else
                    squares[i + 5] = 1
            } else {
                let right = squares[i + 1]
                if (right == 1)
                    squares[i + 1] = 0
                else
                    squares[i + 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
                let left = squares[i - 1]
                if (left == 1)
                    squares[i - 1] = 0
                else
                    squares[i - 1] = 1
                if (up == 1)
                    squares[i - 5] = 0
                else
                    squares[i - 5] = 1
                if (down == 1)
                    squares[i + 5] = 0
                else
                    squares[i + 5] = 1
            }
        }
        squares[i] = 1
        return squares;
    }

    step(bestLoc){
        if(this.state.squares[bestLoc] == 1){
            this.reset()
            return
        }
        let squares = this.handleClick(bestLoc)
        this.setState({squares: squares},() => {
            let {bingo,hIndexes,vIndexes} =  this.checkBingo(bestLoc)
            //3의 배수 번째의 폭탄이면서 빙고가 만들어졌을 경우
            if(this.state.step % 3 === 0 && (this.numNewBingo(this.state.horizontalBingo,hIndexes) + this.numNewBingo(this.state.verticalBingo)) > 0){
                //게임 종료
                this.reset()
                return
            }
            this.game.giveReward(this.numNewBingo(this.state.horizontalBingo,hIndexes) + this.numNewBingo(this.state.verticalBingo))
            this.setState({squares:squares,verticalBingo:vIndexes,horizontalBingo:hIndexes,step:++this.state.step}, () => {
                this.game.think()
            })
        })
    }
    numNewBingo(preIndexes,indexes){
        //이전에 빙고였다가 지금은 빙고가 아닌 것 -> 의미없음
        //빙고가 아니었는데 빙고인것
        let result = Array(indexes.length)
        for(let i = 0;i<indexes.length;i++){
            result.push(! preIndexes[i] && indexes[i])
        }
        return result.filter((b) => b).length
    }
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            test={i}
            onClick={() => this.handleClick(i)}
        />;
    }
    initialize(){
        this.game = new Brain(this.props)
        this.game.initialize().then(() =>{
            for(let i = 0;i<3;i++)
                this.game.predict(this.game.predict(this.game.getStateTensor(this.game.getState())))
        })
        let p1 = this.getRandomInt(0,25)
    }

    render() {
        let divs = [];
        let k = 0
        for (let i = 0; i < 5; i++) {
            let board = [];
            for (let j = 0; j < 5; j++) {
                board.push(k++);
            }
            divs.push(board);
        }
        this.initialize()
        return (
            <div>
                {divs.map((e, i) => {
                    return (
                        <div className="board-row">
                            {e.map((e2, i2) =>
                                this.renderSquare(e2)
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }
}
