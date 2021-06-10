import {useState, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom"
import {changeLoggingIn, login, selectError, selectLoggingIn, selectLoggedIn} from "../../redux/slices/userSlice"
import "./Auth.sass"

const Entry = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [region, setRegion] = useState("")
    const [filledOut, setFilledOut] = useState(false)
    const [passMatch, setPassMatch] = useState(false)

    const dispatch = useDispatch()
    const error = useSelector(selectError)
    const loggingIn = useSelector(selectLoggingIn)
    const loggedIn = useSelector(selectLoggedIn)
    const history = useHistory()

    useEffect(() => {
        if (!loggingIn) {
            if (password === passwordCheck) {
                setPassMatch(true)
            } else {
                setPassMatch(false)
            }
            if(username && email && password && passwordCheck && passMatch && region){
                setFilledOut(true)
            } else {
                setFilledOut(false)
            }
        } else {
            if (email && password){ 
                setFilledOut(true)
            } else {
                setFilledOut(false)
            }
        }
        console.log()
    }, [username, email, password, passwordCheck, region, passMatch, loggingIn])

    useEffect(() => {
        if (loggedIn) {history.push("/")}
    }, [loggedIn, history])

    const entryFn = e => {
        e.preventDefault()
        const loginObj = {email, password}
        const registerObj = {username, ...loginObj, region}

        if ((loggingIn && filledOut) || (passMatch && filledOut)) {
            const user = loggingIn ? loginObj : registerObj
            dispatch(login(user))
        }
    }

    const inputsArr = [
        {label: "Username", type: "text", setState: setUsername},
        {label: "Email", type: "email", setState: setEmail},
        {label: "Password", type: "password", setState: setPassword},
        {label: "Confirm password", type: "password", setState: setPasswordCheck}
    ]

    const inputsMapCheck = loggingIn ? inputsArr.splice(1, 2) : inputsArr

    const radioInputArr = [{label: "Northern", id: "Northern"}, {label: "Southern", id: "Southern"}]

    return (
        <div className="page">
            {error ? <h3>{error}</h3> : null}
            <form onSubmit={e => entryFn(e)} className="foreground" id="entry-form">
                <div id="entry-inputs">
                    {inputsMapCheck.map(input => (
                        <div key={input.label} className="input-container">
                            <label className="input-label">{input.label}</label>
                            <input className="input-input" type={input.type} onChange={e => input.setState(e.target.value)} />
                        </div>
                    ))}
                    
                    {!passMatch && !loggingIn ? <h5 id="passwords-do-not-match">Passwords do not match</h5> : null}

                    {!loggingIn ? (
                        <div id="radio-input-outer">
                            <label className="input-label">Hemisphere</label>
                            <div id="radio-input-inner">
                                {radioInputArr.map(radioInput => (
                                    <div key={radioInput.label} id="radio-input-container">
                                        <input 
                                            type = "radio"
                                            className = "radio-input"
                                            name = "hemisphere" 
                                            id = {radioInput.id} 
                                            onClick = {e => setRegion(e.target.id)} 
                                        />
                                        <label className = "radio-input-label" htmlFor={radioInput.id}>{radioInput.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div id="entry-buttons">
                    <input 
                        type = "button"
                        id = "change-state-button"
                        onClick = {() => dispatch(changeLoggingIn())} 
                        value = {loggingIn ? "Create an account?" : "Already have an account?"} 
                    />
                    <button type = "submit" disabled = {!filledOut} className="button">
                        {loggingIn ? "Login" : "Create Account"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Entry