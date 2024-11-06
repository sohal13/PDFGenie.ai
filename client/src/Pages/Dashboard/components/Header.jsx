import React from 'react'
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CgMenu } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Header({setIsSidebarOpen}) {

    const setValue=()=>{
        setIsSidebarOpen(true)
    }
    return (
        <div className='w-full h-12 shadow-md items-center rounded '>
            <div className='flex justify-between md:justify-end mt-1 px-2'>
                <div onClick={setValue}  className='flex md:hidden'>
                <CgMenu className='h-10 text-4xl text-primary'/>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem className="mt-2 border-2 flex justify-between cursor-pointer">LogOut <RiLogoutBoxRLine /></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default Header