import { dynamoDb } from "./db";
import { now } from "./date";
import { RND } from "./RND";

export const dbItem = (item) => {
    // add createdAt date + RK (random key) + date keys (for date search)
    const createdAt = now();
    const RK = RND();
    let expItem = {
        ...item,
        createdAt,
        RK,
    };
    // date key with id for PO (my photos) and GP (group photos per album), otherwise nothing
    const recordType = item.PK?.slice(0, 2);
    switch (recordType) {
        case 'PO': {
            expItem.datePK = 'PO' + item.SK;
            expItem.dateSK = createdAt;
            break;
        }
        case 'GP': {
            expItem.datePK = item.PK;
            expItem.dateSK = createdAt + '#' + expItem.SK;
            break;
        }

        default:
            break;
    }
    return expItem;
};

const dbCreate = (Item) => {
    return dynamoDb.put({
        Item
    });
};
export const dbCreateItem = async (item) => {
    const Item = dbItem(item);
    await dbCreate(Item);
    return Item;
};