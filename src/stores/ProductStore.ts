import { makeAutoObservable } from 'mobx'
import history from '../history'
import Product from '../models/Product'
import allProducts from '../json/shoes.json'
interface IProductFilter {
    orderBy: string,
    sortingDirection: string
}
class ProductStore {
    readonly FETCH_STEP = 20
    readonly INITIAL_NEXT_PRODUCT_INDEX = 0
    private nextProductIndex: number = this.INITIAL_NEXT_PRODUCT_INDEX
    private sourceProductsTotalCount: number = 0
    private readonly products: Product[] = []
    public allowFetchProducts: boolean = true
    public filter: IProductFilter = {
        orderBy: 'id',
        sortingDirection: 'DESC'
    }
    public prevFilter: IProductFilter = {
        orderBy: '',
        sortingDirection: ''
    }
    constructor () {
        makeAutoObservable(this)
    }
    private addProducts(products: Product[]) {
        this.products.push(...products)
    }
    private changeGalleryUrlParams () {
        history.push({
            pathname: '/gallery',
            search: `?orderBy=${this.filter.orderBy}
                &sortingDirection=${this.filter.sortingDirection}`
                .replace(/\s/g, '')
        })
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
            allProducts
                .sort((p1, p2) => {
                    // аналог получения рефлексии поля объекта по его имени в языке C#
                    // значение константы property отражает (описывает) одно из свойств
                    // объектов типа Product, имя (название) которого
                    // динамически считывается из свойства this.filter.orderBy
                    const property = this.filter.orderBy as keyof Product
                    const v1 : number =
                        (typeof p1[property] !== 'number') // при помощи рефлексии некоторого свойства
                            // из типа Product получаем значение этого свойства из конкретного
                            // объекта p1,
                            // затем узнаем тип полученного значения
                            ? Number((p1[property] as string).replace(',','.'))
                            : p1[property] as number
                    const v2 =
                        (typeof p2[property] !== 'number')
                            ? Number((p2[property] as string).replace(',','.'))
                            : p2[property] as number
                    if (this.filter.sortingDirection === 'ASC') {
                        return v1 - v2
                    } else if (this.filter.sortingDirection === 'DESC') {
                        return v2 - v1
                    } else {
                        return p2.id - p1.id
                    }
                })
                .slice(this.nextProductIndex, this.nextProductIndex + this.FETCH_STEP)
        // в наблюдаемый массив добавляем только что полученную часть моделей
        this.addProducts(fetchedProducts)
        // разрешаем следующий запрос на получение порции моделей товаров
        this.allowFetchProducts = true
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
    clear() {
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
    get filterOrderBy () {
        return this.filter.orderBy
    }
    get filterSortingDirection () {
        return this.filter.sortingDirection
    }
    set filterOrderBy (orderBy: string) {
        if (this.filter.orderBy === orderBy) {
            if (this.filter.sortingDirection === 'DESC') {
                this.filter.sortingDirection = 'ASC'
            } else {
                this.filter.sortingDirection = 'DESC'
            }
        } else {
            this.filter.sortingDirection = 'ASC'
            this.filter.orderBy = orderBy
        }
        this.changeGalleryUrlParams()
    }
}
export { ProductStore }
export default new ProductStore()
