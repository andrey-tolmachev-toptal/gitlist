import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import FilterEditor from './components/FilterEditor';
import OrganizationSelector from './components/OrganizationSelector';
import ReposList from './components/ReposList';
import { Filter } from './data/types';

function App() {

    const [ organization, setOrganization ] = useState<string | null>(null);
    const [ filter, setFilter ] = useState<Filter>({});

    return (
        <Container>
            <Row className="mt-4 mb-4">
                <Col>
                    <OrganizationSelector onSelect={ setOrganization } />
                </Col>
            </Row>

            { Boolean(organization) &&
            <Row className="mb-4">
                <Col>
                    <FilterEditor filter={ filter }
                        onChange={ setFilter }/>
                </Col>
            </Row>
            }

            <Row>
                <Col>
                    <ReposList organization={ organization }
                        filter={ filter } />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
