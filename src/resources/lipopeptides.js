import React from 'react';
import { List, TextField } from 'react-admin';
import FolderIcon from '@mui/icons-material/Folder';
import { Card } from '@mui/material';
import CustomizableDatagrid from '../components/CustomizableDatagrid';

const LipopeptideList = (props) => {
    return (
        <Card>
            <div className="app-card">
                <List 
                    perPage={25}
                    exporter={false}
                    {...props}
                >
                    <CustomizableDatagrid
                        defaultColumns={[
                            'compound_id',
                            'compound_name',
                            'canonical_smiles',
                        ]}
                    >
                        <TextField 
                            source='compound_id'
                            label="ID" 
                            sortable={true}
                        />
                        <TextField 
                            source='compound_name'
                            label="Name" 
                            sortable={true}
                        />
                        <TextField 
                            source='canonical_smiles'
                            label="Canonical SMILES" 
                            sortable={false}
                        />
                    </CustomizableDatagrid>
                </List>
            </div>
        </Card>
    );
};

const lipopeptides = {
    name: 'data_table',
    icon: FolderIcon,
    list: LipopeptideList,
};

export default lipopeptides;