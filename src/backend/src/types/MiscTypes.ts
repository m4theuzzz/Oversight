enum Tables {
    COMPANIES = 'Companies',
    USERS = 'Users',
    CUSTOMERS = 'Customers',
    SERVICES = 'Services',
    BUDGETS = 'Budgets',
    BUDGET_SERVICES = 'BudgetServices'
}

enum Actions {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3
}

interface PaginationProperties {
    page: number,
    pageSize: number,
    prev: string | null,
    next: string | null,
    totalItems: number
}

interface APIResponseProperties {
    data: any | any[],
    pagination?: PaginationProperties
}

interface Filters {
    page?: number,
    pageSize?: number
}

const FiltersProps: (keyof Filters)[] = ["page", "pageSize"]

export {
    Tables,
    Actions,
    PaginationProperties,
    APIResponseProperties,
    Filters,
    FiltersProps
}
