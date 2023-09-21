import { useState } from "react"
import useFetchPromise from "../hooks/useFetchPromise"

export const SearchBox = ({ 
    id,
    name, 
    label, 
    placeholder,
    autoComplate,
    maxItems,
    styles,
    debounceWait,
    listBox,
    noItemMessage,
    errorMessage,
    transformData,
    dataPromise
}) => {

    const [query, setQuery] = useState('')
    const [dataSave, setDataSave, error] = useFetchPromise(
        query, 
        transformData, 
        dataPromise, 
        debounceWait)

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <br />
            <input
                className={styles.input}
                name={name}
                id={id}
                value={query}
                onChange={handleChange}
            />
            {dataSave && dataSave.length > 0 && listBox(dataSave)}
        </>
    )
}