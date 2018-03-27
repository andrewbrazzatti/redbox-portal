export declare class Report {
    title: string;
    name: string;
    solrQuery: string;
    filter: object;
    columns: object[];
}
export declare class ReportResults {
    totalItems: number;
    currentPage: number;
    noItems: number;
    items: object[];
}
