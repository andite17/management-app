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
import Header from '@/components/Header'
import { MemberType } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

const EditMember = (props : {idMember : string}) => {
    const {idMember} = props;
    const [member, setMember] = useState<MemberType>();

    useEffect(()=> {

    },[])
  return (
    <div>
        <Header/>

        <section className='container mt-10'>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Edit Member</CardTitle>
                <CardDescription>Detail member info</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                        <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
            </Card>
        </section>
    </div>
  )
}

export default EditMember