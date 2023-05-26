import MiniItem from "./MiniItem"

function PurchaseOrder({items}) {
    return(
        <>
        
        {items.map( item => <MiniItem  key={item?.id} item={item}/> )}
        </>
    )
}


export default PurchaseOrder 

