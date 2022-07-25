import React,{useEffect,useState} from 'react';
import './Home.scss'
import InfinityWar from '../../InfinityWar.jpeg'
import {BiPlay} from 'react-icons/bi'
import { AiOutlinePlus} from 'react-icons/ai'




import axios from 'axios'
import { Link } from 'react-router-dom';
const apikey = "bb990833a598051f6ea86b52ab4eaf36";
const baseurl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"

const Card = ({img}) => (
    <img src={img} alt="" className="card" />
)

const Row = ({title,
     arr = [] }) => (
    <div className='row'>
        <h2>{title}</h2>
        
        <div>
       {
        arr.map((item,index) =>(
            <Card key={index} img = {`${imgUrl}/${item.poster_path}`}/>
        ))
       }
        </div>
        
        
       
    </div>
)







const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [NowPlaying, setNowPlaying] = useState([])
    const [Popular, setPopular] = useState([])
    const [TopRated, setTopRated] = useState([])
    const [genre, setGenre] = useState([])

useEffect(() => {

        const FetchUpcoming = async () => {
           const {data:{results} } = await axios.get(`${baseurl}/movie/upcoming?api_key=${apikey}`)
           setUpcomingMovies(results)
        }
        const FetchNowPlaying = async () => {
           const {data:{results} } = await axios.get(`${baseurl}/movie/now_playing?api_key=${apikey}`)
           setNowPlaying(results)
        }
        const FetchPopular = async () => {
           const {data:{results} } = await axios.get(`${baseurl}/movie/popular?api_key=${apikey}`)
           setPopular(results)
        }
        const FetchTopRated = async () => {
           const {data:{results} } = await axios.get(`${baseurl}/movie/top_rated?api_key=${apikey}`)
           setTopRated(results)
        }
        const getAllGenre = async () => {
           const { data:{genres} } = await axios.get(`${baseurl}/genre/movie/list?api_key=${apikey}`)
           setGenre(genres)
        }

        FetchUpcoming()
        FetchNowPlaying()
        FetchPopular()
        FetchTopRated()
        getAllGenre()
}, [])









  return (
        <section className="home">
            <div className="banner" style={{
                backgroundImage: Popular[0] ? `url(${`${imgUrl}/${Popular[0].poster_path}`})` : " rgb(16,16,16)",
                }}
            >

                {
                    Popular[0] && (
                        <h1>{Popular[0].original_title}</h1>
                    )
                }
                
                {
                    Popular[0] && (
                        <p>{Popular[0].overview}</p>
                    )
                }

            <div>
            <button> <BiPlay/> Play</button>
                <button> My List <AiOutlinePlus/></button>
            </div>


            </div>

            <Row title={"Upcoming Movies"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={NowPlaying} />
            <Row title={"Popular"} arr={Popular} />
            <Row title={"Top Rated"} arr={TopRated} />

            <div className="genreBox">

                { genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
                ))}
            </div>
        </section>

  )
}

export default Home