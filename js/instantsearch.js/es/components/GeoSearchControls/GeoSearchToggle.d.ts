/** @jsx h */
import type { ComponentChildren } from 'preact';
import { h } from 'preact';
declare type Props = {
    classNameLabel: string;
    classNameInput: string;
    checked: boolean;
    onToggle(event: Event): void;
    children: ComponentChildren;
};
declare const GeoSearchToggle: ({ classNameLabel, classNameInput, checked, onToggle, children, }: Props) => h.JSX.Element;
export default GeoSearchToggle;
