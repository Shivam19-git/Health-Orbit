import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:6060/api/auth/logout')
            localStorage.removeItem('token')
            navigate('/login')
        } catch (error) {
            console.log("Logout Failed", error)
        }
    }

    return(
        <>
        <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Logout
        </button>
        </>
    )
}

export default Logout