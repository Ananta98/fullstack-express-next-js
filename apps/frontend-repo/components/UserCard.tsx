import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React from 'react'
import { User } from '../../shared/user'

const UserCard: React.FC<User> = ({ name, phone_number, email, username }) => {
    return (
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{username}</Typography>
                <Typography variant="body2">
                    Email: {email}
                </Typography>
                <Typography variant="body2">
                    Phone Number: {phone_number}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default UserCard