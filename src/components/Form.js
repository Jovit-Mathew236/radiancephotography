import React, { useContext, useState } from 'react'
import { unstable_HistoryRouter } from 'react-router-dom'
import Uploadi from '../assets/Uploadi'
import { FirebaseContext } from '../store/Contexts'
import "./form.css"
import Header from './Header'
// import { Firebase } from '../firebase/config'


function Form() {

    const history = unstable_HistoryRouter

    const { firebase } = useContext(FirebaseContext)
    const [regNo, setRegNo] = useState(0)
    const [teamname, setTName] = useState("")
    const [teamCaptain, setTeamCaptain] = useState("")
    const [contactTC, setContactTC] = useState("")
    const [emailTC, setEmailTC] = useState("")
    const [teamMemb1, setTeamMemb1] = useState("")
    const [contactMemb1, setContactMemb1] = useState("")
    const [emailMemb1, setEmailMemb1] = useState("")
    const [teamMemb2, setTeamMemb2] = useState("")
    const [contactMemb2, setContactMemb2] = useState("")
    const [emailMemb2, setEmailMemb2] = useState("")
    const [teamMemb3, setTeamMemb3] = useState("")
    const [contactMemb3, setContactMemb3] = useState("")
    const [emailMemb3, setEmailMemb3] = useState("")
    const [url, setUrl] = useState('')
    const [fileName, setFileName] = useState('')

    function guardarArchivo(e) {
        var file = e.target.files[0] //the file
        console.log(file.name);
        setFileName(file.name)
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
            fetch('https://script.google.com/macros/s/AKfycbyL2FI2-qqMHHPbjV-wUJY7IHPO_Ixueq0kTEkaQLjJhl9qwo7qiT5yD77LngX89szZOQ/exec', //your AppsScript URL
                { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
                .then(res => res.json()).then((a) => {
                    setUrl(a.url)
                    console.log(a.url) //See response
                }).catch(err => console.log(err)) // Or Error in console
        }
    }
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
    firebase.firestore().collection('Registration Number').doc('unique').get().then((res) => {
        setRegNo(res.data().number)
    })


    // submit btn function
    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection('Registration Number').doc('unique').update({
            number: regNo + 1
        })

        firebase.firestore().collection('TEAMS').add(
            {
                "Registration_number": regNo,
                "Team_Name": teamname,
                "Team_Captain_Name": teamCaptain,
                "Contact_team_cap": contactTC,
                "Email_team_cap": emailTC,
                "Tema_memb_1": teamMemb1,
                "Contact_team_memb_1": contactMemb1,
                "Email_team_memb_1": emailMemb1,
                "Tema_memb_2": teamMemb2,
                "Contact_team_memb_2": contactMemb2,
                "Email_team_memb_2": emailMemb2,
                "Tema_memb_3": teamMemb3,
                "Contact_team_memb_3": contactMemb3,
                "Email_team_memb_3": emailMemb3,
                "file_Url": url
            }).then((alert) => {
                console.log("suscces");
                okFunc()
                setTimeout(history.go(0), 4000)
            });

    }
    return (
        <div className='hackiton'>
            <Header />
            <div className='form'>
                <div>
                    <form method='get'>
                        <div className='form-inp-field'>
                            <div className='form-field'>
                                {/* <label> Resitration number</label><br /><br />
                                <input type="number" name="name" value={regNo} required='required' disabled /><br /><br /> */}
                                <label> Team Name</label><br /><br />
                                <input type="text" name="name" value={teamname} onChange={(e) => setTName(e.target.value)} placeholder='Name' required='required' /><br /><br />
                                <label> Team Captain</label><br /><br />
                                <input type="text" name="name" value={teamCaptain} onChange={(e) => setTeamCaptain(e.target.value)} placeholder='Team Captian' required /><br />
                            </div>
                            <div className='form-field'>
                                <label> Contact (Team Captain)</label><br /><br />
                                <input type="number" name="name" value={contactTC} onChange={(e) => setContactTC(e.target.value)} placeholder='Phone Number' required /><br /><br />
                                <label> Email (Team Captain)</label><br /><br />
                                <input type="email" name="name" value={emailTC} onChange={(e) => setEmailTC(e.target.value)} placeholder='yourname@gamil.com' required /><br />
                            </div>
                            <div className='form-field'>
                                <label> Team Member 1</label><br /><br />
                                <input type="text" name="name" value={teamMemb1} onChange={(e) => setTeamMemb1(e.target.value)} placeholder='Name' required /><br /><br />
                                <label> Contact (Team Member 1)</label><br /><br />
                                <input type="number" name="name" value={contactMemb1} onChange={(e) => setContactMemb1(e.target.value)} placeholder='Phone Number' required /><br /><br />
                                <label> Email (Team Member 1)</label><br /><br />
                                <input type="email" name="name" value={emailMemb1} onChange={(e) => setEmailMemb1(e.target.value)} placeholder='yourname@gamil.com' required /><br />
                            </div>
                            <div className='form-field'>
                                <label> Team Member 2</label><br /><br />
                                <input type="text" name="name" value={teamMemb2} onChange={(e) => setTeamMemb2(e.target.value)} placeholder='Name' /><br /><br />
                                <label> Contact (Team Member 2)</label><br /><br />
                                <input type="number" name="name" value={contactMemb2} onChange={(e) => setContactMemb2(e.target.value)} placeholder='Phone Number' /><br /><br />
                                <label> Email (Team Member 2)</label><br /><br />
                                <input type="email" name="name" value={emailMemb2} onChange={(e) => setEmailMemb2(e.target.value)} placeholder='yourname@gamil.com' /><br />
                            </div>
                            <div className='form-field'>
                                <label> Team Member 3</label><br /><br />
                                <input type="text" name="name" value={teamMemb3} onChange={(e) => setTeamMemb3(e.target.value)} placeholder='Name' /><br /><br />
                                <label> Contact (Team Member 3)</label><br /><br />
                                <input type="number" name="name" value={contactMemb3} onChange={(e) => setContactMemb3(e.target.value)} placeholder='Phone Number' /><br /><br />
                                <label> Email (Team Member 3)</label><br /><br />
                                <input type="text" name="name" value={emailMemb3} onChange={(e) => setEmailMemb3(e.target.value)} placeholder='yourname@gamil.com' /><br />
                            </div>
                            <div>
                                <label htmlFor="customFile" className="custom-file-upload"><Uploadi /> Upload your abstract here 🤗</label>
                                <p className='file-name-p'>{fileName}</p>
                                <input type="file" accept="application/pdf" id="customFile" onChange={(e) => guardarArchivo(e)} required />
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

export default Form