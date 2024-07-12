import React, { useEffect, useState } from 'react';
import { Admin, Resource, Loading } from 'react-admin';
import { createRoot } from 'react-dom/client';
import { Box, CssBaseline } from '@mui/material';
import { createDbWorker } from 'sql.js-httpvfs';
import { getDbDescription } from './database/DbDiscover';
import dataProviderFactory from './database/DataProvider';
import lipopeptides from './resources/lipopeptides';

const workerUrl = new URL('sql.js-httpvfs/dist/sqlite.worker.js', import.meta.url);
const wasmUrl = new URL('sql.js-httpvfs/dist/sql-wasm.wasm', import.meta.url);
const config = {
    from: 'inline',
    config: {
        serverMode: 'full', 
        requestChunkSize: 4096,
        url: process.env.DB_URL
    }
};

const App = () => {
    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
        const startDataProvider = async () => {
            const worker = await createDbWorker(
                [config],
                workerUrl.toString(), wasmUrl.toString()
            );
            await getDbDescription(worker);
            setDataProvider(dataProviderFactory(worker));
        }
        if (dataProvider === null) {startDataProvider();}
    }, [dataProvider]);

    if (dataProvider === null) {return <Loading/>};

    return (
        <React.Fragment>
            <CssBaseline />
            <Box>
                {dataProvider === null ? <Loading /> : (
                    <Admin
                        dataProvider={dataProvider}
                    >
                        <Resource {...lipopeptides}/>
                    </Admin>
                )}
            </Box>
        </React.Fragment>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(<App />);