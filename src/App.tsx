import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import SignIn from "./Components/Auth/SignIn"
function App() {

    const location = useLocation();
    const [selected, setselected] = useState('/home')

    useEffect(() => {
        if (location.pathname.replace('/', '') === '') {
            setselected('home');
        } else {
            setselected(location.pathname.replace('/', ''));
        }
    }, [location]);

    return (
        <div>
            {selected == 'sign-in' ? <div /> : <Layout selected={selected} />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Routes>

        </div>
    )
}

export default App