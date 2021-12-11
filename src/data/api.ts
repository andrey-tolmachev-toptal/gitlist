import { Octokit } from '@octokit/core';

import { DropdownOption, ListItem, OrganizationsData, RepositoriesData, Repository } from './types';

const TOKEN = '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';

export const getOrgs = async (searchString = ''): Promise<DropdownOption[] | null> => {
    const octokit = new Octokit({ auth: TOKEN });

    try {
        const queryString = encodeURIComponent(`${ searchString } type:org`);

        const response = await octokit.request(`GET /search/users?q=${ queryString }`);

        return (response.data as OrganizationsData).items.map(org => ({ label: org.login, value: org.id }));
    } catch {
        return null;
    }
};

const fetchPageRepos = async (octokit: Octokit, org: string, page: number): Promise<RepositoriesData | null | string> => {
    const queryString = encodeURIComponent(`org:${ org }`);
    
    try {

        const response = await octokit.request(`GET /search/repositories?q=${ queryString }&page=${ page }&per_page=100`, { responseType: 'json' });

        return (response.data as RepositoriesData);


    } catch (err: any) {

        if (err.response.data.errors && err.response.data.errors.length ) {
            return err.response.data.errors[0].message;
        }

        if (err.response.data.message ) {
            return err.response.data.message;
        }

        return null;
    }
};

const convertToListItem = (items: Repository[]) => {
    const result: ListItem[] = [];

    for (const item of items) {
        result.push({
            name: item.name,
            issues: item.open_issues,
            starts: item.stargazers_count
        });
    }

    return result;
};

export const getAllRepos = async (org: string): Promise<ListItem[] | null | string> => {
    const octokit = new Octokit({ auth: TOKEN });
    
    let result: ListItem[] = [];

    const firstPage = await fetchPageRepos(octokit, org, 1);
    
    if (firstPage === null || typeof firstPage === 'string') {
        return firstPage;
    }
    
    result = [ ...result, ...convertToListItem(firstPage.items) ];

    const maxPage = Math.ceil(Math.min(firstPage.total_count, 1000) / 100);

    const promises: Promise<string | RepositoriesData | null>[] = [];
    
    for (let page = 2; page <= maxPage; page++) {
        promises.push(fetchPageRepos(octokit, org, page));
    }
    
    if (promises.length) {
        const nextPages = await Promise.all(promises);

        for (let i=0; i<nextPages.length; i++) {
            if (nextPages[i] === null || typeof nextPages[i] === 'string') {
                return nextPages[i] as string;
            } else {
                result = [ ...result, ...convertToListItem((nextPages[i] as RepositoriesData).items) ];
            }
        }
    }
    
    return result;
};
