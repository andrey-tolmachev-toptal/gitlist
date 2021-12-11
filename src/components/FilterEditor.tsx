import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { Form,FormGroup, FormLabel } from 'react-bootstrap';
import styled from 'styled-components';

import { Filter } from '../data/types';
import ErrorMessage from './ErrorMessage';

interface FilterEditorProps {
    filter: Filter;
    onChange: (filter: Filter) => void;
}

const FilterEditor: React.FC<FilterEditorProps> = props => {

    const { filter, onChange } = props;

    const [ error, setError ] = useState<string | null>(null);
    const [ minIssues, setMinIssues ] = useState<string | undefined>();
    const [ maxIssues, setMaxIssues ] = useState<string | undefined>();
    const [ searchText, setSearchText ] = useState<string | undefined>();

    useEffect(() => {

        const newFilter:Filter = { };

        if ((minIssues??'').trim()) {
            const parsedValue = parseInt((minIssues??'').trim());

            if (!isNaN(parsedValue)) {
                newFilter.minIssues = parsedValue;
            }
        }

        if ( typeof newFilter.minIssues === 'number' && newFilter.minIssues < 0 ) {
            setError('Incorrect min issues value');

            return;
        }

        if ((maxIssues??'').trim()) {
            const parsedValue = parseInt((maxIssues??'').trim());

            if (!isNaN(parsedValue)) {
                newFilter.maxIssues = parsedValue;
            }
        }

        if ( typeof newFilter.maxIssues === 'number' && newFilter.maxIssues < 0 ) {
            setError('Incorrect max issues value');

            return;
        }

        if (typeof newFilter.minIssues === 'number' && typeof newFilter.maxIssues === 'number'
            && newFilter.minIssues > newFilter.maxIssues) {
            setError('Max issues value can not be larger than min value');

            return;
        }

        if ((searchText??'').trim()) {
            newFilter.searchNameText = (searchText??'').trim();
        }

        onChange(newFilter);
        setError(null);

    }, [ minIssues, maxIssues, searchText ]);


    return ( <FormGroup>
        <GroupHeader>
            <h6>Filters</h6>

            <ErrorMessage message={ error } />
        </GroupHeader>
        <Editors>
            <StyledGroup>
                <Form.Label>Name contains</Form.Label>
                <Form.Control value={ searchText || '' }
                    onChange={ e => setSearchText(e.currentTarget.value) } />
            </StyledGroup>

            <StyledGroup>
                <Form.Label>Min issues</Form.Label>
                <Form.Control value={ minIssues || '' }
                    onChange={ e => setMinIssues(e.currentTarget.value) } />
            </StyledGroup>

            <StyledGroup>
                <Form.Label>Max issues</Form.Label>
                <Form.Control value={ maxIssues || '' }
                    onChange={ e => setMaxIssues(e.currentTarget.value) } />
            </StyledGroup>
        </Editors>
    </FormGroup>);
};

export default FilterEditor;

const Editors = styled.div`
    display: flex;
`;

const GroupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
`;


const StyledGroup = styled(Form.Group)`
    width: 200px;
    margin-right: 20px;
`;
