import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FakeData } from './FakeData';
import { useSelector } from "react-redux";
import { EastlogS, Easylog } from "../../Function/Person"
import Dropdown from 'react-bootstrap/Dropdown';
const LineChart = () => {
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID
    const [select, setSelect] = useState("");
    const [dataExamEasy, setDataExamEasy] = useState([]);



    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    useEffect(() => {
        loadExamData(Userid)

    }, [])


    function loadExamData(id) {
        Easylog(id).then((res) => {
            setDataExamEasy(res.data);
        });
        /*
        const payload = {
          Index: localStorage.Index
      }
      EastlogS(id, payload).then((res) => {
          setDataExamEasy(res.data.Examname);

      });*/
    }

    const DataName = Object.values(dataExamEasy);

    const unique = DataName.filter(
        (obj, index) =>
            DataName.findIndex((item) => item.Examname === obj.Examname) === index
    );


    const filterExamList = DataName.filter((DataName) => {
        if (select === "") {
            return DataName[0];
        } else {
            return DataName.ExamObjectid === select;
        }
    })
    const [avgscore, setavgscore] = useState("-")
    async function averagescore() {
        let i = 0
        let score = 0
        while (i < filterExamList.length) {
            score = score + filterExamList[i].Score
            i++
        }
        if (i = filterExamList.length) {
            var sum = 0
            sum = score / i
            setavgscore(preve => Math.floor(sum))
        }
    }
    useEffect(() => {
        averagescore()
    }, [select])
    /*console.log(DataName)*/
    // const [scoreData, setScoreData] = useState({

    //     labels: FakeData.map((data) => data.Category),
    //     datasets: [
    //         {
    //             label: "Score",
    //             data: FakeData.map((data) => data.Score),
    //             backgroundColor: "cyan",
    //             borderColor: "black",
    //             borderWidth: 2,
    //         }
    //     ]
    // })
    const labelsL = filterExamList.map((data) => data.Examname);
    const dataEasyL = {
        labels: labelsL,
        datasets: [{
            label: 'Score',
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
    const labelsS = filterExamList.map((data) => data.Examname);
    const dataEasyS = {
        labels: labelsS,
        datasets: [{
            label: 'Score',
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
        <div>
            <div className="cat-search-container">
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-cat">
                        {catText}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {unique.map((item, catindex) =>
                            <Dropdown.Item key={catindex} as="button" onClick={(id) => { setSelect(item.ExamObjectid); setDropDownText(item.Examname) }}>{item.Examname}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <>
                &nbsp; &nbsp; <h5>Your  <span style={{ color: "green" }}>Easy</span> average score is {avgscore}</h5>
            </>
            {DataName.length > 5 ?
                <Line data={dataEasyL}></Line>
                :
                <Line data={dataEasyS}></Line>
            }
        </div>
    )
}

export default LineChart
