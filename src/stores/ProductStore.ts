import { makeAutoObservable } from 'mobx'
import Product from '../models/Product'
import allProducts from '../json/shoes.json'
class ProductStore {
    readonly FETCH_STEP = 20
    readonly INITIAL_NEXT_PRODUCT_INDEX = 0
    private nextProductIndex: number = this.INITIAL_NEXT_PRODUCT_INDEX
    private sourceProductsTotalCount: number = 0
    private readonly products: Product[] = []
    constructor () {
        makeAutoObservable(this)
    }
    private addProducts(products: Product[]) {
        this.products.push(...products)
    }
    // Action: этот метод сам "знает", какую часть данных загружать и добавлять
    // в наблюдаемое свойсто products
    async fetchMore() {
        // TODO replace file data source with remote one
        // const response = await fetch(this.DATA_SOURCE_ADDRESS)
        // const products: Product[] = await response.json()
        // узнаем количество моделей Товар, загруженных из файла json
        // (при импорте за один раз загружаются сразу все)
        this.sourceProductsTotalCount = allProducts.length
        // до загрузки очередной порции моделей с данными
        // сохраняем временно текущее количество моделей в свойстве products
        const prevCount = this.products.length
        // копируем из исходного массива, содержащего все модели,
        // часть моделей от индекса this.nextProductIndex включительно
        // до индекса this.nextProductIndex + this.FETCH_STEP не включительно
        const fetchedProducts =
            allProducts.slice(this.nextProductIndex, this.nextProductIndex + this.FETCH_STEP)
        // в наблюдаемый массив добавляем только что полученную часть моделей
        this.addProducts(fetchedProducts)
        // после получения и добавления очередной части моделей
        // вычисляем текщее количество моделей в массиве products
        const currentCount = this.products.length
        // в качестве индекса товара, с которого нужно будет в следующий раз
        // начать загрузку части моделей, указываем текущее количество товаров в свойстве products
        this.nextProductIndex = currentCount
        // вернуть разность между текущим количеством моделей товаров,
        // предназначенных для отображения,
        // и предыдущим
        return currentCount - prevCount
    }
    async clear() {
        this.products.length = 0
        this.nextProductIndex = this.INITIAL_NEXT_PRODUCT_INDEX
    }
    get sourceTotalCount() {
        return this.sourceProductsTotalCount
    }
    get itemsLeftCount() {
        return this.sourceProductsTotalCount - this.products.length
    }
    get productList() {
        return this.products
    }
}
export { ProductStore }
export default new ProductStore()
