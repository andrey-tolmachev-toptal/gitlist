import React, { ReactNode } from 'react';
import { Pagination } from 'react-bootstrap';

interface ReposPaginationProps {
    totalCount: number;
    page: number;
    onSelect: (value: number) => void;
    perPage?: number;
}

const ReposPagination: React.FC<ReposPaginationProps> = props => {
    const { totalCount, page, onSelect, perPage = 30 } = props;

    if (totalCount < perPage) {
        return null;
    }

    const maxPage = Math.ceil(totalCount / perPage);

    if (maxPage <= 1) {
        return null;
    }

    const items: ReactNode[] = [];
    const startPage = Math.max(1, page - 3);

    if (startPage > 1) {
        items.push(
            <Pagination.Item key={ 1 }
                onClick={ () => onSelect(1) }
                active={ 1 === page }>
                1
            </Pagination.Item>
        );
    }
    
    if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-1" />);
    }

    const endPage = Math.min(maxPage, page + 3);

    
    for (let pageNo = startPage; pageNo <= endPage; pageNo++) {
        items.push(
            <Pagination.Item key={ pageNo }
                onClick={ () => onSelect(pageNo) }
                active={ pageNo === page }>
                { pageNo }
            </Pagination.Item>
        );
    }

    if (endPage < maxPage - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
    }
    
    if (endPage !== maxPage) {
        items.push(
            <Pagination.Item key={ maxPage }
                onClick={ () => onSelect(maxPage) }
                active={ maxPage === page }>
                { maxPage }
            </Pagination.Item>
        );
    }
    
    return (<Pagination size="sm">{ items }</Pagination>);

};

export default ReposPagination;

