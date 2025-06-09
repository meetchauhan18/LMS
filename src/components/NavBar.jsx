import { Box, Container, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navItems = [
        { label: 'Home', path: '/'},
        { label: 'Form', path: '/add-book'},
    ]
  return (
    <Box sx={{ backgroundColor: '#0A1524', paddingX: '1rem', paddingY: '0.5rem', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        {/* Container for the NavBar */}
        <Container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '60px', width: '100%' }}>
            <Typography sx={{ flexGrow: 1, color: '#FFFFFF', fontSize: '1.5rem' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Library</span>
                <span style={{ color: '#F0F0F0' }}>App</span>
            </Typography>
            <Container sx={{ backgrounndColor: "grey", width:"auto"}}>
                {navItems.map((item, index) => (
                    <Typography key={index} component="span" sx={{ margin: '0 1rem', color: '#FFFFFF', cursor: 'pointer', padding: '6px', fontSize: '18px', fontWeight: "600", borderBottom: (location.pathname === item.path) ? '2px solid red' : '' }} onClick={() => navigate(item.path)}>
                        {item.label}
                    </Typography>
                ))}
            </Container>
        </Container>
    </Box>
  )
}

export default NavBar
