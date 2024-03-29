import type {
    ParcelProductParentCategories,
    ProductParentCategories,
    ServiceArea,
} from '~/types'
import axios from 'axios'

declare let window: any
const baseURL = typeof window !== 'undefined' && window.ENV.API_BASE_URL
const configAxios = axios.create({
    baseURL,
})

export const getShopParentCategories = (): Promise<ProductParentCategories> => {
    return configAxios.get(`/shop-product-categories/parent?child=true`)
}

export const getServiceAreaTree = (): Promise<ServiceArea> => {
    return configAxios.get(`/service-area/tree`)
}

export const getParcelProductParentCateogires =
    (): Promise<ParcelProductParentCategories> => {
        return configAxios.get(`/shop-product-categories/parcel-parent`)
    }
