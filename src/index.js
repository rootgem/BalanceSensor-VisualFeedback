import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { getDatabase, ref, connectDatabaseEmulator, onChildAdded} from "firebase/database"
import Chart from 'chart.js/auto'
import annotationPlugin from 'chartjs-plugin-annotation'

let firebaseConfig = {
    apiKey: "AIzaSyCzmaqxsTf3ZYwE-Sw9rEum5i2gdEhkDY4",
    authDomain: "perancangan-80525.firebaseapp.com",
    databaseURL: "https://perancangan-80525-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "perancangan-80525",
    storageBucket: "perancangan-80525.appspot.com",
    messagingSenderId: "1035341961277",
    appId: "1:1035341961277:web:134ea7ffa971fe14ff3254"
  }

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)


if (location.hostname === "localhost") {
  connectDatabaseEmulator(db, "localhost", 9000)
} 


// convert epochtime to JavaScript Date object
function epochToJsDate(epochTime){
  return new Date(epochTime*1000)
}

// convert time to human-readable format YYYY/MM/DD HH:MM:SS
function epochToDateTime(epochTime){
  var epochDate = new Date(epochToJsDate(epochTime))
  var dateTime = epochDate.getFullYear() + "/" +
  ("00" + (epochDate.getMonth() + 1)).slice(-2) + "/" +
  ("00" + epochDate.getDate()).slice(-2) + " " +
  ("00" + epochDate.getHours()).slice(-2) + ":" +
  ("00" + epochDate.getMinutes()).slice(-2) + ":" +
  ("00" + epochDate.getSeconds()).slice(-2)
  
  return dateTime
}

const email = "18319021@std.stei.itb.ac.id"
const password = "test-perancangan"


async function user(auth, email, password){
  const user = await signInWithEmailAndPassword(auth, email, password)
  return user.user.uid
}

const ctx = document.getElementById('plot')
const data_chart = [];

Chart.register(annotationPlugin)

var plot = new Chart (ctx, {
  type:"scatter",
  data: {
    datasets: [{
      label: 'Peta Data Akselerasi',
      data: data_chart,
      backgroundColor: 'rgb(183, 210, 235)',
      showLine: true,
      tension: 0.5
    }],
  },
  options : {
    responsive: true,
    aspectRatio: 1,
    scales: {
      x : {
        type : 'linear',
        position : 'bottom',
        min: -16,
        max: 16,
      },
      y : {
        type : 'linear',
        min: -16,
        max: 16,
      }
    },
    plugins:{
      annotation: {
        annotations: {
          ellipse1: {
            type: 'ellipse',
            xMin: -0.003,
            xMax: 0.003,
            yMin: 0.003,
            yMax: -0.003,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          }
        }
      }
    }
  }
})



const table = document.getElementById('data-readings')

async function getData(){
  const uid =  await user(auth, email, password)

  const dbRef = ref(db,'/UsersData/'+uid+'/readings')
  onChildAdded(dbRef, (snapshot) => {
    var jsonData = snapshot.toJSON()
    var x = jsonData.accelerometer.x
    var y = jsonData.accelerometer.y
    var z = jsonData.accelerometer.z
    var timestamp = jsonData.timestamp
    
    var row = table.insertRow(-1)
    var cell_0 = row.insertCell(0)
    var cell_1 = row.insertCell(1)
    var cell_2 = row.insertCell(2)
    var cell_3 = row.insertCell(3)

    cell_0.innerHTML = epochToDateTime(timestamp)
    cell_1.innerHTML = x
    cell_2.innerHTML = y
    cell_3.innerHTML = z

    data_chart.push({
      x : x, 
      y : z
    })
    
    plot.update()
  })
  console.log(data_chart)
}


getData()


