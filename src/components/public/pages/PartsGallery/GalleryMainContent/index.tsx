import { observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../../../../../stores/Store'
import {useEffect} from 'react'
import GalleryProductGridItem from "../GalleryProductGridItem";
const GalleryMainContent: React.FC = observer(
    () => {
        const {productStore} = useStore()
        const location = useLocation()
        useEffect(() => {
            console.log('useEffect')
            console.log('allowFetchProducts', productStore.allowFetchProducts)
            if (productStore.allowFetchProducts) {
                productStore.allowFetchProducts = false
                const windowUrl = window.location.search
                const params = new URLSearchParams(windowUrl)
                const orderBy = params.get('orderBy') || 'id'
                const sortingDirection = params.get('sortingDirection') || 'DESC'
                if (orderBy !== productStore.prevFilter.orderBy
                    || sortingDirection !== productStore.prevFilter.sortingDirection
                    || (!params.get('orderBy') && !params.get('sortingDirection'))
                ) {
                    productStore.prevFilter.orderBy = orderBy
                    productStore.prevFilter.sortingDirection = sortingDirection
                    if (orderBy) {
                        productStore.filter.orderBy = orderBy
                    }
                    if (sortingDirection) {
                        productStore.filter.sortingDirection = sortingDirection
                    }
                    productStore.clear()
                    productStore.fetchMore()
                } else {
                    productStore.allowFetchProducts = true
                }
            }
            return () => {
                productStore.clear()
            }
        }, [location])
        return (
            <>
                <div id="products-list">
                    {
                        productStore.productList.map(
                            (product, idx) => <GalleryProductGridItem key={idx} product={product}/>
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
