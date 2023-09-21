import { useCallback, useEffect, useState } from "react";
import debounce from 'lodash/debounce'

const useFetchPromise = (query, transformData, dataPromise, debounceWait) => {

    const [dataSave, setDataSave] = useState(null)
    const [error, setError] = useState(null)

    const fetchData = useCallback( 
        debounce( async (query, transformData, signal) => {
            try {
                const response = await dataPromise(query, signal);
                if( !response.ok) throw new Error(response.statusText)
                const data = await response.json()
                console.log(data);
                setDataSave(transformData(data))
            } catch (error) {
                console.log(error);
                if(!signal.abort) setError(error)
            }
    }, debounceWait),
    [])

    useEffect(()=> {

        if( !query ) {
            setDataSave(null)
            setError(null)
            return
        }

        const controller = new AbortController()
        const signal = controller.signal

        fetchData(query, transformData,  signal)

        return( )=> {
            controller.abort();
        }

    },[query, transformData, fetchData ])

    return [dataSave, setDataSave, error];
}


export default useFetchPromise;