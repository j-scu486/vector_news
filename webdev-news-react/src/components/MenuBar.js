import { useState, useEffect } from 'react'

export const MenuBar = () => {
    const [filter, setFilter] = useState([])

    const handleFilters = (e) => {
        console.log(e.target.innerText)
    }
    
    useEffect(() => {
        console.log("changed detected")
    })


    return (
        <div>
            <button onClick={handleFilters}>Javascript</button>
            <button>HTML</button>
        </div>
    )
}

export default MenuBar
