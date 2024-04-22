"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { MovieSearchedState, getSearchedMovies } from "@/redux/reducer/movieSearchedSlice"
import { useEffect } from "react"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function TestingPage() {
  // ...
  const searchMovies:any = useAppSelector((state): MovieSearchedState => state.searchedMovies)
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    }
  })

  useEffect(()=> {
    
  },[searchMovies])

  return (
    <>
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem >
                <FormLabel >Username</FormLabel>
                <div className="input-wrapper mt-2 flex items-center w-full h-16 bg-[#252833] rounded-lg">
                    <div className="pl-4">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.1rem" viewBox="0 0 24 24"><path fill="#6b7280" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
                        </span>
                    </div>
                    <div className="p-2 w-full">

                    <FormControl className="p-2">
                  <Input autoComplete="off" placeholder="shadcn"  {...field} className=" text-lg bg-transparent text-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none" />
                </FormControl>
                    </div>
                </div>
                
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {searchMovies.loading === 'succeeded' ?
        <div className="card">
              {searchMovies.searchedMovies.results.map((movie) => (
                <h2>{movie.title}</h2>
              ))}
              <h2>sip</h2>
        </div>
      : <h2>Loading</h2>}

    </>
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    dispatch(getSearchedMovies(values.username));
    
    console.log(values)
  }
}

