import react, {useState} from 'react';
import './App.css';

function App() {

  const operators = {"+" : true, "*" : true, "/" : true},
        endsWithOperator = /[x+‑/]$/;

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);
  const [isDot, setIsDot] = useState(false);
  const [currentVal, setCurrentVal] = useState(0);

  
  const display = (symbol) => {    
    if (expression[0] === "0" && symbol === "0") {
     return
    }

    setCurrentVal(expression + symbol);
    setExpression((prev) => {
      const length = prev.trim().length - 1;
      
      if (operators[symbol] && operators[prev[length]]) {
        const newPrev = prev.slice(0, -1) + symbol;
        return newPrev;
      } 
      else if (prev[length] == "-" && operators[symbol] ) {
        const newPrev = prev.slice(0, -2) + symbol;
        return newPrev;
      }
      else if (symbol == ".") {
        if (prev[length] == ".") {
          const newPrev = prev.slice(0, -1) + symbol;
          return newPrev;
        } else if (!isDot) {
          setIsDot(true);
          return prev + symbol;
        } else {
          return prev;
        }    
      }

      if (operators[symbol] || symbol === "-") {
        setCurrentVal(symbol);
        setIsDot(false);
      }

      return prev + symbol;
    });

    if (expression[expression.length - 1] == "=" ) {
      if (/[0-9.]/.test(symbol)) {
        setExpression(symbol);
      } else {
        setExpression(result + symbol);
      }
    }
    
 
  };

  const calculate = () => {
    setResult(eval(expression));
    setCurrentVal(eval(expression));
    setExpression(prev => prev + "=");
    setIsDot(false);
  };

  const allClear = () => {
    setCurrentVal(0);
    setExpression("");
    setResult(0);
    setIsDot(false);
  };

  const clear = () => {

    setExpression((prev) => 
    prev
    .split("")
    .slice(0, prev.length - 1)
    .join("")
    )
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="dis">
          <input type="text" name="input" value={expression} disabled/>
          <div className="total">
            <span id="display"> {currentVal} </span>
            </div>
        </div>
        <div onClick={allClear} className="inputButton AC tomato" id="clear">AC</div>
        <div onClick={clear} className="inputButton C tomato" id="C">C</div>
        <div onClick={() => display("/")} className="inputButton div" id="divide">/</div>
        <div onClick={() => display("*")} className="inputButton times" id="multiply">*</div>
        <div onClick={() => display("7")} className="inputButton seven dark-gray" id="seven">7</div>
        <div onClick={() => display("8")} className="inputButton eight dark-gray" id="eight">8</div>
        <div onClick={() => display("9")} className="inputButton nine dark-gray" id="nine">9</div>
        <div onClick={() => display("-")} className="inputButton minus" id="subtract">-</div>
        <div onClick={() => display("4")} className="inputButton four dark-gray" id="four">4</div>
        <div onClick={() => display("5")} className="inputButton five dark-gray" id="five">5</div>
        <div onClick={() => display("6")} className="inputButton six dark-gray" id="six">6</div>
        <div onClick={() => display("+")} className="inputButton plus" id="add">+</div>
        <div onClick={() => display("1")} className="inputButton one dark-gray" id="one">1</div>
        <div onClick={() => display("2")} className="inputButton two dark-gray" id="two">2</div>
        <div onClick={() => display("3")} className="inputButton three dark-gray" id="three">3</div>
        <div onClick={calculate} className="inputButton equal" id="equals">=</div>
        <div onClick={() => display("0")} className="inputButton zero dark-gray" id="zero">0</div>
        <div onClick={() => display(".")} className="inputButton dot dark-gray" id="decimal">.</div>
      </div>
    </div>
  );
}

export default App;
