import { utilService } from "../util.service.js"


export const StorageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query (entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise (resolve => setTimeout(() => resolve(entities), delay))
}

function get (entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entityId === entity.id)
        if (!entity) throw new Error(`Get process failed, cannot find entity with the ID: ${entityId}`)
        return entity
    })
}

function post (entityType, newEntity) {
    newEntity._id = utilService._makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        utilService._save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update process failed, cannot find entity with the ID ${updatedEntity._id}`)
        const entityToUpdate = {...entities[idx], ...updatedEntity}
        entities.splice(idx, 1, entityToUpdate)
        utilService._save(entityType,entities)
        return entityToUpdate
    }) 
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entityId === entity._id)
        if(idx < 0) throw new Error(`Remove process failed, cannot find entity with the ID ${entityId} `)
        entities.splice(idx, 1)
        utilService._save(entityType, entities)
    })
}

