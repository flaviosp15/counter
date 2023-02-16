import { MouseEvent, useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);
  interface Effect {
    transform: string;
    transition: string;
    opacity: string;
  }
  const initialEffect: Effect = {
    transform: '0',
    transition: '.3s',
    opacity: '1',
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    const sign: string | undefined = target.dataset.sign;
    const isIncreaseBtn: boolean = sign === '+';
    const isDecreaseBtn: boolean = sign === '-';
    const minValue: number = 0;
    const maxValue: number = 99;
    const inputNumber = event.currentTarget.children[1].firstElementChild as HTMLInputElement | null;

    const changeCounterValue = (bool: boolean | undefined) => {
      return setCount((): number => {
        if (bool) {
          return count < maxValue ? count + 1 : maxValue;
        } else {
          return count > minValue ? count - 1 : minValue;
        }
      });
    };

    const effect = (sign: string | undefined, element: HTMLElement) => {
      const isPlusSign = sign === '+';
      const startTransition = () => {
        element.style.transform = isPlusSign ? 'translateY(-100px)' : 'translateY(100px)';
        element.style.opacity = '0';
      };

      startTransition();

      const midTransition = setTimeout(() => {
        element.style.transition = '0s';
        element.style.opacity = '0';
        element.style.transform = isPlusSign ? 'translateY(100px)' : 'translateY(-100px)';

        changeCounterValue(isPlusSign);

        const endTransition = setTimeout(() => {
          element.style.transition = '.3s';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0px)';
        }, 20);
      }, 200);
    };

    if (isIncreaseBtn || isDecreaseBtn) {
      inputNumber ? effect(sign, inputNumber) : null;
    }

    return;
  };

  return (
    <div className="container" onClick={handleClick}>
      <button className="container__btn-decrease btn" data-sign="-">
        –
      </button>
      <div className="container__display">
        <input className="input_display" style={initialEffect} value={count} />
      </div>
      <button className="container__btn-increase btn" data-sign="+">
        +
      </button>
    </div>
  );
}

export default Counter;
