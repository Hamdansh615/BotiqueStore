export type PaginationParamsModel = {
    page?: number
    limit?: number
    paginate?: boolean
    order?: PAGINATE_ORDER
    orderBy?: string
}

export enum PAGINATE_ORDER {
    ASCENDING = 'asc',
    DESCENDING = 'desc',
}
