import { useState, useEffect } from "react";


// This will debounce the API call for our search query
const useDebounce = (value, delay) =>{
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() =>{
        const handler = setTimeout(() =>{
            setDebouncedValue(value);
        }, delay)

        return () => {
            clearTimeout(handler);

        }
    }, [value, delay])

    return debouncedValue;
}

export default useDebounce;