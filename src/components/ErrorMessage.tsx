import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

interface ErrorMessageProps {
    message?: string | null;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = props => {
    const { message, onRetry } =props;

    if (!message) {
        return null;
    }

    return (<Root>
        { props.message }
        { onRetry && <Button className="ml-2"
            onClick={ onRetry }
            variant="link">Retry</Button>
        }
    </Root>);
};

export default ErrorMessage;

const Root = styled.div`
    display: inline-flex;
    align-items: center;
    color: red;
`;
