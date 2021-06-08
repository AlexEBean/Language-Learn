import { useSelector } from "react-redux"
import "./Home.sass"

const Home = () => {

    const {loggedIn, user: {username}} = useSelector(state => state.user)


    return (
        <main>
            <h1 id="welcome">Welcome {loggedIn ? `back ${username}!`: "to Your Critterpedia!"}</h1>
            {!loggedIn ? <p id="paragraph">Here, you can view all the critters you can currently catch according to your computer's current time and date.</p> : null}
        </main>
    )
}

export default Home