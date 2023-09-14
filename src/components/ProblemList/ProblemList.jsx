import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "./problemlist.scss";
import 'react-toastify/dist/ReactToastify.css';
import { deleteUserObject, endpoint, getUserObject } from '../../constants/Constants';
import { useTimer } from 'react-timer-hook';

export default function ProblemList() {
    const [tabState, setTabStatus] = useState(true);
    const [problems, setProblems] = useState([]);
    const [ismodalOpened, setModalVisibility] = useState(false);
    const [currentProblemOutput, setCurrentProblemOutput] = useState();
    const [currentUser, updateCurrentUser] = useState(getUserObject());
    const [currentIndex, setCurrentIndex] = useState(0);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 7200); // 2 hr timer
    useEffect(() => {
        if (currentUser) {
            axios.get(endpoint + 'problems')
                .then((response) => {
                    var updatedData;
                    if (problems.length) {
                        updatedData = response.data.data.map((item, index) => ({ ...item, state: problems[index].state }));
                    } else {
                        updatedData = response.data.data.map(item => ({ ...item, state: 'locked' }));
                    }
                    setProblems(updatedData);
                    getUserScore();
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
            axios.get(endpoint + 'logout')
                .then(() => {
                    window.location.href = '/auth';
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, []);
    async function getUserScore() {
        await axios.get(endpoint + 'getScore/' + currentUser._id)
            .then((response) => {
                updateCurrentUser({ ...currentUser, score: response.data.score });
            })
            .catch((err) => {
                console.log("Error fetching Score:", err);
            })
    }
    function logoutUser() {
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
        axios.get(endpoint + 'logout')
            .then(() => {
                toast.update(toaster, { render: "Logout Successful", type: "success", isLoading: false, autoClose: true });
                window.location.href = '/auth';
            })
            .catch((err) => {
                toast.update(toaster, { render: "Cannot Log you out", type: "error", isLoading: false, autoClose: true });
                console.log(err);
            })
    }
    function Timer({ expiryTimestamp }) {
        const {
            seconds,
            minutes,
            hours
        } = useTimer({
            expiryTimestamp, onExpire: () => {
                toast.info('Time Up!!!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const toaster = toast.loading('Logging You Out...', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                axios.get(endpoint + 'logout')
                    .then(() => {
                        const res = deleteUserObject();
                        if (res) {
                            toast.update(toaster, { render: "Logout Successful", type: "success", isLoading: false, autoClose: true });
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 1000);
                        }
                    })
                    .catch((err) => {
                        toast.update(toaster, { render: "Cannot Log you out", type: "error", isLoading: false, autoClose: true });
                        console.log(err);
                    })
            }
        });
        let deadline = hours <=0 && minutes <=0 && seconds <=30; 
        return (
            <div className="timer">
                <div className={`timer__title ${deadline ? ' text-danger ' : ''}`}>{`${hours}:${minutes}:${seconds}`}</div>
                <div className="timer__desc">Note: The whole event is 2-hr long, you don't have to focus on the time, you will get reminders after each 30 mins with the remaining time</div>
            </div>
        );
    }
    function redirectToProblem(externalLink) {
        window.location.href = externalLink;
    }
    function openModal(index) {
        setCurrentIndex(index);
        setModalVisibility(true);
    }
    function MapProblemList() {
        return problems.map((data, index) => {
            return (
                <div key={index} className={`challenge ${data._id == problems[currentIndex]._id ? " active " : ""} ${data.state}`}>
                    <h3>{data.title}</h3>
                    <div className='buttons'>
                        {data.state == 'passed' ?
                            <div className='text-success'>Passed</div>
                            :
                            <button disabled={data._id == problems[currentIndex]._id ? false : true} className='btn btn-unlock' onClick={() => openModal(index)}>Unlock</button>
                        }
                        <button disabled={data.state != 'locked' ||  data._id == problems[currentIndex]._id ? false : true} className='btn btn-link' onClick={() => redirectToProblem(data.redirectURL)}></button>
                    </div>
                </div>
            )
        })
    }
    function authenticateTestCase() {
        if (currentProblemOutput === problems[currentIndex].specialTestCaseOutput) {
            setCurrentProblemOutput('');
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
            axios.put(endpoint + 'updateScore', {
                userId: currentUser._id,
                problemId: problems[currentIndex]._id,
                startTime: 0,
                timeSubmitted: Date.now(),
                score: problems[currentIndex].score,
            }, {
                withCredentials: true
            })
                .then((response) => {
                    getUserScore();
                    let updatedProblem = [...problems];
                    updatedProblem[currentIndex] = { ...updatedProblem[currentIndex], state: 'passed' }
                    setProblems(updatedProblem);
                    if (currentIndex != 4) {
                        setCurrentIndex(currentIndex + 1);
                    }
                })
                .catch((err) => {
                    console.log("Error updating score", err);
                })
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
            let updatedProblem = [...problems];
            updatedProblem[currentIndex] = { ...updatedProblem[currentIndex], state: 'failed' }
            setProblems(updatedProblem);
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
                            <button className="btn btn-close" onClick={() => { setModalVisibility(false); setCurrentProblemOutput(''); }}>&times;</button>
                        </div>
                        <div className="modal-body testcase">
                            <label>Custom Test Case</label>
                            <textarea className='testcase__input' disabled value={problems[currentIndex]?.specialTestCaseInput}></textarea>
                            <label>Your Output</label>
                            <textarea className='testcase__output' placeholder='Place Your Output Here!' value={currentProblemOutput} onChange={(e) => setCurrentProblemOutput(e.target.value)}></textarea>
                            <button className='btn btn-submit' onClick={authenticateTestCase} disabled={!currentProblemOutput}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='problem'>
                <div className="left">
                    <Timer expiryTimestamp={time} />
                    <div className="challenges">
                        <div className="challenges__title">Challenges</div>
                        <div className="challenges__list">
                            {MapProblemList()}
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
                    <a className='btn right__logout' href='/leaderboard'>Leaderboard</a>
                    <div className="right__toggle">
                        <button className={tabState ? 'btn active' : 'btn'} onClick={() => setTabStatus(true)}>Rules</button>
                        <button className={tabState ? 'btn' : 'btn active'} onClick={() => setTabStatus(false)}>Details</button>
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
                            <div className="points"><b>Name</b>{currentUser.name}</div>
                            <div className="points"><b>College</b>Pillai College Engineering, Panvel</div>
                            <div className="points"><b>Email</b>{currentUser.email}</div>
                            <div className="points points--large"><b>Score</b><span>{currentUser?.score}</span></div>
                            <p>Note: Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, per luctus ligula dapibus magnis maecenas praesent, urna facilisis mollis montes ridiculus eros litora.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
