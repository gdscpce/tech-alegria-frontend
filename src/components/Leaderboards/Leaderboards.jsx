import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./leaderboards.scss";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [problemLinks, setProblemLinks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/leaderboard")
      .then((response) => {
        setLeaderboard(response.data.data);
      })
      .catch((err) => {
        console.log("error fetching leadercoard", err);
      })

    getProblemLinks();
  }, []);
  async function getProblemLinks() {
    axios.get("http://localhost:4000/api/v1/problems")
      .then((response) => {
        response.data.data.map((links, index) => {
          problemLinks.push(links.redirectURL);
        })
      })
      .catch((err) => {
        console.log("Error getting links", err);
      });
  }
  function MapUsers() {
    function mapTimings(props) {
      return props.time.map((time, i) => {
        return (
          <td key={i}><small className="result"><span>+</span>{time.submissionTime}</small></td>
        )
      })
    }
    return leaderboard.map((data, index) => {
      return (
        <tr key={index}>
          <td>UserName</td>
          <td>6</td>
          <td>{data.penalty}</td>
          <td></td>
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
              <th>*</th>
              <th><a href={problemLinks[0]}>A</a></th>
              <th><a href={problemLinks[1]}>B</a></th>
              <th><a href={problemLinks[2]}>C</a></th>
              <th><a href={problemLinks[3]}>D</a></th>
              <th><a href={problemLinks[4]}>E</a></th>
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
