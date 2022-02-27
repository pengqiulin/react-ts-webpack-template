import { useEffect, useRef } from 'react'

const usePrevState = (props:unknown) => {
    const prevRef = useRef(props)
    useEffect(() => {
        prevRef.current = props
    })
    const prevState = prevRef.current

    return prevState
}
export default usePrevState
