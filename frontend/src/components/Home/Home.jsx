import React from 'react'
import NavBar from '../NavBar/NavBar'
import Main from '../Main/Main'
import HomeTable from '../Table/HomeTable'
import Actions from '../Actions/Actions'
import Boxes from '../Boxes/Boxes'

const Home = () => {
  return (
    <div>
        <NavBar />
        <Main />
        <Boxes />
        <HomeTable />
        <Actions />
    </div>
  )
}

export default Home