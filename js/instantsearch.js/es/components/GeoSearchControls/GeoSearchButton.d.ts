/** @jsx h */
import type { ComponentChildren } from 'preact';
import { h } from 'preact';
declare type Props = {
    className: string;
    onClick(event: MouseEvent): void;
    children: ComponentChildren;
    disabled?: boolean;
};
declare const GeoSearchButton: ({ className, disabled, onClick, children, }: Props) => h.JSX.Element;
export default GeoSearchButton;
