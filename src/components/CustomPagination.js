import { Pagination } from 'react-admin';

const CustomPagination = props => {
    return <Pagination rowsPerPageOptions={[5, 25, 50, 100, 500]} {...props}/>
};

export default CustomPagination;