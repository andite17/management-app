import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from "axios";
import { BASE_URL } from '@/constant/constant'

import React, { useState } from 'react'
import { convertToBase64, getToken } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

type errorFormAddMember = {
    name:string,
    position: string
}



const AddMember = () => {
    const [error, setError] = useState();
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [reportTo, setReportTo] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

    const handleFileUpload =async (e : any) => {
        const file = e.target.files[0];
        const base64Url = await convertToBase64(file);
        // const base64 = (base64Url as string).split(",")[1];
        setImg(base64Url);
    }
    

    const handleSubmit = async (e:any) => {
        setError(null);

        e.preventDefault();
        const config = {headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${getToken}`}}
        const requestBody = JSON.stringify({
            name,
            position,
            reportTo,
            img : img.split(",")[1]
        })

        // console.log(requestBody)
        
        try{
            const response = await axios.post(`${BASE_URL}/member`, requestBody , config)
            console.log(response.data)
            
            // if(response.status !== 200) {
            //     setError(response.data.name)
            // }
            navigate('/', { replace: true });
            window.location.reload(); // Force a reload of the page
        }
        catch(err) {
            console.log(err);
        }
    }
 
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Add new member</DialogTitle>
            </DialogHeader>
            
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input onChange={(e)=>setName(e.target.value)} id="name" placeholder="Name of your project" />
                    {error && <span className='text-sm text-red-400'>{error}</span>}
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="image">Image</Label>
                    <Input onChange={(e)=>handleFileUpload(e)} type='file' accept=".jpeg, .png, .jpg" id="image" placeholder="Image of your project" />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="position">Position</Label>
                    <Select onValueChange={(e)=>setPosition(e)}>
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

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="reportTo">Report To</Label>
                    <Select onValueChange={(e)=>setReportTo(e)}>
                        <SelectTrigger id="reportTo">
                        <SelectValue placeholder="Select report to ..." />
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

            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddMember