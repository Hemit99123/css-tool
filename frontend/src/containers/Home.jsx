import HomeView from '../components/HomeView'
import { getPurgeCss } from '../api/css'

const Home = () => {
  return (
    <HomeView 
        getPurgeCss={getPurgeCss}
    />
  )
}

export default Home