import { APIResponseProperties } from "../../types/MiscTypes";

export class APIResponse {
    public static buildList<T>(
        fetchedData: T[],
        totalItems: number,
        page: number = 1,
        pageSize: number = 20
    ): APIResponseProperties {
        const next = this.hasNext(fetchedData, totalItems, page, pageSize) ?
            this.buildPageRequest('', page + 1) : null;
        const prev = page == 1 ? null : this.buildPageRequest('', page - 1);

        return {
            data: fetchedData,
            pagination: {
                next: next,
                prev: prev,
                page: page,
                pageSize: pageSize,
                totalItems: totalItems
            }
        }
    }

    public static build<T>(fetchedData: T): APIResponseProperties {
        return {
            data: fetchedData
        }
    }

    private static buildPageRequest(baseUrl: string, page: number) {
        //TODO: really build the querypath
        return `${page}`
    }

    private static hasNext<T>(fetchedData: T[], tableLength: number, page: number, pageSize: number): boolean {
        if (fetchedData.length < pageSize) {
            return false;
        }

        const lastItemIndex = ((page - 1) * pageSize) + fetchedData.length;
        if (lastItemIndex == tableLength) {
            return false;
        }

        return true;
    }
}