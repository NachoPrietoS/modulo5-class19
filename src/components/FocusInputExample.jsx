import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react"

const FocusInputExample = () => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const handleClear = () => {
        inputRef.current.value = '';
        inputRef.current.focus();
        setText ('')
    }
        
    return (
        <>
            <TextField 
                inputRef={inputRef}
                placeholder="Escribe"
                onChange={(e) => setText(e.target.value)}
            />
            <Button 
                onClick={handleClear}
            >
            Limpiar texto
            </Button> 
            <Typography>Texto escrito: {text}</Typography>
        </>
    )
}

export default FocusInputExample;