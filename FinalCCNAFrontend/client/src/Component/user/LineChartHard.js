import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FakeData } from './FakeData';
import { useSelector } from "react-redux";
import { Hardlog } from "../../Function/Person"
import Dropdown from 'react-bootstrap/Dropdown';

const LineChartHard = () => {
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID
    const [select, setSelect] = useState("");
    const [dataExamHard, setDataExamHard] = useState([]);

    // console.log("Uniqe",unique)
    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    useEffect(() => {
        loadExamData(Userid)

    }, [])
  

    function loadExamData(id) {
        Hardlog(id).then((res) => {
            setDataExamHard(res.data);
        });
        /*
        const payload = {
          Index: localStorage.Index
      }
      EastlogS(id, payload).then((res) => {
          setDataExamEasy(res.data.Examname);

      });*/
    }

    const DataName = Object.values(dataExamHard);
    const unique = DataName.filter(
        (obj, index) =>
        DataName.findIndex((item) => item.Examname === obj.Examname) === index
      )
    const filterExamList = DataName.filter((DataName) => {
        if (select === "") {
            return DataName[0];
        } else {
            return DataName.ExamObjectid === select;
        }
    })
    const [avgscore,setavgscore] = useState("-")
   async function averagescore(){
        let i = 0
        let score = 0
        while(i < filterExamList.length){
           score = score + filterExamList[i].Score
           i++
        }
        if(i = filterExamList.length){
            var sum = 0
            sum = score/i
            setavgscore(preve => Math.floor(sum))
        }
    }
    useEffect(() => {
        averagescore()
    }, [select])
    var i = 0
    const labelsL = filterExamList.map((data) => `ครั้งที่ ${i +=1}` );
    const dataHardL = {
        labels: labelsL,
        datasets: [{
            label: 'คะแนนที่ทำได้',
            data: filterExamList.map((data) => data.Score),
            fill: true,
            backgroundColor: [
                "rgba(75,192,192,0.45)"
            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
            borderWidth: 2,
        }]
    };
    const options = {
        scales: {
            x: {
              display: true,
              stacked: true,
              title: {
                display: true,
                text: 'จำนวนครั้ง'
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'คะแนน'
              },
              min: 0,

            }
          }
    }
    var i = 0
    const labelsS = filterExamList.map((data) => `ครั้งที่ ${i +=1}` );
    const dataHardS = {
        labels: labelsS,
        datasets: [{
            label: 'คะแนนที่ทำได้',
            data: filterExamList.map((data) => data.Score),
            fill: true,
            backgroundColor: [
                "rgba(75,192,192,0.45)"
            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
            borderWidth: 2,
        }]
    };
    const [catText, setDropDownText] = useState("Select Exame");
    return (
        <>
        <div className="cat-search-container">
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-cat">
                        {catText}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {unique.map((item, catindex) =>
                            <Dropdown.Item key={catindex} as="button" onClick={(id) => { setSelect(item.ExamObjectid); setDropDownText(item.Examname);}}>{item.Examname}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                &nbsp;
            </div>
            <>
            &nbsp; &nbsp; <h5>Your  <span style={{ color: "red" }}>Hard</span> average score is {avgscore}</h5>
            </>
        <div>
            {DataName.length > 5 ?
                <Line data={dataHardL} options={options}></Line>
                :
                <Line data={dataHardS} options={options}></Line>
            }
        </div>
        </>
    )
}

export default LineChartHard
