import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import SignIn from "./Components/Auth/SignIn"
import Profile from './Components/Profile/Profile';
import Docs from './Components/Docs/Docs';
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
            {selected === 'sign-in' ? <div /> : <Layout selected={selected} />}
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="slide" timeout={100}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/sign-in' element={<SignIn />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/docs' element={<Docs />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default App