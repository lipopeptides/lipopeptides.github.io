import React from 'react';
import { TopToolbar, downloadCSV, useDataProvider } from 'react-admin';
import { Button, Typography } from '@mui/material';
import { omit } from "lodash";
import GetApp from "@mui/icons-material/GetApp";
import jsonExport from 'jsonexport/dist';

const CustomListActions = props => {
    const dataProvider = useDataProvider();

    const handleExport = () => {
        const results = dataProvider.getAll('data_table', {});

        results.then((response) => {
            const { data } = response;
            jsonExport(data, (err, csv) => { downloadCSV(csv, 'lipopeptides'); });
        })
        .catch((error) => { console.log('Could not download data: ', error); });
    };

    return (
        <TopToolbar>
            <Button
                style={{ paddingRight: '2rem' }}
                variant="text"
                size="small"
                color="primary"
                onClick={handleExport}
            >
                <GetApp style={{ paddingRight: "3px" }} fontSize="small"/> 
                <Typography>Export</Typography>
            </Button>
        </TopToolbar>
    );
};

export default CustomListActions;