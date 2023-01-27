import { Request, Response, NextFunction } from "express"
import { purchaseList } from "./database"
import { IItemList, IPurchaseItemExtended } from "./interface"

function errorThrow (message: any): any{
    throw message
}

export function checkLengthCreatePurchaseBody (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        Object.keys(req.body).length === 2 ? next() : errorThrow("Informações incorretas do objeto.")
    }
    catch (err){
        return resp.status(400).send(err)
    }
}

export function checkContentCreatePurchaseBody (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        !req.body.listName ? errorThrow("Não possui a propridade listName") : typeof req.body.listName !== "string" && errorThrow("A propriedade listName não é uma string")
        !req.body.data ? errorThrow("Não possui a propriedade data") : !Array.isArray(req.body.data) && errorThrow("A propriedade data não é um array")
        next()
    }
    catch (err){
        return resp.status(400).send(err)
    }
}

export function findPurchaseList (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        const objectPurchaseList: IPurchaseItemExtended | undefined = purchaseList.find(list => 
            (list.id === Number(req.params.id)) && list
        )
        !objectPurchaseList ? errorThrow(`Lista com o id: ${req.params.id} não existe.`) : req.purchaseList = objectPurchaseList
        next()
    }
    catch (error){
        return resp.status(404).json(error)
    }
}

export function checkLengthCreateItemBody (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        Object.keys(req.body).length === 2 ? next() : errorThrow("Informações do item estão incorretas.")
    }
    catch (err){
        return resp.status(400).json(err)
    }
}

export function checkContentCreateItemBody (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        !req.body.name ? errorThrow("O nome do item é obrigatório.") : typeof req.body.name !== "string" && errorThrow("O nome precisa ser uma string")
        !req.body.quantity ? errorThrow("A quantidade do item é obrigatório.") : typeof req.body.quantity !== "string" && errorThrow("A quantidade precisa ser uma string")
        next()
    }
    catch (err){
        return resp.status(400).json(err)
    }
}

export function checkDuplicatedPurchaseListData (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        const checkDuplicated = req.purchaseList.data.findIndex((item: IItemList) => 
            item.name.toUpperCase() === req.body.name.toUpperCase() && item
        )
        checkDuplicated !== -1 && errorThrow("Esse item já existe na lista.")
        next()
    }
    catch (err){
        return resp.status(400).json(err)
    }
}

export function findItemPosition (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        const findIndexItem = req.purchaseList.data.findIndex(item => 
            item.name === req.params.itemName && item    
        )
        findIndexItem === -1 ? errorThrow("Item não encontrado.") : req.itemIndex = findIndexItem
        next ()
    }
    catch (err){
        return resp.status(400).json(err)
    }
}

export function checkContentUpdateItemBody (req: Request, resp: Response, next: NextFunction): NextFunction | any{
    try {
        const arrayKeys = Object.keys(req.body)
        arrayKeys.some(key => (key !== "quantity" && key !== "name") && key) && errorThrow("Propriedade(s) do objeto incorretos.")
        req.body.name && typeof req.body.name !== "string" && errorThrow("Nome do item precisa ser uma string")
        req.body.quantity && typeof req.body.quantity !== "string" && errorThrow("Quantidade do item precisa ser uma string")
        next()
    }
    catch (err){
        return resp.status(400).json(err)
    }
}