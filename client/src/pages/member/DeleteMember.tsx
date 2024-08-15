import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { BASE_URL } from '@/constant/constant'
import { useNavigate } from 'react-router-dom'

const DeleteMember = (props : {idMember:string}) => {
    const {idMember} = props;
    const navigate = useNavigate();
    
    const handleDeleteOnClikConfimation = async () => {
        await axios.delete(`${BASE_URL}/member/${idMember}`,{
            headers: {
                "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        navigate('/', { replace: true });
        window.location.reload();
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            member and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteOnClikConfimation}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteMember