import { json, Request, Response } from "express"
import { purchaseList, idCount } from "./database"

export function readPurchaseList (req: Request, resp: Response): Response{
    return resp.status(200).json(purchaseList)
}

export function createPurchaseList (req: Request, resp: Response): Response{
    const idIncludedBody = {id: (idCount.length + 1), ...req.body}
    idCount.push(idCount.length + 1)
    purchaseList.push(idIncludedBody)

    return resp.status(201).json(idIncludedBody)
}

export function readPurchaseListId (req: Request, resp: Response): Response{
    return resp.status(200).json(req.purchaseList)
}

export function deletePurchaseById (req: Request, resp: Response): Response{
    const indexPurchase: number = purchaseList.findIndex(list => 
        list.id === req.purchaseList.id && list
    )
    purchaseList.splice(indexPurchase, 1)

    return resp.status(204).json()
}

export function createItemById (req: Request, resp: Response): Response{
    req.purchaseList.data = [...req.purchaseList.data, req.body]

    return resp.status(201).json(req.purchaseList)
}

export function updateItem (req: Request, resp: Response): Response{
    req.purchaseList.data[req.itemIndex] = {...req.purchaseList.data[req.itemIndex], ...req.body}

    return resp.status(200).json(req.purchaseList.data[req.itemIndex])
}

export function deleteItemByName (req: Request, resp: Response): Response{
    req.purchaseList.data.splice(req.itemIndex, 1)

    return resp.status(204).json()
}