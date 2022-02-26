import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'

// StrictMode 开启react严格模式

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
