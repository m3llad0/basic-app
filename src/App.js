import { useReducer } from "react"
import DigitButton from "./digitButton"
import OperationButton from "./operationButton"
import "./style.css"

export const ACTIONS = {

    ADD_DIGITS: 'add-digit',
    CHOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'

}
function reducer(state, {type, payload}){
    switch(type)
    {
        case ACTIONS.ADD_DIGITS:
            if(state.overwrite){
                return{
                    ...state,
                    currentOperation:payload.digit,
                    overwrite: false
                }
            }
            if(payload.digit == "0" && state.currentOperation == "0") 
            {
                return state
            }
            if(payload.digit == "." && state.currentOperation.includes(".")) 
            {
                return state
            }

            return {...state,
                currentOperation: `${state.currentOperation || ""}${payload.digit}`}

    case ACTIONS.CHOSE_OPERATION:
        if(state.currentOperation == null && state.previousOperation == null){
            return state
        }

        if(state.currentOperation == null)
        {
            return{
                ...state,
                operation: payload.operation,
            }
        }

        if(state.previousOperation == null){
            return{
                ...state,
                operation: payload.operation,
                previousOperation: state.currentOperation, 
                currentOperation: null,
            }
        }

        return{
            ...state,
            previousOperation: evaluate(state),
            payload: state.operation,
            currentOperation: null
        }
    case ACTIONS.CLEAR:
            return {}

    case ACTIONS.DELETE_DIGIT:
        if(state.overwrite)
        {
            return{
                ...state,
                overwrite: false,
                currentOperation: null
            }
        }

        if(state.currentOperation == null) return state
        if(state.currentOperation.length == 1){
            return{...state, currentOperation: null}
        }

        return{
            ...state,
            currentOperation: state.currentOperation.slice(0, -1)
        }
    case ACTIONS.EVALUATE:
        if(
            state.operation == null || 
            state.currentOperation == null ||
            state.previousOperation == null){

                return state
        }

        return{
            ...state,
            previousOperation: null,
            overwrite: true,
            operation: null,
            currentOperation: evaluate(state)
        }
    }
}

function evaluate({currentOperation, previousOperation, operation})
{
    const prev = parseFloat(previousOperation)
    const current = parseFloat(currentOperation)

    if(isNaN(prev) || isNaN(current)) return ""

    let computation = ""

    switch (operation){
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break

        case "÷":
            computation = prev / current
            break
    }

    return computation.toString()

}
function App()
{
    const [{currentOperation, previousOperation, operation}, dispatch] = useReducer(reducer, {})
    return (
    <div>
        <div className="information">
            <h2>Diego Mellado Oliveros</h2>
            <h3>A01655451</h3>
            <h3>Basic calculator</h3>
        </div>
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operation">{previousOperation} {operation}</div>
                <div className="current-operation">{currentOperation}</div>
            </div>
            <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
            <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
            <OperationButton operation = "÷" dispatch = {dispatch}></OperationButton>
            <DigitButton digit= "1" dispatch={dispatch}></DigitButton>
            <DigitButton digit= "2" dispatch={dispatch}></DigitButton>
            <DigitButton digit= "3" dispatch={dispatch}></DigitButton>
            <OperationButton operation = "*" dispatch = {dispatch}></OperationButton>
            <DigitButton digit= "4" dispatch={dispatch}></DigitButton>
            <DigitButton digit= "5" dispatch={dispatch}></DigitButton>
            <DigitButton digit= "6" dispatch={dispatch}></DigitButton>
            <OperationButton operation = "+" dispatch = {dispatch}></OperationButton>
            <DigitButton digit= "7" dispatch={dispatch}></DigitButton>
            <DigitButton digit= "8" dispatch={dispatch}></DigitButton>
            <DigitButton digit= "9" dispatch={dispatch}></DigitButton>
            <OperationButton operation = "-" dispatch = {dispatch}></OperationButton>
            <DigitButton digit= "." dispatch={dispatch}></DigitButton>
            <DigitButton digit= "0" dispatch={dispatch}></DigitButton>
            <button className="span-two"
            onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
            

        </div>
    </div>
    )

}

export default App