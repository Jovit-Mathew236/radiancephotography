import React, { useContext, useState } from 'react'
import { unstable_HistoryRouter } from 'react-router-dom'
import { FirebaseContext } from '../store/Contexts'
import './form.css'

function Treahunt() {
    const history = unstable_HistoryRouter

    const { firebase } = useContext(FirebaseContext)
    const [regNo, setRegNo] = useState(0)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [college, setCollege] = useState('')


    // allet box Function
    const okFunc = () => {
        var pop = document.getElementById("pop")
        var popcont = document.getElementById("popcont")
        pop.classList.remove("hide")
        pop.classList.add("show")
        popcont.classList.add("alert-container-show")
        setTimeout(() => {
            pop.classList.remove("show")
            pop.classList.add("hide")
        }, 5000)
    }
    const closeFunc = () => {
        var pop = document.getElementById("pop")
        pop.classList.remove("show")
        pop.classList.add("hide")
    }// alert box function close


    // calling resitration number
    firebase.firestore().collection('Registration Number Online Treasure Hunt').doc('unique').get().then((res) => {
        setRegNo(res.data().number)
    })


    // submit btn function
    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection('Registration Number Online Treasure Hunt').doc('unique').update({
            number: regNo + 1
        })

        firebase.firestore().collection('Contestant Online Treasure Hunt').add(
            {
                "Name": name,
                "Phone no.": phone,
                "Email": email,
                "College": college
            }).then((alert) => {
                console.log("suscces");
                okFunc()
                setTimeout(history.go(0), 4000)
            });

    }
    return (
        <div className='treasurehunt'>
            <div className='head-box'>
                <div className='head'>
                    <h1>ONLINE TREASURE HUNT</h1>
                    <p>
                        Who is not excited to participate in treasure hunts. But what if it's Online, at the comfort of your home?
                        Test your knowledge, speed and analytical skills in this Online treasure hunt, where 3 winning teams would be invited to participate in an exclusive offline Tresure hunt event to search for the hidden treasure at the sjcet campus.
                        Get ready to dig deep into this novel quest for adventure! <br /> <br />

                        Coordinator <br />
                        Krishnapriya S- 6238283976  <br />
                        Anagha Elsa jose-9567944015 <br /> <br />

                        🔹 <b>Rules</b> 🔹 <br /> <br />

                        1. Each team must have 4 participants. <br />
                        2. Before starting the game, each team would be invited to a general Google meet where the coordinators would be explaining the game rules. <br />
                        3. Each team would be given a separate WhatsApp group links for the coordinators to share them Google meet links to the competition <br />
                        4. Each team would be invited to a different Google meet arena. <br />
                        You would never know your opponent's pace this way. <br />

                        5. The fastest teams to find the answers would be selected to the next round. <br />

                        4. There would be a total of 3 rounds. <br />

                        5. The first team to crack the final round answers and get to the final link would win the game. <br />
                        <b>(There is only 1 final G-meet link, which is the final arena where the treasure lies)</b> <br /> <br />

                        Good luck 🤞 <br /> <br />

                        The winning team alongside the first and second runner ups would get a chance to participate in the offline Tresure hunt event conducted at the SJCET Campus for free* with a headstart.
<br />
                        <b>*Only the Offline Tresure hunt event would be free</b>
                    </p>
                </div>
            </div>
            <div className='form'>
                <div>
                    <form method='get'>
                        <div className='form-inp-field'>
                            <div className='form-field'>
                                {/* <label> Resitration number</label><br /><br />
                                <input type="number" name="name" value={regNo} required='required' disabled /><br /><br /> */}
                                <label>Name</label><br /><br />
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required='required' /><br /><br />
                                <label>Phone</label><br /><br />
                                <input type="number" name="name" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' required /><br />
                            </div>
                            <div className='form-field'>
                                <label>Email</label><br /><br />
                                <input type="email" name="name" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='yourname@gamil.com' required /><br /><br />
                                <label>College</label><br /><br />
                                <input type="text" name="name" value={college} onChange={(e) => setCollege(e.target.value)} placeholder='College name' required /><br />
                            </div>
                        </div>

                        <input type="submit" value="Submit" id='submit' onClick={handleSubmit} />
                    </form>
                    <div className="alertDiv">
                        <div id="popcont" className="alert-container">
                            <div id="pop" className="alert-box hide">
                                <div className="alert-contant">
                                    <h1>Succsess</h1>
                                    <hr />
                                    <form>
                                        <p>Submission Successfull, Thankyou</p>
                                        <button className="alert--ok-btn" onClick={closeFunc}>Ok</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Treahunt