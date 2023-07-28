import React, { useState, useEffect } from "react";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { FakeData } from './FakeData';
import { listCategory } from '../../Function/Category';
import { useSelector } from "react-redux";
import { Hardlog } from "../../Function/Person"

const RadarChartHard = () => {
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID
    const Token = user.userStore.user.token

    const [dataExamHard, setDataExamHard] = useState([]);
    const [category, setCat] = useState([]);
    const [dataArray, setDataArray] = useState([]);
    const [track, setTrack] = useState(false);
    const [disBtn, setDisBtn] = useState(false);

    // Using an object to manage dynamic state
    const [dynamicStates, setDynamicStates] = useState({});
    const [Stagess, setStagess] = useState(0);
    // const Categorydata = []
    // const [catScore, setcatScore] = useState(0);
    // const [cat1Score, setCat1Score] = useState(0);
    // const [cat2Score, setCat2Score] = useState(0);
    // const [cat3Score, setCat3Score] = useState(0);
    // const [cat4Score, setCat4Score] = useState(0);
    // const [cat5Score, setCat5Score] = useState(0);
    // const [cat6Score, setCat6Score] = useState(0);

    useEffect(() => {
        loadExamData(Userid)
        setTrack(false)
    }, [Userid, track])

    useEffect(() => {
        setTrack(false)
    }, [track])

    useEffect(() => {
        if(Stagess == 1){
            setStage()
            console.log("DDD")
        }
    }, [Stagess])

    useEffect(() => {
        console.log(dynamicStates)
    }, [dynamicStates])
  

    function loadExamData(id) {
        Hardlog(id).then((res) => {
            setDataExamHard(res.data);
        });
        listCategory(id).then(res => {
            /*console.log(res.data)*/
            setCat(res.data)
            setStagess(1)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const DataName = Object.values(dataExamHard);
    // console.log(DataName)
   async function setStage(){
        category.map((data2) => {
            handleAddState(data2.name)
        })
    }

    async function setScore() {
        DataName.map((data) => {
            category.map((data2) => {
                if(data.Category == data2.name){
                    setDynamicStates((prevStates) => ({
                        ...prevStates,
                        [data2.name]: prevStates[data2.name] + 1,
                      }));
                      
                }
            })
            }
        )
        setTrack(true);
    }

    const handleAddState = (stateName) => {
        setDynamicStates((prevStates) => ({
          ...prevStates,
          [stateName]: 0  , // Set an initial value for the new state
        }));
      };

    const handleUpdateState = (stateName) => {
        setDynamicStates((prevStates) => ({
          ...prevStates,
          [stateName]: prevStates[stateName] + 1,
        }));
      };

    const scoreData = {
        labels: category.map((data) => data.name),
        datasets: [{
            label: 'Score',
            data: Object.values(dynamicStates),
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        },]
    };

    return (<>
        <div>
            <button id="chartBtn" className="btn btn-primary" disabled={disBtn} onClick={() => [setScore(), setDisBtn(true), ]}>See chart</button>
            <Radar data={scoreData}></Radar>
        </div>
        
         <div>
      {/* <button onClick={() => handleAddState('count1')}>Add State 1</button>
      <button onClick={() => handleAddState('count2')}>Add State 2</button> */}
{/* 
      {Object.entries(dynamicStates).map(([stateName, stateValue]) => (
        <div key={stateName}>
          <p>{stateName}: {stateValue}</p>
          <button onClick={() => handleUpdateState(stateName)}>Increment</button>
        </div>
      ))} */}
    </div>
        </>
        
    )
}

export default RadarChartHard
