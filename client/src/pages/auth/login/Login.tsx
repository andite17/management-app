import React, { useState } from 'react'
import './login.css'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BASE_URL } from '@/constant/constant'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const LoginForm = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

type LoginFormSchema = z.infer<typeof LoginForm>

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginForm),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const { handleSubmit, control }= loginForm;
 
  const onSubmit = handleSubmit(async (values: LoginFormSchema) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      if(!response.ok) {
        setError(data.message);
        throw new Error(data.message)
      }
      sessionStorage.setItem("token", data.token);
      navigate("/");
      setError("");
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    // console.log(values)
  })
  
  return (
    <div className='w-full h-screen'>
      <div className="container flex justify-center items-center h-full">
        <Card className='w-[400px]'>
          <CardHeader>Login</CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={onSubmit}>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder="Input Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Input Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h1 className='text-red-500 text-xl font-medium'>{error}</h1>

                {/* <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="email of your project" />
                  </div>
                </div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">password</Label>
                    <Input id="password" placeholder="password of your project" />
                  </div>
                </div> */}

                <div className="mt-5 w-full flex items-end">
                  <Button className='w-full' type='submit'>Login</Button>
                </div>

                <div className="my-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                </div>
                
                <Button className='w-full'>
                  <FcGoogle className="mr-2 h-6 w-6" />
                  Login with Google
                </Button>
              </form>    
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login