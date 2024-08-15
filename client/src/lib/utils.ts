import { BASE_URL } from "@/constant/constant";
import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToBase64 = (file : any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const getUser = async () => {
  const response = await axios.get(`${BASE_URL}/user/me`, {
    headers: {
        "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
    }
  })
  return response
}

export const getToken =  sessionStorage.getItem('token');

export const checkToken = () => {
  return !!sessionStorage.getItem('token');
} 

export const clearSession = () => {
  sessionStorage.clear();
};

export const getAliasName = (name:string) => {
  console.log(name)
  const listString : string[] = name.toLocaleUpperCase().split(" ");
  
  return listString.length > 1 ? listString[0].charAt(0).concat(listString[1].charAt(0)) : listString[0].charAt(0) 
}

export type MemberType = {
  id: string,
  name: string,
  img: string,
  position: string,
  reportTo: string
}
