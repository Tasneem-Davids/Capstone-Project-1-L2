import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import {Route, Link} from 'react-router-dom';
import snake from './snake.png';

function Instructions(){

    const instructions = ["Use your keyboard arrows to move the snake in the direction of the mouse (grey cube).", "Each mouse you catch will cause him to grow and you will earn 20 points.", "Whatever you do, do not let him crash into the walls or it's game over.", "See how much you can make him grow and how high you can set your score before you crash!"];
    /*Here I created an array of instruction props */

    let instruct = instructions.map(function(instruction){/*Here I used the map function to return each instruction as a bullet point */
    return <li style={{marginBottom:"10px", fontSize:"20px"}}>{instruction}</li>
    })

   return(
       <div style={{margin:"40px"}}>{/*Here I added an image and some info using the above code as a prop in the list tag (ul)*/}
           <Image style={{width:"300px", borderRadius:"50%"}} src={snake} roundedCircle/>
           <h1 style={{fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontSize:"60px", marginBottom:"30px", color:"rgb(99, 163, 3)"}}><b>Remember!</b></h1>
           <ul style={{textAlign:"left", marginLeft:"300px", marginBottom:"40px"}}>{instruct}</ul>
           <Route>{/*I added a "LET'S PLAY" button which takes you to the game */}
               <Link to={"/Game"}><Button style={{height:"50px", width:"100px", fontSize:"15px", border:"1px solid rgb(27, 219, 27)", backgroundColor:"rgb(191, 253, 191)", color:"rgb(99, 163, 3)", borderRadius:"5px"}}>LET'S PLAY</Button></Link>
           </Route>
       </div>
   );
}

export default Instructions;