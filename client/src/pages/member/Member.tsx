import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import React, { useEffect, useState } from 'react'
import AddMember from './AddMember'
import { BASE_URL } from '@/constant/constant'
import { getAliasName, getToken, MemberType } from '@/lib/utils'
import DeleteMember from './DeleteMember'
import Header from '@/components/Header'

const Member = () => {
    const[members, setMembers] = useState<[]>();

    useEffect(()=>{
        const fetchData = async() => {
            const response = await fetch(`${BASE_URL}/member`, {
                headers: {
                    "Authorization": `Bearer ${getToken}`
                }
            });
            const {data} = await response.json();
            setMembers(data)
            console.log(data)
        }
        fetchData();

    },[])

  return (
    <div>
        <Header/>

        <section className='container mt-10'>
            <div className="flex justify-end">
                <AddMember/>
                {/* <Button>Add member</Button> */}
            </div>

            <div className="mt-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-3'>No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members?.map((member : MemberType, index)=> {
                            return(
                                <TableRow id={member.id}>
                                    <TableCell className="font-medium">{index+1}</TableCell>
                                    <TableCell className='flex gap-2 items-center'>
                                        <Avatar>
                                            <AvatarImage src={member.img} />
                                            {/* <AvatarFallback>CN</AvatarFallback> */}
                                            <AvatarFallback>{getAliasName(member.name)}</AvatarFallback>
                                        </Avatar>
                                        <h1>{member.name}</h1>
                                    </TableCell>
                                    <TableCell>{member.position}</TableCell>
                                    <TableCell className="text-right">
                                        <DeleteMember idMember={member.id}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    </div>
  )
}

export default Member