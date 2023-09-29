import { useEffect, useState } from "react"

interface FetchState {
    data: any;
    isLoading: boolean;
    errors: any;
}

export const useFetch = (url: string, token: string): FetchState => {

    const [state, setState] = useState<FetchState>({
        data: null,
        isLoading: true,
        errors: null
    })

    const { data, isLoading, errors } = state

    const getFetch = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
            };
            
            const response = await fetch(url, { headers });
            const data = await response.json();

            setState({
                data,
                isLoading: false,
                errors: null
            })
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                errors: error
            })
        }
    }

    useEffect(() => {
        if (!url) return
        getFetch()
    }, [url, token])

    return {
        data,
        isLoading,
        errors
    }

}