import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/constant/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RegisterForm = z.object({
    fullName: z.string().min(2, {
      message: "FullName must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
  })
  
  type RegisterFormSchema = z.infer<typeof RegisterForm>

const Register = () => {
    const [error, setError] = useState("");

    const registerForm = useForm<RegisterFormSchema>({
        resolver: zodResolver(RegisterForm),
        defaultValues: {
            fullName:"",
            email: "",
            password: ""
        },
    })

    const { handleSubmit, control }= registerForm;
 
    const onSubmit = handleSubmit(async (values: RegisterFormSchema) => {
        console.log("INPUTAN  :  ")
        console.log(values)
        console.log("\n\n")
        try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
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
        setError("");
        console.log(data)
        } catch (error) {
        console.log(error)
        }
    })

  return (
    <div className='w-full h-screen'>
      <div className="container flex justify-center items-center h-full">
        <Card className='w-[400px]'>
          <CardHeader>Register</CardHeader>
          <CardContent>
            <Form {...registerForm}>
              <form onSubmit={onSubmit}>
                <FormField
                  control={control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input  placeholder="Input Fullname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className="mt-5 w-full flex items-end">
                  <Button type='submit'>Register</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Register