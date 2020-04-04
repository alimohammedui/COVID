import React, { ReactChild, ReactElement } from 'react';

export declare type Children = ReactChild | ReactElement | ReactElement[] | Array<React.ReactNode | React.ReactNode[] | string>

export const formattedLabel = (label: string, ...args: Array<number | string | JSX.Element>): Children => {
    const regex = /\%[0-9]+/g;
    const argumetIndexes = label.match(regex).map(item => Number(item.replace('%', '')))
    const getArg = (index: number) => {
        const argumentIndex = argumetIndexes[index];
        return argumentIndex && args[argumentIndex - 1];
    }
    return label.split(regex)
        .map((str, index) => {
            return [str, getArg(index)]
        })
        .reduce((acc, val) => acc.concat(val), []);
}