import React, { Component } from 'react';
import T from 'prop-types';
import { Datagrid } from 'react-admin';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import get from 'lodash/get';
import LocalStorage from './LocalStorage';

const arrayToSelection = values =>
    values.reduce((selection, columnName) => {
        selection[columnName] = true;
        return selection;
}, {});

// CustomizableDatagrid allows to show/hide columns dynamically the preferences 
// are stored in local storage.
class CustomizableDatagrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
            selection: this.getInitialSelection(),
        };
    }

    getColumnNames() {
        const { children } = this.props;
        return filter(React.Children.map(children, field => get(field, ['props', 'source'])));
    }

    getColumnLabels() {
        const { children } = this.props;
        return filter(
            React.Children.map(
                children,
                field =>
                    field && {
                        source: get(field, ['props', 'source']),
                        label: get(field, ['props', 'label']),
                    }
            ), item => item && item.source
        );
    }

    getInitialSelection() {
        const { defaultColumns, resource, children, storage } = this.props;
        const previousSelection = storage.get(resource);

        // If we have a previously stored value, let's return it.
        if (!isEmpty(previousSelection)) {
            return previousSelection;
        }

        // If defaultColumns are set let's return them.
        if (!isEmpty(defaultColumns)) {
            return arrayToSelection(defaultColumns);
        }

        // Otherwise we fallback on the default behaviour : display all columns.
        return arrayToSelection(this.getColumnNames());
    }

    // Updates the storage with the internal state value.
    updateStorage = () => {
        this.props.storage.set(this.props.resource, this.state.selection);
    };

    toggleColumn = columnName => {
        const previousSelection = this.state.selection;
        const selection = {
            ...previousSelection,
            [columnName]: !previousSelection[columnName],
        };
        this.setState({ selection }, this.updateStorage);
    };

    handleOpen = () => this.setState({ modalOpened: true });
    handleClose = () => this.setState({ modalOpened: false });

    renderChild = child => {
        const source = get(child, ['props', 'source']);
        const { selection } = this.state;

        // Show children without source, or children explicitly visible.
        if (!source || selection[source]) {
            return React.cloneElement(child, {});
        }

        return null;
    };

    render() {
        const { children, defaultColumns, ...rest } = this.props;

        return (
            <Datagrid 
                bulkActionButtons={false} // Disables selection of rows.
                {...rest}
            >
                {React.Children.map(children, this.renderChild)}
            </Datagrid>
        );
    }
}

CustomizableDatagrid.propTypes = {
    defaultColumns: T.arrayOf(T.string),
    storage: T.shape({
        get: T.func.isRequired,
        set: T.func.isRequired,
    }),
};

CustomizableDatagrid.defaultProps = {
    defaultColumns: [],
    storage: LocalStorage,
};

export default CustomizableDatagrid;