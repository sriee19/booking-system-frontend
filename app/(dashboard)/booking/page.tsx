'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"
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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FileUpload } from "@/components/ui/file-upload"
import { BackgroundBeams } from "@/components/ui/background-beams"

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  date: z.date({
    required_error: "A date is required for the consultation.",
  }),
  files: z.array(z.custom<File>()).optional().default([]),
})

export default function BookingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      date: undefined,
      files: [],
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className="relative bg-[#F3E8FF] w-full min-h-screen flex justify-center items-center text-[#4A235A] p-4">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* Content layer */}
      <div className="relative z-10 w-full max-w-4xl space-y-8 rounded-lg border bg-[#EAD1FF] border-[#D0A9F5] p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4A235A]">Book Consultation</h1>
          <p className="text-[#6C3483]">Fill in the details to schedule your consultation.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          {...field} 
                          className="border-[#D0A9F5] text-[#4A235A] bg-white hover:border-[#B977F5] h-12 rounded-lg px-4" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Email" 
                          {...field} 
                          className="border-[#D0A9F5] text-[#4A235A] bg-white hover:border-[#B977F5] h-12 rounded-lg px-4" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Consultation Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-12 pl-3 text-left font-normal border-[#D0A9F5] bg-white hover:border-[#B977F5] rounded-lg",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="text-[#6C3483]">Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white rounded-lg" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button type="submit" className="w-full bg-[#6C3483] text-white hover:bg-[#4A235A] rounded-lg py-3">
                Book Consultation
              </Button>
              <Link href="/" className="w-full">
                <Button type="button" className="w-full bg-[#D0A9F5] text-[#4A235A] hover:bg-[#B977F5] rounded-lg py-3">
                  Back to Home
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}