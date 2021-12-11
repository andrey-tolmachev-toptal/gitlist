import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';

import { getAllRepos } from '../data/api';
import { Filter, ListItem } from '../data/types';
import ErrorMessage from './ErrorMessage';
import ReposPagination from './ReposPagination';

interface ReposListProps {
    organization: string | null;
    filter: Filter;
}

const ReposList: React.FC<ReposListProps> = props => {
    const {
        organization,
        filter
    } = props;

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string|null>(null);
    const [ items, setItems ] = useState<ListItem[] | null>(null);
    const [ page, setPage ] = useState(1);

    const loadItems = async () => {
        if (!organization) {
            return;
        }

        setError(null);
        setLoading(true);
        setPage(1);

        const result = await getAllRepos(organization);

        setLoading(false);

        if (typeof result === 'string' || result === null) {
            setError(result || 'Error loading repositories list');
            setItems(null);
        } else {
            setItems(result);
        }
    };

    useEffect(() => {
        loadItems();
    }, [ organization ]);

    const renderLoading = () => {
        if (!loading) {
            return null;
        }

        return <Spinner animation="grow" />;
    };
    
    const filterItems = (): ListItem[] => {
        if (!items) {
            return [];
        }

        let filteredItems = [ ...items ];

        const searchText = (filter.searchNameText ?? '').trim().toLowerCase();

        if (searchText) {
            filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchText));
        }

        if (typeof filter.minIssues === 'number') {
            if (typeof filter.maxIssues === 'number') {
                filteredItems = filteredItems.filter(item => item.issues >= (filter.minIssues as number) && item.issues <= (filter.maxIssues as number));
            } else {
                filteredItems = filteredItems.filter(item => item.issues >= (filter.minIssues as number));
            }
        } else {
            if (typeof filter.maxIssues === 'number') {
                filteredItems = filteredItems.filter(item => item.issues <= (filter.maxIssues as number));
            }
        }

        return filteredItems;
    };

    const renderList = () => {
        if (loading || error || !items) {
            return null;
        }

        const filteredItems = filterItems();

        const maxFilteredPage = Math.max(Math.ceil(filteredItems.length / 30), 1);
        const currentPage = Math.min(page, maxFilteredPage);
        const currentPageItems = filteredItems.slice((currentPage-1)*30, currentPage*30-1);

        
        return (<div>
            <h6>Repositories [{ filteredItems.length }]</h6>
            <ReposPagination totalCount={ filteredItems.length }
                page={ currentPage }
                onSelect={ setPage }
            />
            <Table striped
                bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Open issues</th>
                        <th>Stars</th>
                    </tr>
                </thead>
                <tbody>
                    { currentPageItems.map(item => (<tr key={ item.name }>
                        <td>{ item.name }</td>
                        <td>{ item.issues }</td>
                        <td>{ item.starts }</td>
                    </tr>)) }
                </tbody>
            </Table>
            <ReposPagination totalCount={ filteredItems.length }
                page={ page }
                onSelect={ setPage }
            />
        </div>);
    };

    const renderError = () => <ErrorMessage message={ error }
        onRetry={ loadItems } />;

    return (<>
        { renderLoading() }
        { renderError() }
        { renderList() }
    </>);
};

export default ReposList;

