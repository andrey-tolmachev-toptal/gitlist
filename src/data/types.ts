export interface DropdownOption {
    label: string;
    value: number;
}

export interface Organization {
    login: string;
    id: number;
}

export interface OrganizationsData {
    items: Organization[];
}

export interface Repository {
    open_issues: number;
    name: string;
    stargazers_count: number;
}


export interface DataError {
    errors: { message: string }[];
    message: string;
}

export interface RepositoriesData {
    items: Repository[];
    total_count: number;
}

export interface ListItem {
    issues: number;
    starts: number;
    name: string;
}

export interface Filter {
    searchNameText?: string;
    minIssues?: number;
    maxIssues?: number;
}
