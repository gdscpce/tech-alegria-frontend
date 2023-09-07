import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./problemlist.scss";
import { User } from '../../constants/userObject';

export default function ProblemList() {
    const [tabState, setTabStatus] = useState(true);
    const [problems, setProblems] = useState([]);
    const [currentProblem, setCurrentProblem] = useState({});
    const [ismodalOpened, setModalVisibility] = useState(false);
    const [currentProblemOutput, setCurrentProblemOutput] = useState();
    useEffect(() =>  {
        if(User._id) {
            axios.get('http://localhost:4000/api/v1/problems')
            .then((response) => {
                setProblems(response.data.data);
            })
            .catch((err) => {
                console.log("Error fetchning problems", err);
                toast.error('Error Loading Problems', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    logoutUser();
                }, 3000)
            })
        } else {
            axios.get('http://localhost:4000/api/v1/logout')
            .then(() => {
                window.location.href = '/auth';
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, []);
    function logoutUser() {
        if(window.confirm("Are you Sure You want to Logout?")) {
            const toaster = toast.loading('Please Wait...', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            axios.get('http://localhost:4000/api/v1/logout')
            .then(() => {
                toast.update(toaster, {render: "Logout Successful", type: "success", isLoading: false, autoClose: true});
                window.location.href = '/auth';
            })
            .catch((err) => {
                toast.update(toaster, {render: "Cannot Log you out", type: "error", isLoading: false, autoClose: true});
                console.log(err);
            })
        }
    }
    function redirectToProblem(externalLink) {
        window.location.href = externalLink;
    }
    function openModal(index) {
        console.log(currentProblem);
        setCurrentProblem(problems[index]);
        setModalVisibility(true);
    }
    function MapProblemList() {
        return problems.map((data, index) => {
            return (
                <div key={index} className="challenge locked active">
                    <h3>{data.title}</h3>
                    <div className='buttons'>
                    <button className='btn btn-unlock' onClick={() => openModal(index)}>Unlock</button>
                    <button className='btn btn-link' onClick={() => redirectToProblem(data.redirectURL)}></button>
                    </div>
                </div>
            )
        })
    }
    function authenticateTestCase() {
        if (currentProblemOutput == currentProblem.specialTestCaseOutput) {
            User.score = User.score + 100;
            toast.success('Wohooooo! You Got it Right', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setModalVisibility(false);
        } else {
            toast.error('Oops! Wrong Answer', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
  return (
    <>
        <div className={ismodalOpened ? "modal show" : "modal"}>
            <modal className="modal-backdrop"></modal>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Problem Statement</h2>
                        <button className="btn btn-close" onClick={() => setModalVisibility(false)}>&times;</button>
                    </div>
                    <div className="modal-body testcase">
                        <label>Custom Test Case</label>
                        <textarea className='testcase__input' disabled value={currentProblem.specialTestCaseInput}></textarea>
                        <label>Output</label>
                        <div className='output'>
                            <textarea className='testcase__output' placeholder='Place Your Output Here!' onChange={(e) => setCurrentProblemOutput(e.target.value)}></textarea>
                            <div className="testcase__status">
                                <label>Status</label>
                                {currentProblemOutput ? 
                                    currentProblemOutput == currentProblem.specialTestCaseOutput ?
                                        <span className='passed'>Testcase Passed</span> :
                                        <span className='failed'>Testcase Failed</span>
                                    :
                                    <span>Pending</span>
                                }
                            </div>
                            <button className='btn btn-submit' onClick={authenticateTestCase} disabled={!currentProblemOutput}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='problem'>
            <div className="left">
                <div className="timer">
                    <button className="btn timer__title">00:24:32</button>
                    <div className="timer__desc">Note: The whole event is 2-hr long, you don't have to focus on the time, you will get reminders after each 30 mins with the remaining time</div>
                </div>
                <div className="challenges">
                    <div className="challenges__title">Challenges</div>
                    <div className="challenges__list">
                        {MapProblemList()}
                        {/* <div className="challenge locked active">
                            <h3>Problem Statement 1</h3>
                            <button className='btn' onClick={() => redirectToProblem('https://www.hackerrank.com/challenges/deque-stl/problem')}></button>
                        </div>
                        <div className="challenge active failed">
                            <h3>Problem Statement 1</h3>
                            <button className='btn' onClick={() => redirectToProblem('https://www.hackerrank.com/challenges/deque-stl/problem')}></button>
                        </div>
                        <div className="challenge active passed">
                            <h3>Problem Statement 1</h3>
                            <button className='btn' onClick={() => redirectToProblem('https://www.hackerrank.com/challenges/deque-stl/problem')}></button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="right">
                <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="colored"
                />
                <button className='btn right__logout' onClick={logoutUser}>Logout</button>
                <div className="right__toggle">
                    <button className={tabState ? 'btn active': 'btn'} onClick={() =>setTabStatus(true)}>Rules</button>
                    <button className={tabState ? 'btn': 'btn active'} onClick={() =>setTabStatus(false)}>Details</button>
                </div>
                <div className="right__content">
                    <ul className={tabState ? "tab show" : "tab"} id='rules-content'>
                        <li>Lorem ipsum dolor sit amet consectetur adipiscing elit fames magna cursus, parturient egestas auctor at sociosqu leo nulla netus. </li>
                        <li>Placerat vehicula nibh faucibus rutrum aliquam condimentum pellentesque, aptent dui molestie quisque sem phasellus cum malesuada, a hac litora venenatis sodales ridiculus. </li>
                        <li>Lorem ipsum dolor sit amet consectetur adipiscing elit fames magna cursus, parturient egestas auctor at sociosqu leo nulla netus. </li>
                        <li>Placerat vehicula nibh faucibus rutrum aliquam condimentum pellentesque, aptent dui molestie quisque sem phasellus cum malesuada, a hac litora venenatis sodales ridiculus. </li>
                        <li>Lorem ipsum dolor sit amet consectetur adipiscing elit fames magna cursus, parturient egestas auctor at sociosqu leo nulla netus. </li>
                        <li>Placerat vehicula nibh faucibus rutrum aliquam condimentum pellentesque, aptent dui molestie quisque sem phasellus cum malesuada, a hac litora venenatis sodales ridiculus. </li>
                        <li>Lorem ipsum dolor sit amet consectetur adipiscing elit fames magna cursus, parturient egestas auctor at sociosqu leo nulla netus. </li>
                    </ul>
                    <div className={!tabState ? "tab show" : "tab"}>
                        <div className="points"><b>Name</b>{User.name}</div>
                        <div className="points"><b>College</b>Pillai College Engineering, Panvel</div>
                        <div className="points"><b>Email</b>{User.email}</div>
                        <div className="points points--large"><b>Score</b><span>{User.score}</span></div>
                        <p>Note: Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, per luctus ligula dapibus magnis maecenas praesent, urna facilisis mollis montes ridiculus eros litora.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
