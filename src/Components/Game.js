import React, { Component } from 'react';
import './Game.css';
import Button from 'react-bootstrap/Button';
import {Route, Link} from 'react-router-dom';
import sad from './sad.gif';

export default class Game extends Component {
  state = {/*Set the states of the props */
    tickTime: 200,
    rows: 25,
    cols: 25,
    grid: [],
    food: {},
    snake: {
      head: {},
      tail: [],
    },
    currentDirection: 'right',
    die: false,
    score: 0,
    scoreFactor: 10,
  };

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);/*Bind the functions */
    this.restart = this.restart.bind(this);
  }

  getRandomGrid() {
    return {
      row: Math.floor((Math.random() * this.state.rows)),
      col: Math.floor((Math.random() * this.state.cols))
    }
  }

 
  getCenterOfGrid() {/*This is to start the snake and food at the center */
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.cols - 1) / 2),
    }
  }

  resetGrid(state = {}, sendBack = false) {

    if (!Object.keys(state).length) {
      state = this.state;
    }

    const grid = [];/*The following handles the game information through out the game */
    const {
      rows,
      cols,
      food,
      snake
    } = state;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isFood = (food.row === row && food.col === col);
        const isHead = (snake.head.row === row && snake.head.col === col);
        let isTail = false;
        snake.tail.forEach(t => {
          if (t.row === row && t.col === col) {
            isTail = true;
          }
        })

        grid.push({
          row,
          col,
          isFood,
          isHead,
          isTail,
        })
      }
    }

    if (sendBack) {
      return grid;
    } else {
      this.setState({
        grid
      })
    }
  }

  gameTick() {/*This is for the game tick */
    this.setState((state) => {
      let {
        currentDirection,
        snake,
        food
      } = state;
      let {
        tail
      } = snake;

      const {
        row,
        col
      } = state.snake.head;
      let head = {
        row,
        col
      };

      
      if (state.die) {/*When the game is over stop the tick */
        clearInterval(window.fnInterval);
      }

    
      tail.unshift({/*This is for when the snake eats */
        row: head.row,
        col: head.col,
      })

      
      if (head.row === state.food.row && head.col === state.food.col) {
        food = this.getRandomGrid();
      } else {
        tail.pop();
      }

      
      switch (currentDirection) {/*This is for the movement of the snake */
        case 'left':
          head.col--;
          break;

        case 'up':
          head.row--;
          break;

        case 'down':
          head.row++;
          break;

        case 'right':
        default:
          head.col++;
          break;
      }

      const newState = {
        ...state,
        food,
        snake: {
          head,
          tail
        }
      }

      
      let die = false;/* In new state, check if die conditions are met*/
      if (newState.snake.head.row < 0 ||
        newState.snake.head.row >= this.state.rows ||
        newState.snake.head.col < 0 ||
        newState.snake.head.col >= this.state.rows
      ) {
        die = true;
      }

      const grid = this.resetGrid(newState, true);
      const score = newState.snake.tail.length * newState.scoreFactor;

      return {
        ...newState,
        die,
        grid,
        score,
      }
    });

  }

  handleKeyPress(e) {/*This handles the controls */
    let {
      currentDirection
    } = this.state;

    switch (e.keyCode) {
      case 37:
        currentDirection = 'left';
        break;

      case 38:
        currentDirection = 'up';
        break;

      case 39:
      default:
        currentDirection = 'right';
        break;

      case 40:
        currentDirection = 'down';
        break;
    }

    const newState = {
      ...this.state,
      currentDirection,
    }
    const grid = this.resetGrid(newState, true);


    this.setState(state => {
      return {
        ...newState,
        grid
      }
    })
  }

  componentDidMount() {

    document.body.addEventListener('keydown', this.handleKeyPress);

    this.setState((state) => {
      const newState = {
        ...state,
        food: this.getRandomGrid(),
        snake: {
          head: this.getCenterOfGrid(),
          tail: state.snake.tail
        }
      };
      const grid = this.resetGrid(newState, true);
      return {
        ...newState,
        grid,
      }
    });

    this.resetGrid();

   
    window.fnInterval = setInterval(() => { /* Set tick of the snake*/
      this.gameTick();
    }, this.state.tickTime);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyPress);
    clearInterval(window.fnInterval);
  }

  restart(){/*This is to restart the game */
    window.location.reload(false);
  }

  render() {
    let gridContent = this.state.grid.map((grid) => {{/*This is for the grid of the game*/}
      return <div
        key={grid.row.toString() + '-' + grid.col.toString()}
        className={
          grid.isHead
          ? 'gridItem is-head' : grid.isTail
          ? 'gridItem is-tail' : grid.isFood
          ? 'gridItem is-food' : 'gridItem'
        }></div>
    });
    if (this.state.die) {{/*This is for when the game is over*/}
      gridContent = <div className="grid-message">
        <h1 style={{color:"rgb(27, 219, 27)", fontSize:"40px", marginTop:"100px"}}>GAME OVER</h1>
        <img style={{width:"200px", marginTop:"20px", marginRight:"20px"}} src={sad}/>
      </div>;
    };
    return (
      <div className="snake-container wrapper">
        <div className="grid-header">
          <h1 style={{color:"rgb(27, 219, 27)", fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>YOUR SCORE: {this.state.score}</h1>
        </div>
        <div className="grid">{gridContent}</div>
        <div style={{marginLeft:"800px", marginTop:"-500px"}}>{/*The following buttons are for restarting which is using a function, the other buttton is simply a link to the instructions */}
        <Button style={{marginTop:"50px", height:"50px", width:"100px", fontSize:"15px", border:"1px solid rgb(27, 219, 27)", backgroundColor:"rgb(191, 253, 191)", color:"rgb(99, 163, 3)", borderRadius:"5px", marginRight:"20px"}} variant="outline-success" onClick={this.restart}>RESART</Button>
        <Route>
          <Link to={"/Instructions"}><Button style={{marginTop:"20px", height:"50px", width:"100px", fontSize:"15px", border:"1px solid rgb(27, 219, 27)", backgroundColor:"rgb(191, 253, 191)", color:"rgb(99, 163, 3)", borderRadius:"5px"}} variant="outline-success">HELP</Button></Link>
        </Route>
        </div>
      </div>
    );
  }
}
