declare type WidgetParam = {
    name: string;
    connector?: boolean;
};
export declare const createDocumentationLink: ({ name, connector, }: WidgetParam) => string;
declare type DocumentationMessageGenerator = (message?: string) => string;
export declare const createDocumentationMessageGenerator: (...widgets: WidgetParam[]) => DocumentationMessageGenerator;
export {};
