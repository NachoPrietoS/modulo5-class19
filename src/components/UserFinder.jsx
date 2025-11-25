import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react"

const UserFinder = () => {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    const fetchUsers = async () => {
        try {
            const username = inputRef.current.value;
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('Usuario no encontrado')
            }
            const userData = await response.json();
            console.log(userData);
            setUser(userData);
            setError(null);
        } catch (error) {
            setError(error.message);
            setUser(null);
        }
    }

    return(
        <Paper
            elevation={3}
            sx={{
                maxWidth: 400,
                margin: 'auto',
                padding: 2,
                textAlign: 'center',
                marginTop: 2
            }}
        >
            <Typography>Buscar usuario GitHUB</Typography>
            <TextField 
                inputRef={inputRef}
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Ingresa el nombre de usuario"
                onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        fetchUsers();
                    }
                }}
            />
            <Button
                variant="outlined"
                color="error"
                onClick={fetchUsers}
                sx={{ marginTop: 2}}
            >
                Buscar
            </Button>
            {
                error && (
                    <Typography variant="body1" color="primary">
                        {error}
                    </Typography>
                )
            }
            {
                user && (
                    <>
                        <Avatar 
                            src={user.avatar_url}
                            alt="Avatar de usuario"
                            sx={{
                                width: 50 * 2, // 10  8px (theme spacing)
                                height: 50 * 2,
                                margin: "0 auto",
                                marginTop: 2,
                                marginBottom: 2,
                                }}
                        />
                        <Typography variant="body1" gutterBottom>Nombre: {user.name}</Typography>
                        <Typography variant="body1" gutterBottom>Seguidores {user.followers}</Typography>
                        <Typography variant="body1" gutterBottom>Repositorios Publicos {user.public_repos}</Typography>
                    </>
                )
            }
        </Paper>
    )
}

export default UserFinder;