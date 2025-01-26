import React, { useState } from "react";

import styles from "./styles.module.css";

enum Variant {
    circle = "circle",
    romb = "romb",
    square = "square"
}

const arr = [Variant.circle, Variant.romb, Variant.square];

function getVariant(type: Variant): JSX.Element {
    return <div className={styles[type]}/>
}

function getRandomElement(): Variant {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function RichDivider() {

    const count = ~~((window.visualViewport.width - 160) / 16); //FIXME

    const arr: JSX.Element[] = [];

    for (let index = 0; index < count; index++) {
        arr[index] = getVariant(getRandomElement());
    }

    return (
        <div className={styles.divider}>
            {arr}
        </div>
    )
}

export default React.memo(RichDivider);