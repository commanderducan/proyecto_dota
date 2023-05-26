import { useEffect, useState } from "react";
import ItemsList from "../Item/ItemsList.jsx";

function ItemsFinder ({items}) {

    const [ filteredItems, setFilteredItems] = useState(items)
    const [ inputValue, setInputValue ] = useState("")

    useEffect(
        filterItems,
        [inputValue]
    )

    function filterItems() {
        setFilteredItems(items.filter( item => item.name.toUpperCase().includes(inputValue.toUpperCase())))
    }

    function inputHandler(event) {
        setInputValue(event.target.value)
    }

    return(
        <>
            <label>
                Word:
                <input type="text" value={inputValue} onInput={inputHandler}/>
                <ItemsList items={filteredItems}/>
            </label>

        </>
    )
}


export default ItemsFinder