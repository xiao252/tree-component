export type Node = {
    isExpand?:boolean
    prentNode?:Node
    status?: '0' | '1' | '2'
    child:Node[] | null
    isChild:boolean
    name:string
    id:number
}

export type Path = {
    id: number,
    path:string,
    pathName:string,
    name:string
}