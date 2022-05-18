import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../store/Contexts'
import './Dashboard.css'
import Header from './Header'

function Dashboard() {
    
    const { firebase } = useContext(FirebaseContext)
    const [teams, setTeams] = useState([])

    // firebase.firestore().collection('Registration Number').doc('unique').get().then((res) => {
    //     setRegNo(res.data().number)
    // })
    useEffect(() => {
        
        firebase.firestore().collection('TEAMS').get().then((snapshot) => {
            const alldocs = snapshot.docs.map((team) => {
    
                return {
                    ...team.data(),
                    // id: team.id
    
                }
            })
            setTeams(alldocs)
        })
    },[firebase])
    
    
    console.log(teams);
    return (
        <div>
            <Header/>
            <h1>Dashboard</h1>
            <div className="dataDiv1">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Resitration number</th>
                                <th>Team Name</th>
                                <th>Team Captain</th>
                                <th>Contact <br /> (Team Captain)</th>
                                <th>Email <br /> (Team Captain)</th>
                                <th>Team Member 1</th>
                                <th>Contact <br /> (Team Member 1)</th>
                                <th>Email <br /> (Team Member 1)</th>
                                <th>Team Member 2</th>
                                <th>Contact <br /> (Team Member 2)</th>
                                <th>Email <br /> (Team Member 2)</th>
                                <th>Team Member 3</th>
                                <th>Contact <br /> (Team Member 3)</th>
                                <th>Email <br /> (Team Member 3)</th>
                                <th>Abstract link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => {
                                console.log(team.file_Url)
                                return (<tr key={index}>
                                    
                                    <td>{team.Registration_number}</td>
                                    <td>{team.Team_Name}</td>
                                    <td>{team.Team_Captain_Name}</td>
                                    <td>{team.Contact_team_cap}</td>
                                    <td>{team.Email_team_cap}</td>
                                    <td>{team.Tema_memb_1}</td>
                                    <td>{team.Contact_team_memb_1}</td>
                                    <td>{team.Email_team_memb_1}</td>
                                    <td>{team.Tema_memb_2}</td>
                                    <td>{team.Contact_team_memb_2}</td>
                                    <td>{team.Email_team_memb_2}</td>
                                    <td>{team.Tema_memb_3}</td>
                                    <td>{team.Contact_team_memb_3}</td>
                                    <td>{team.Email_team_memb_3}</td>
                                    <td><a href={`${team.filr_Url}`}>{team.file_Url}</a></td>
                                </tr>)

                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Dashboard