import React, { useContext, useState } from 'react'
import { unstable_HistoryRouter } from 'react-router-dom'
import { FirebaseContext } from '../store/Contexts'
import Uploadi from '../assets/Uploadi'
import './form.css'
import './Head.css'
import swal from 'sweetalert';

function Photography() {
    const history = unstable_HistoryRouter

    const { firebase } = useContext(FirebaseContext)
    const [regNo, setRegNo] = useState(0)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [college, setCollege] = useState('')
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
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" };
            //preapre info to send to API
            fetch('https://script.google.com/macros/s/AKfycbxg28_Kch-7rSAqhbP1o-xLAznODJMtn_lXp87eTmG_cJ8w5OBQp8MGNMKAQzP1oKXW/exec',
                //your AppsScript URL
                { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
                .then(res => res.json()).then((a) => {
                    setUrl(a.url)
                    console.log(a.url) //See response
                }).catch(err => console.log(err)) // Or Error in console
        }
    }


    // allet box Function
    // const okFunc = () => {
    //     var pop = document.getElementById("pop")
    //     var popcont = document.getElementById("popcont")
    //     pop.classList.remove("hide")
    //     pop.classList.add("show")
    //     popcont.classList.add("alert-container-show")
    //     setTimeout(() => {
    //         pop.classList.remove("show")
    //         pop.classList.add("hide")
    //     }, 5000)
    // }
    // const closeFunc = () => {
    //     var pop = document.getElementById("pop")
    //     pop.classList.remove("show")
    //     pop.classList.add("hide")
    // }// alert box function close


    // calling resitration number
    firebase.firestore().collection('Registration Number rad Photography').doc('unique').get().then((res) => {
        setRegNo(res.data().number)
    })


    // submit btn function
    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection('Registration Number rad Photography').doc('unique').update({
            number: regNo + 1
        })

        firebase.firestore().collection('Contestant radiance Photography').add(
            {
                "Name": name,
                "Phone no.": phone,
                "Email": email,
                "College": college,
                "file_Url": url
            }).then((alert) => {
                console.log("suscces");
                // okFunc()
                swal("Good job!", "You have successfully submitted !", "success")
                setTimeout(history.go(0), 4000)
            });

    }
    return (
        <div className='photography'>
            <div className='head-box'>
                <div className='head'>
                    <h1>Photography Contest (Shutter Up)
                    </h1>
                    <div>
                        <ul>
                            <li> This general event is both for internal and external participants.</li>
                            <li> The picture captured must be based on moments during "Asthra 2K22".</li>
                            <li> There must only be one entry per person.</li> <br /><br />
                            <b>Registration fee : Nil <br />
                                Prize pool : 2K
                            </b>
                        </ul>
                    </div>
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
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder='Name' required='required' /><br /><br />
                                <label>Phone</label><br /><br />
                                <input type="number" name="name" value={phone} onChange={(e) => setPhone(e.target.value)}
                                    placeholder='Phone Number' required /><br />
                            </div>
                            <div className='form-field'>
                                <label>Email</label><br /><br />
                                <input type="email" name="name" value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder='yourname@gamil.com' required /><br /><br />
                                <label>College</label><br /><br />
                                <input type="text" name="name" value={college} onChange={(e) => setCollege(e.target.value)}
                                    placeholder='College name' required /><br />
                                <div className='image-input'>
                                    <label htmlFor="customFile" className="custom-file-upload">
                                        <Uploadi /> Upload your snapshot here 🤗
                                    </label>
                                    <p className='file-name-p'>{fileName}</p>
                                    <input type="file" accept="application/pdf" id="customFile" onChange={(e) =>
                                        guardarArchivo(e)} required />
                                </div>
                            </div>
                        </div>

                        <input type="submit" value="Submit" id='submit' onClick={handleSubmit} />
                    </form>
                    {/* <div className="alertDiv">
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Photography