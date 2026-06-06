import { useState } from 'react'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/services/auth.context.jsx'
import {Interviewprovider} from './features/ai/interview.context.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <Interviewprovider>
        <AppRoutes/>
      </Interviewprovider>
    </AuthProvider>
      
    </>
  )
}

export default App
