const readXlsxFile = require('read-excel-file/node');

   // File path.
   const fields = []
   const players = []
   readXlsxFile('./FanGraphs_Leaderboard.xlsx').then((rows) => {
     for (i = 0 ; i < 26; i++){
         if(i<16|| (i>16 && i<22)|| i ==23){
             fields.push(rows[0][i])
         }
        }
         for (j = 1 ;j<rows.length;j++){
            const player = rows[j]
            let new_player = {}
            for (k = 0 ; k < 24 ; k ++){
                if(k<16){

                new_player[fields[k]]=player[k]
                }
                if (k>16 && k<22){
                    new_player[fields[k-1]]=player[k]
                }
                if( k ==23){
                    new_player[fields[k-2]]=player[k]
                }
            }
            players.push(new_player)

         }


     

   }).then(()=>{
    // console.log(fields)
    
const mongoose = require("mongoose");
const Baseball_player = require('./BaseballSchema')
mongoose
  .connect(
    'mongodb://mongo:27017/MLB',
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  console.log(players[0])
const test = new Baseball_player(players[0])
test.save()
for (i = 0 ; i <players.length;i++){
    (new Baseball_player(players[i])).save()
}
   })
   

