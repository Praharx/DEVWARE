"use client"

import PageNavbar, { PageNavbarIconButton, PageNavbarLeftContent, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Add, ExportCurve, Notification, Profile, SearchNormal1 } from 'iconsax-react'
import PageContent from '@/components/layout/PageContent'
import { PrimaryButton, OutlineButton } from '@/components/ui/Button'
import MembersTable from '@/components/teams/MembersTable'
import axios, { AxiosResponse } from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
import z from "zod"
import { data } from 'autoprefixer'

const emailSchema = z.coerce.string().email({message: "Invalid email address"});

enum UserEnum {
    USERNAME,
    EMAIL,
    PASSWORD
}
function Teams() {
    const [userData, setUser] = useState<SetStateAction<Promise<AxiosResponse<any, any>>>>()
    const [userChange, setUserChange] = useState(true)
    const [emailChange, setEmailChange] = useState(true)
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function updateUserData(which: UserEnum) {
        const field: string = which == UserEnum.USERNAME ? 'username' : 'email';
        if (which === UserEnum.EMAIL){
            try {
                emailSchema.parse(email)
                alert("success")
                const response = await axios("http://localhost:3000/api/updateUser" , {
                    data: {
                        email
                    }
                })
            }catch(err){
                alert(err)
            }
        }
    }

    useEffect(()=> {
        something()
    }, [])

    async function something(){
        const user = await axios.get("http://localhost:3000/api/user")
        console.log(user.data)
        setUser(user.data)
    }
    return (
        <div className='text-gray-500 w-full'>
            <PageNavbar>
                <PageNavbarLeftContent>
                    <div>
                        <h1 className='text-sm font-semibold text-red-800'>Profile Settings</h1>
                        <p className='text-xs font-medium'>Manage Your account details from this interface</p>
                    </div>
                </PageNavbarLeftContent>
                </PageNavbar>

            <PageContent>
                {/* header */}
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Username</label>
                    <input type ="text" onChange={(e) => {
                        setUserChange(false)
                        setUserName(e.target.value)
                        console.log(username)
                    }} placeholder={userData?.userName} value={ userChange ? userData?.userName : username} />
                        <OutlineButton>
                    <div>
                        {   userChange ?
                            <h1 className='text-sm justify-center font-semibold text-red-800'>Change username to update credentials</h1>
                            :
                            <h1 onClick={() => {
                                updateUserData(UserEnum.USERNAME)
                            }} className='text-sm justify-center font-semibold text-red-800' >Update Username</h1>
                        }
                    </div>
                        </OutlineButton>
                    </div>

                </div>
                    <hr className='-mx-4' />
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Email Adress</label>
                    <input type ="email" onChange={(e) => {
                        setEmailChange(false)
                        setEmail(e.target.value)
                        console.log(email)
                        }} placeholder={userData?.email} 
                        value={ emailChange ? userData?.email : email}
                        />
                        <OutlineButton>
                    
                        {   emailChange ?
                        <div>
                            <h1 className='text-sm justify-center font-semibold text-red-800'>Change Email to update credentials</h1>
                        </div>
                            :
                            <div onClick={() => {updateUserData(UserEnum.EMAIL)}}>
                                <h1 className='text-sm justify-center font-semibold text-red-800'>Update Email</h1>
                             </div>
                        }
                    
                        </OutlineButton>
                    </div>
                </div>

                <hr className='-mx-4' />
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Password</label>
                        <OutlineButton>
                    <div>
                          <h1 className='text-sm justify-center font-semibold text-red-800' >Update Password</h1>
                        
                    </div>
                        </OutlineButton>
                    </div>
                </div>

                <hr className='-mx-4' />


            </PageContent>

        </div>
    )
}

export default Teams
