import { useState } from 'react'
import './index.less'

interface User {
  name: string
  age: string
}
const App = () => {
  const [user1] = useState<User>({ name: 'xiaoming', age: '2' })
  return (
    <div>
      {user1.name}
      -
      {user1.age}
      <p className='ceshi'>测试样式热更新</p>
    </div>
  )
}

export default App
