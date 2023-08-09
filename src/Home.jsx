import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Home = () => {
    const [data, setData] = useState({
        celcius: 0,
        name: "Enter City or State or Country",
        humidity: 0,
        speed: 0,
        image: '/Images/sun.png',
        state: '',
    })
    const [msg, setMsg] = useState(null)
    const [searchname, setSearchName] = useState('')
    const [id, setId] = useState(null)

    const handleClick = (e) => {
        e.preventDefault();
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchname}&appid=7f295413dc1b52ac4f48feb6c18c6630&&units=metric`;
        axios.get(apiUrl)
            .then(res => {
                let imgpath = '';
                if (res.data.weather[0].main === "Clouds") {
                    imgpath = '/Images/cloud.png'
                } else if (res.data.weather[0].main === "CLear") {
                    imgpath = '/Images/sun.png';
                    setId('sun')
                } else if (res.data.weather[0].main === "Rain") {
                    imgpath = '/Images/rain.png'
                } else if (res.data.weather[0].main === "Drizzle") {
                    imgpath = '/Images/drizzle.png'
                } else if (res.data.weather[0].main === "Mist") {
                    imgpath = '/Images/mist.png'
                } else if (res.data.weather[0].main === "Haze") {
                    imgpath = '/Images/haze.png'
                } else {
                    imgpath = '/Images/sun.png'
                }
                console.log(res.data)
                setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imgpath, state: res.data.weather[0].main })
                console.log(data.state)
                setMsg(null)
                // window.location.reload(true)
            })
            .catch(err => {
                console.log("Error is : -> \n", err.response.data.message)
                setData({ ...data, celcius: '--', name: '--', humidity: '--', speed: '--', image: '/Images/snow.png', state: '--' })
                setMsg(err.response.data.message)
            })
    }
    return (
        <div className='containers'>
            <div className='weather'>
                <div className='search'>
                    <form onSubmit={handleClick}>
                        <input type='text' placeholder='Enter City Name' onChange={e => setSearchName(e.target.value)} />
                        {/* <input type='text' placeholder='Enter City Name' value={searchname} /> */}
                        <button type='submit' className='btn bg-light rounded-5' ><img src='/Images/search.png' style={{ width: "25px" }} /></button>
                    </form>
                </div>
                {msg && <><h3 className='text-uppercase mt-2 rounded fw-bold' style={{ width: "100%", background: "#020f2761" }}>{msg}</h3></>}
                {data.state && <div className="fs-3 fw-bold text-uppercase">{data.state}</div >}
                <div className='winfo'>
                    <img src={data.image} style={{ width: "250px" }} className='icon' id={id} />
                    <h1>{data.celcius}° C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="colm">
                            <img src='/Images/humidity.png' />
                            <div>
                                <p>{data.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="colm">
                            <img src='/Images/wind.png' />
                            <div>
                                <p>{Math.round(data.speed)} Km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
