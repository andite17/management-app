import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Header from '@/components/Header'
import { getAliasName, MemberType } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { BASE_URL } from "@/constant/constant"
import axios from "axios"

const EditMember = () => {
    const {memberId} = useParams();
    const [member, setMember] = useState<MemberType>();

    useEffect(()=> {
        const fetchData = async () => {
            const res = await axios.get(`${BASE_URL}/member/${memberId}`,{
                headers: {
                    "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            setMember(res.data)
        }

        try {
            fetchData()
        } catch (error) {
            console.log(error)
        }
    },[memberId])

    console.log(member)
  return (
    <div>
        <Header/>

        <section className='container mt-10 flex justify-center items-center'>
            <Card className="w-[700px]">
                <CardHeader>
                    <CardTitle>Edit Member</CardTitle>
                    <CardDescription>Detail member info</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex justify-center items-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={member?.img} />
                                <AvatarFallback>{getAliasName(member?.name || "Full Name")}</AvatarFallback>
                            </Avatar>
                        </div>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input defaultValue={member?.name} id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Framework</Label>
                        <Select value={member?.position.toLocaleLowerCase()} >
                            <SelectTrigger id="position">
                                <SelectValue placeholder="Select position ..." />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="ceo">CEO</SelectItem>
                                <SelectItem value="directur">DIRECTUR</SelectItem>
                                <SelectItem value="manager">MANAGER</SelectItem>
                                <SelectItem value="staff">STAFF</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link to={"/"}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </CardFooter>
            </Card>
        </section>
    </div>
  )
}

export default EditMember