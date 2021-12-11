import React, { useState } from 'react';
import { FormGroup,FormLabel } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';

import { getOrgs } from '../data/api';
import { DropdownOption } from '../data/types';
import ErrorMessage from './ErrorMessage';

interface OrganizationSelectorProps {
    onSelect: (name: string) => void
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = props => {

    const { onSelect } = props;

    const [ loading, setLoading ] = useState(false);
    const [ searchText, setSearchText ] = useState('');
    const [ value, setValue ] = useState<DropdownOption|null>(null);
    const [ error, setError ] = useState<string | null>(null);

    const updateOrgs = async (searchString: string) => {
        setError(null);
        setLoading(true);
        const result = await getOrgs(searchString);
        setLoading(false);
        
        if (result === null) {
            setError('Error loading organizations list');
        }

        return result || [];
    };

    const loadOptions = async (
        inputValue: string,
        callback: (options: DropdownOption[]) => void
    ) => {
        callback(await updateOrgs(inputValue));
    };

    const handleChange = (newValue: DropdownOption | null) => {
        setValue(newValue);
        onSelect(newValue?.label || '');
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            background: '#ffe9ec'
        })
    };

    return ( <FormGroup>
        <GroupHeader>
            <h6>Organization</h6>

            <ErrorMessage message={ error } />
        </GroupHeader>

        <AsyncSelect
            inputValue={ searchText }
            isLoading={ loading }
            loadOptions={ loadOptions }
            onChange={ handleChange }
            onInputChange={ value => setSearchText(value) }
            placeholder="Select organization"
            styles={ error ? customStyles : undefined }
            value={ value }
        />
    </FormGroup>);
};

export default OrganizationSelector;

const GroupHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

