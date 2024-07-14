import React, { useEffect, useState } from 'react';
import { List, TextField, useDataProvider } from 'react-admin';
import FolderIcon from '@mui/icons-material/Folder';
import { Box, Card } from '@mui/material';
import CustomizableDatagrid from '../components/CustomizableDatagrid';
import CustomListActions from '../components/CustomListActions';
import CustomPagination from '../components/CustomPagination';
import PieChart from '../components/PieChart';

const LipopeptideList = (props) => {
    const dataProvider = useDataProvider();
    const [hasClusterCount, setHasClusterCount] = useState(0);
    const [noClusterCount, setNoClusterCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            const { data } = await dataProvider.getAll('data_table', {});
            
            // Count number of items in data that has non-empty string for 
            // 'mibig_cluster' key.
            const hasCluster = data.filter(item => item.mibig_cluster !== '');
            const noCluster = data.filter(item => item.mibig_cluster === '');

            setHasClusterCount(hasCluster.length);
            setNoClusterCount(noCluster.length);
        };
        fetchCount();
    }, [dataProvider, hasClusterCount, noClusterCount]);

    return (
        <Box>
            <PieChart 
                hasClusterCount={hasClusterCount}
                noClusterCount={noClusterCount}
            />
            <Card>
                <div className='app-card'>
                    <List 
                        actions={<CustomListActions />}
                        pagination={<CustomPagination />}
                        perPage={5}
                        exporter={false}
                        {...props}
                    >
                        <CustomizableDatagrid
                            defaultColumns={[
                                'id',
                                'compound_name',
                                'canonical_smiles',
                                'producing_organism',
                                'mibig_cluster',
                                'lipid_tail_smiles'
                            ]}
                        >
                            <TextField 
                                source='id'
                                label='ID'
                                sortable={false}
                            />
                            <TextField 
                                source='compound_name'
                                label='Name'
                                sortable={false}
                            />
                            {/* <TextField 
                                source='canonical_smiles'
                                label='Canonical SMILES'
                                sortable={false}
                            /> */}
                            <TextField 
                                source='producing_organism'
                                label='Producing organism'
                                sortable={false}
                            />
                            <TextField 
                                source='mibig_cluster'
                                label='Associated MIBiG cluster'
                                sortable={false}
                            />
                            <TextField 
                                source='lipid_tail_smiles'
                                label='Lipid tail SMILES'
                                sortable={false}
                            />
                        </CustomizableDatagrid>
                    </List>
                </div>
            </Card>
        </Box>
    );
};

const lipopeptides = {
    name: 'data_table',
    icon: FolderIcon,
    list: LipopeptideList,
};

export default lipopeptides;