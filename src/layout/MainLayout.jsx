import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* NavBar component */}
            <NavBar />
            <Box sx={{ backgroundColor: '#F0F0F0' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainLayout;