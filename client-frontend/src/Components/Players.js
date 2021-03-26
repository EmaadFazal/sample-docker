

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios'


function Players(){
    const [players, setPlayers] = useState([])
    useEffect(()=>{
        async function test(){
            const resposne =  await axios('http://api/player').then(res=>{
                setPlayers(res.data)
            })
            return resposne
          }
          test()
    },[])
   
    return(
        <div>
        <h1>Players</h1>
        
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
           {["Player","Position","Points","Score"].map(cat=>{
               return(<TableCell key = {cat}>{cat}</TableCell>)
           })}
          </TableRow>
        </TableHead>
        <TableBody>
         {players.map(player=>{
             return(<TableRow key = {player}>
                 <TableCell>{player.name}</TableCell>
                 <TableCell>{player.position}</TableCell>
                 <TableCell>{player.points}</TableCell>
                 <TableCell>{player.zScore.toFixed(2)}</TableCell>
             </TableRow>)
         })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    )
}

export default Players;