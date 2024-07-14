import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ hasClusterCount, noClusterCount }) => {
    const data = {
        labels: ['Has MIBiG cluster', 'No MIBiG cluster'],
        datasets: [
            {
                label: 'MIBiG Cluster Association',
                data: [hasClusterCount, noClusterCount],
                backgroundColor: ['#0000ff', '#ff0000'],
                hoverBackgroundColor: ['#0000ff', '#ff0000'],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <div 
            style={{ 
                width: '400px',
                margin: '20px',
            }}
        >
            <Pie 
                data={data} 
                options={options}
            />
        </div>
    );
};

export default PieChart;
