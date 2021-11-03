import { observer } from 'mobx-react'
import { useStore } from '../../../../../stores/Store'
import {useEffect} from 'react'
const GalleryMainContent: React.FC = observer(
    () => {
        const {productStore} = useStore()
        useEffect(() => {
            productStore.fetchMore()
            return () => {productStore.clear()}
        }, [])
        return (
            <>
                <div id="products-list">
                    {
                        productStore.productList.map(
                            product => <div key={product.id}>{product.name}</div>
                        )
                    }
                </div>
                {
                    (productStore.itemsLeftCount > 0)
                        ? <div className="load-more" id="load-more" onClick={() => productStore.fetchMore()}>
                            <span>Load another 20 items</span>
                            <br />
                            <div className="load-more__items-left">({productStore.itemsLeftCount} items left)</div>
                        </div>
                        : ''
                }
            </>
        )
    }
)
export default GalleryMainContent
