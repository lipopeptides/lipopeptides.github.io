import queryBuilder from './SqlQueryBuilder';

const getTotalCountCompounds = (resource, params) => {
    return queryBuilder
        .select('count(*)')
        .from(resource)
        .toParams({ placeholder: '?%d' })
};

const getData = (resource, params, paginated) => {
    const select = 'compound_id, compound_name, canonical_smiles, producing_organism, mibig_cluster, lipid_tail_smiles';

    if (paginated) {
        return queryBuilder
            .select(select)
            .from(resource)
            .limit(params.pagination.perPage)
            .offset((params.pagination.page - 1) * params.pagination.perPage)
            .toParams({ placeholder: '?%d' })
    } else {
        return queryBuilder
            .select(select)
            .from(resource)
            .toParams({ placeholder: '?%d' })
    };
};

const formatResults = (results) => {
    const { columns: columnNames, values: columnValues } = results;
    return columnValues.map((row) => 
        row.reduce((acc, value, index) => {
            const key = columnNames[index] === 'compound_id' ? 'id' : columnNames[index];
            const formattedValue = typeof value === 'string' ? value.replace(/\|/g, ' or ') : value;
            acc[key] = formattedValue;
            return acc;
        }, {})
    );
};
  
export default (dbClient) => ({
    getList: (resource, params) => {
        const { text: dataQuery, values: dataQueryParams } = getData(resource, params, true);    
        const { text: countQuery, values: countQueryParams } = getTotalCountCompounds(resource, params);

        // Execute both queries in parallel.
        return Promise.all([
            dbClient.db.exec(dataQuery, dataQueryParams),
            dbClient.db.exec(countQuery, countQueryParams)
        ])
        .then(([dataQueryResult, countQueryResult]) => {
            // Process the results of both queries.
            const data = formatResults(dataQueryResult[0]);
            const total = parseInt(countQueryResult[0].values[0]);
            return { data, total };
        })
        .catch((error) => {
            console.log('SQL error: ', error);
            return error;
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
        const { text: dataQuery, values: dataQueryParams } = getData(resource, params, false);    
        
        return Promise.all([
            dbClient.db.exec(dataQuery, dataQueryParams)
        ])
        .then(([dataQueryResult]) => {
            const data = formatResults(dataQueryResult[0]);
            return { data };
        })
        .catch((error) => {
            console.log('SQL error: ', error);
            return error;
        });
    },
});