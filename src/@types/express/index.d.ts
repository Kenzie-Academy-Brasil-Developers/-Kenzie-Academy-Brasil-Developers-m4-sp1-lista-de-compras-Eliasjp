import { IPurchaseItemExtended } from "../../interface";

declare global {
    namespace Express {
        interface Request {
            purchaseList: IPurchaseItemExtended;
            itemIndex: number;
        }
    }
}