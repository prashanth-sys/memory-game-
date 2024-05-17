import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import MemoryMatrix from './components/MemoryMatrix'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/memory-matrix" component={MemoryMatrix} />
  </Switch>
)

export default App
