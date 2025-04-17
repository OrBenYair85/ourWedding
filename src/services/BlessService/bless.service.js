import { StorageService } from "../StorageService/async-storage.service";
import { utilService } from "../util.service";

const BLESS_KEY = 'blessDB'

const demoData = [
    {
        _id:"1ABC",
        header:"Hello Bless",
        blessData: "I want to bless you",
        createdAt: 1231231241,
        updatedAt: 1231231241,
    }
]

export const blessService = {
    query,
    getById,
    remove,
    save,

}

function query (filterBy = {}) {

    return StorageService.query(BLESS_KEY)
    //TODO: Add filter by process
}

async function getById(blessId) {
    try {
        return await StorageService.get(BLESS_KEY, blessId);
    } catch (err) {
        console.error('Cannot get Bless:', err);
        throw err
    }
}

async function remove (blessId) {
    try {
        return await StorageService.remove(BLESS_KEY,blessId)
    } catch (err) {
        console.error('Cannot remove Bless:', err);
        throw err
    }
}

async function save(bless) {
    try {
        return await (bless._id ? _edit(bless) : _add(bless))
    } catch (err) {
        console.error('Cannot save Bless:', err);
        throw err
    }
    
}

async function _add (bless) {
    bless = {...bless}
    bless._id = utilService._makeId()
    bless.createdAt = bless.updatedAt = Date.now()
    try {
        return await StorageService.post(BLESS_KEY, bless)
    } catch (err) {
        console.error('Cannot Add Bless:', err);
        throw err
    }
    
}

async function _edit (bless) {
    bless = {...bless}
    bless.updatedAt = Date.now()
    try {
        return await StorageService.put(BLESS_KEY, bless)
    }   catch (err) {
        console.error('Cannot edit Bless:', err);
        throw err
    }

}
