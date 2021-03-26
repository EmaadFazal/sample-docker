import './App.css';
import axios from 'axios'
import Players from './Components/Players';
function App() {
  // async function test(){
  //   const resposne =  await axios('node-app/player').then(res=>{
  //     console.log(res)
  //   })
  //   return resposne
  // }
  console.log(test())
  return (
    <div className="App">
    <Players />
    
    </div>
  );
}

export default App;
