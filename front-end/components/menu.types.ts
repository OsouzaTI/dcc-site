export interface SubMenuInterface {
    id: number,
    title: string,
    slug: string,
}

export interface MenuInterface {
    id: number,
    title: string,
    slug: string,
    SubMenus: SubMenuInterface[]
}