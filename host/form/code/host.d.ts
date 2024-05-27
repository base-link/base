import { CodeForm } from './code';
export type HostNameForm = 'typescript' | 'rust' | 'kotlin' | 'assembly' | 'swift';
export type HostForm = {
    make: (take: TakeHostMakeForm) => void;
};
export type TakeHostMakeForm = {
    form: HostNameForm;
};
export type TakeHostForm = {
    code: CodeForm;
};
