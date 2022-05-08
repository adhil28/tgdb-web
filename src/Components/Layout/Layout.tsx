import React from 'react'
import LayoutAppBar from './AppBar/LayoutAppBar'

interface Props {
    selected: string
}

function Layout(props:Props) {
    return (
        <div>
            <LayoutAppBar selected={props.selected} />
        </div>
    )
}

export default Layout