import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import React from 'react'

const ReuseableCard = ({ title, actions, children, ...props }) => {
  return (
    <Card sx={{
      borderRadius: 3,
      boxShadow: '0 4px 24px 0 rgba(25, 71, 219, 0.10)',
      width: "350px"
    }} {...props}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1947DB' }}>
          {title}
        </Typography>
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  )
}

export default ReuseableCard
