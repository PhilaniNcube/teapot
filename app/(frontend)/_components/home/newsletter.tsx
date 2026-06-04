'use client'

import { useActionState, useEffect, useRef } from 'react'
import { Check, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { subscribeNewsletter } from './newsletter-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const initialState = {
  success: false,
  message: '',
}

export function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message)
        formRef.current?.reset()
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  const bulletPoints = [
    "News about upcoming books and launches",
    "Behind-the-scenes stories from Barbara's writing life",
    "Historical discoveries that inspire her novels",
    "Personal reflections and memoir-writing insights",
    "Exclusive updates before they're shared elsewhere",
  ]

  return (
    <section id="newsletter" className="container pb-24 px-4">
      <div className="w-full max-w-7xl mx-auto bg-[#faf7f2] border border-[#c9a227]/20 rounded-lg shadow-sm overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Panel: Content & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground font-semibold mb-2">
                Join Barbara&apos;s Readers&apos; Circle
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Receive occasional emails featuring:
              </p>
            </div>
            
            <ul className="space-y-3.5">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227] mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel: Subscription Form */}
          <div className="lg:col-span-5 bg-white border border-border/60 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col items-center text-center space-y-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">Stay Connected</h3>
                <p className="text-sm text-muted-foreground">
                  Subscribe with your email to receive direct letters from Barbara.
                </p>
              </div>
            </div>

            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="rounded-none border-input focus-visible:ring-[#c9a227] h-12 bg-[#fafaf9]"
                  disabled={isPending}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full uppercase bg-slate-700 hover:bg-[#c9a227] text-white tracking-widest text-xs rounded-none h-12 font-medium transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? 'Subscribing...' : 'Subscribe Here'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
