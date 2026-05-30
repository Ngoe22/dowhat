import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [listToPick, setListToPick] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [results, setResults] = useState("");
  const [isRolling, setIsRolling] = useState(false);

  const handleRandom = async () => {
    const l = listToPick.length;

    if (!l) {
      return alert("Please enter a valid option");
    }

    setIsRolling(true);

    const finalIndex = Math.floor(Math.random() * l);
    const finalResult = listToPick[finalIndex];

    const interval = setInterval(() => {
      const randomIndex =
          Math.floor(Math.random() * l);

      setResults(listToPick[randomIndex]);
    }, 100);

    await delayFunction(3000);

    clearInterval(interval);

    setResults(finalResult);
    setIsRolling(false);
  };

  return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Random Picker
          </h1>

          <ul className={styles.list}>
            {listToPick.map((item, index) => (
                <li
                    className={styles.item}
                    key={index}
                >
                  {item}
                  <button onClick={() => {
                    const newList
                        = listToPick.filter(( _,childIndex ) => childIndex !== index )
                    setListToPick(newList)
                  }}
                  className={styles.itemDeleteBtn}
                  >
                    Delete
                  </button>
                </li>
            ))}
          </ul>

          <div className={styles.inputGroup}>
            <input
                className={styles.input}
                value={text}
                onChange={(e) =>
                    setText(e.target.value)
                }
                placeholder="Enter option"
            />

            <button
                className={styles.addBtn}
                onClick={() => {
                  if (!text.trim()) return;

                  setListToPick([
                    ...listToPick,
                    text,
                  ]);

                  setText("");
                }}
            >
              Add
            </button>

            <button
                className={styles.resetBtn}
                onClick={() => {
                  setListToPick([]);
                  setResults("");
                  setText("");
                }}
            >
              Reset
            </button>
          </div>

          <button
              disabled={isRolling}
              className={styles.randomBtn}
              onClick={handleRandom}
          >
            {isRolling
                ? "Mixing..."
                : "Random"}
          </button>

          {results && (
              <div
                  className={`${styles.result} ${
                      isRolling
                          ? styles.rolling
                          : styles.final
                  }`}
              >
                {results}
              </div>
          )}
        </div>
      </div>
  );
}

export default App;

const delayFunction = (ms: number) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );