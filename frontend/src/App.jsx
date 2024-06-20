import Home from './containers/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Home />
      <ToastContainer />
    </div>
  )
}

export default App