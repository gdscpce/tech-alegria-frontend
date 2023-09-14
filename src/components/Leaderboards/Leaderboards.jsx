import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./leaderboards.scss";
import { endpoint } from '../../constants/Constants';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    axios.get(endpoint + "leaderboard")
      .then((response) => {
        setLeaderboard(response.data.data);
      })
      .catch((err) => {
        console.log("error fetching leadercoard", err);
      })
  }, []);
  function MapUsers() {
    function mapTimings(props) {
        let tds = [];
        for(let i = 0; i < 5; i++) {
          if(props.time[i]) {
            tds.push(<td key={i}><small className="result"><span>+</span>{props.time[i].submissionTime}</small></td>);
          } else {
            tds.push(<td key={i}></td>)
          }
        }
      return tds;
    }
    return leaderboard.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.userName}</td>
          <td>6</td>
          <td>{data.penalty}</td>
          {mapTimings(data)}
        </tr>
      )
    })
  }
  return (
    <div className='leaderboards'>
      <div className="h1">2:00:56</div>
      <div className="table-responsive">
        <table cellPadding={15} cellSpacing={0}>
          <thead>
            <tr>
              <th>WHO</th>
              <th>=</th>
              <th>Penalty</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            {MapUsers()}
          </tbody>
        </table>
      </div>
    </div>
  )
}
