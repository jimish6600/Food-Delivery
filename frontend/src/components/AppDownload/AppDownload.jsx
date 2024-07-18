import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/> Tomato App</p>
        <div className="app-download-platform">
          <a href="https://play.google.com/store/apps/details?id=com.application.zomato" target='/'><img src={assets.play_store} alt="" /></a>
          <a href="https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896" target='/'><img src={assets.app_store} alt="" /></a>
        </div>
    </div>
  )
}

export default AppDownload