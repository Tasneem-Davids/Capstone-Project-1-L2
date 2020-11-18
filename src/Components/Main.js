import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import {Route, Link} from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl';
import snake from './snake.png';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = { name: ''};/*Here I declared the state and binded the following functions */
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleNameChange(e){/*This function handles the input "name" of the user and sets the name state to that input. */
        this.setState({
            name : e.target.value
        })
        return ;
    }

    onSubmit(e){/*This function is for the submit button which is to welcome the user by name and show a button at the same time that would take them to the instructions */
        e.preventDefault();

        let name = this.state.name

        let output = document.getElementById("output");/*This is some javascript to output the welcome. The id "output is a div which you can find below*/

        let greeting = document.createElement('h2')
           greeting.innerHTML = "Welcome, " + name + "! Are you ready to play?"
           greeting.style.fontSize = "30px"
           greeting.style.color = "rgb(99, 163, 3)"


           output.appendChild(greeting);
/*--------------------------------------------------------------------------------------*/

           let play = document.getElementById("letsPlay");

           let button = document.createElement('button');/*This javascript is to create the button which will then be placed in a link tag below that will take the user to the instructions */
           button.textContent = "Start"
           button.style.height = "40px"
           button.style.width = "90px"
           button.style.fontSize = "20px"
           button.style.borderRadius = "5px"
           button.style.color = "rgb(99, 163, 3)"
           button.style.border = "1px solid rgb(27, 219, 27)"
           button.style.backgroundColor = "rgb(191, 253, 191)"

           play.appendChild(button);
    }

    render(){
        const name = this.state.name;

        return(
            <div className="Main">
                <Image style={{width:"300px", borderRadius:"50%"}} src={snake} roundedCircle/>
                <h1 style={{fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontSize:"50px", color:'rgb(99, 163, 3)'}}>Hey there, what'sss your name?</h1>
                <InputGroup style={{width:"400px", marginLeft:"540px", marginBottom:"20px"}}>
                <FormControl placeholder="Name" onChange={this.handleNameChange} name={name} style={{height:"30px", width:"300px", borderRadius:"5px", border:"1px solid rgb(27, 219, 27)", backgroundColor:"rgb(191, 253, 191)", fontSize:"18px"}}/>{/*This is the input for the user's name */}
                </InputGroup>
                <Button style={{marginBottom:"20px", height:"40px", width:"90px", fontSize:"20px", border:"1px solid rgb(27, 219, 27)",backgroundColor:"rgb(191, 253, 191)", color:"rgb(99, 163, 3)", borderRadius:"5px"}} onClick={this.onSubmit}>Submit</Button>
                <div id="output">{/*The following are the parents of the javascript I created before */}
                </div>
                <Route>
                <Link to={"/Instructions"} id="letsPlay">
                </Link>
                </Route>
            </div>
        );
    }
}

export default Main;