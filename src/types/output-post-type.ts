export type PostOutputType = {
    id: string
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
}

export type PaginatorPost = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostOutputType[]
}