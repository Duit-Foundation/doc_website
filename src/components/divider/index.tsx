import React, { useEffect, useRef, useState } from "react";

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

function Divider(): JSX.Element {
    const containerRef = useRef(null);
    const [squaresPerRow, setSquaresPerRow] = useState(0); // Количество квадратов в одной строке
    const squareSizeWithMargin = 32; // Размер квадрата с учётом отступов
  
    useEffect(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newSquaresPerRow = Math.floor(containerWidth / squareSizeWithMargin);
        setSquaresPerRow(newSquaresPerRow);
      }
    }, []);

    return (
        <div ref={containerRef} className={styles.grid_container}>
            {Array(squaresPerRow * 2).fill(0).map((_, index) => (
        getVariant(getRandomElement())
      ))}
        </div>
    )
}

export default React.memo(Divider);