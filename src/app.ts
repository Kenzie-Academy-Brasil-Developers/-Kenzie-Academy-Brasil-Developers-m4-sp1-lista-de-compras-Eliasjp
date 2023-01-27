import express from "express"
import { createItemById, createPurchaseList, deleteItemByName, deletePurchaseById, readPurchaseList, readPurchaseListId, updateItem } from "./logic"
import { checkContentCreateItemBody, checkContentCreatePurchaseBody, checkDuplicatedPurchaseListData, checkLengthCreatePurchaseBody, findItemPosition, findPurchaseList } from "./middleware"

const app = express()
app.use(express.json())

app.listen(3333, () => {
    
})

app.get("/purchaseList", readPurchaseList)
app.post("/purchaseList", checkLengthCreatePurchaseBody, checkContentCreatePurchaseBody, createPurchaseList)
app.get("/purchaseList/:id", findPurchaseList, readPurchaseListId)
app.delete("/purchaseList/:id", findPurchaseList, deletePurchaseById)
app.post("/purchaseList/:id", findPurchaseList, checkContentCreateItemBody, checkDuplicatedPurchaseListData, createItemById)
app.patch("/purchaseList/:id/:itemName", findPurchaseList, findItemPosition, updateItem)
app.delete("/purchaseList/:id/:itemName", findPurchaseList, findItemPosition, deleteItemByName)