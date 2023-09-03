import React from 'react'
import './home.scss'
import { saly } from '../../assets/images'
import Card from '../../components/card/Card'
import Rewards from '../../components/rewards/Rewards'

const home = () => {
    return (
        <div className='container'>
            <div className="heading">
                <img src="" alt="" />
                <h1 className="title">
                &lt;/Code hunt&gt;
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum unde est placeat sequi veniam. Architecto a accusamus tempore eum aliquam!
                </p>
            </div>
            <div className='vectors'>
                <div className='cards'>
                    <Card />
                    <Card />
                </div>
                <img src={saly} alt="" />
                <div className='cards'>
                    <Card />
                    <Card />
                </div>
            </div>
            <Rewards />

        </div>
    )
}

export default home