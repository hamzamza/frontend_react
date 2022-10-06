
import { useEffect, useState } from "react"
import axios from "axios"
const useFetch = (url) => {
    const [data, seData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([])
    console.log('rendred');
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {

                const res = await axios.get(url)
                seData(res.data)

            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()

    }, [])

    const reFetch = async (url) => {
        setLoading(true)
        try {

            const res = await axios.get(url)
            seData(res.data)

        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetch, setLoading }
}
export default useFetch