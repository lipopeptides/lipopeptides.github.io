import queryBuilder from './SqlQueryBuilder';

const getData = (resource, params) => {
    return queryBuilder
        .select('compound_id, compound_name, canonical_smiles')
        .from(resource)
        .toParams({ placeholder: '?%d' })
};
  
export default (dbClient) => ({
    getList: (resource, params) => {
        const { text: query, values: queryParams } = getData(resource, params);    

        return dbClient.db
            .exec(query, queryParams)
            .then((queryResult) => {
                return {
                    data: queryResult.map((row) => {
                        const { compound_id, compound_name, canonical_smiles } = row;
                        return {
                            id: compound_id,
                            compound_id,
                            compound_name,
                            canonical_smiles
                        }
                    }),
                    total: queryResult.length
                }
            })
            .catch((error) => {
                console.log('SQL error: ', error)
                return error
            });
    },
  
    getOne: (resource, params) => {
        console.log("getOne", resource, params)
        return Promise.reject('getOne is not yet implemented')
    },
  
    getMany: (resource, params) => {
        console.log("getMany", resource, params)
        return Promise.reject('getMany is not yet implemented')
    },
  
    getManyReference: (resource, params) => {
        console.log("getManyReference", resource, params)
        return Promise.reject('getManyReference is not yet implemented')
    },
  
    update: (resource, params) => {
        console.log("update", resource, params)
        return Promise.reject('update is not yet implemented')
    },
  
    updateMany: (resource, params) => {
        console.log("updateMany", resource, params)
        return Promise.reject('updateMany is not yet implemented')
    },
  
    create: (resource, params) => {
        console.log("create", resource, params)
        return Promise.reject('create is not yet implemented')
    },
  
    delete: (resource, params) => {
        console.log("delete", resource, params)
        return Promise.reject('delete is not yet implemented')
    },
  
    deleteMany: (resource, params) => {
        console.log("deleteMany", resource, params)
        return Promise.reject('delete is not yet implemented')
    },
  
    getAll: (resource, params) => {
        console.log("getAll", resource, params)
        return Promise.reject('getAll is not yet implemented')
    },
});