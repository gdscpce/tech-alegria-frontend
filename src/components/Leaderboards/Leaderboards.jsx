import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboards.scss";
import { endpoint } from "../../constants/Constants";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios
      .get(endpoint + "leaderboard")
      .then((response) => {
        let arr = response.data.data;
        arr = arr.sort(compare_by_score);
        arr = arr.sort(compare_by_penalty);
        setLeaderboard(arr);
      })
      .catch((err) => {
        console.log("error fetching leadercoard", err);
      });
  }, []);

  // Comparing based on the property item
  function compare_by_score(a, b) {
    // a should come before b in the sorted order
    if (a.score > b.score) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.score < b.score) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }
  //Comparing based on the property qty
  function compare_by_penalty(a, b) {
    // a should come before b in the sorted order
    if (a.score == b.score && a.penalty < b.penalty) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.score == b.score && a.penalty > b.penalty) {
      return 1;
      // a and b are the same
    } else {
      return 0;
    }
  }

  function MapUsers() {
    function mapTimings(props) {
      let tds = [];
      for (let i = 0; i < 5; i++) {
        if (props.time[i]) {
          tds.push(
            <td key={i}>
              <small className="result">
                <span>+</span>
                {Math.floor(props.time[i].submissionTime / 60) +
                  ":" +
                  (props.time[i].submissionTime % 60)}
              </small>
            </td>
          );
        } else {
          tds.push(<td key={i}></td>);
        }
      }
      return tds;
    }
    return (
      leaderboard &&
      leaderboard.map((data, index) => {
        return (
          <tr key={index}>
            <td>{data && data.userName}</td>
            <td>{data && data.score / 100}</td>
            <td>{data && data.penalty}</td>
            {data && mapTimings(data)}
          </tr>
        );
      })
    );
  }
  return (
    <div className="leaderboards">
      <div className="table-responsive">
        {leaderboard.length ? (
          <table cellPadding={19} cellSpacing={0}>
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
            <tbody>{MapUsers()}</tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
