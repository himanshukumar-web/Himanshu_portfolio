import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Message Sent Successfully! 🚀",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-24 relative bg-background/80">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 text-center md:text-left justify-center md:justify-start">
            <span className="text-primary font-mono text-xl">07.</span>
            Get In Touch
            <div className="hidden md:block h-px bg-border flex-1 ml-4" />
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Info */}
            <div className="space-y-8">
              <p className="text-lg text-foreground/80 leading-relaxed">
                I'm currently looking for new opportunities, internships, and collaborations. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-foreground/90">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary glow-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">Call / WhatsApp</p>
                    <a href="https://wa.me/919417885574" target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-accent transition-colors">
                      +91 9417885574
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-foreground/90">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent glow-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">Email</p>
                    <a href="mailto:himanshukumar160077@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">
                      himanshukumar160077@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-foreground/90">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary glow-secondary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">Location</p>
                    <p className="text-lg font-medium">Ghaziabad, Uttar Pradesh, India 🇮🇳</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <a href="https://github.com/himanshukumar-web" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-accent hover:border-accent hover:glow-accent transition-all duration-300">
                  <SiGithub className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/himanshu-kumar-813626327" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-[#0077b5] hover:border-[#0077b5] shadow-[0_0_0_rgba(0,119,181,0)] hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] transition-all duration-300">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href="https://wa.me/919417885574" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-[#25D366] hover:border-[#25D366] shadow-[0_0_0_rgba(37,211,102,0)] hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300">
                  <FaWhatsapp className="w-5 h-5" />
                </a>
                <a href="mailto:himanshukumar160077@gmail.com" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary hover:glow-primary transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Form */}
            <div className="glass-panel p-8 rounded-2xl border border-primary/20">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-mono text-xs uppercase">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-black/20 border-border focus-visible:border-primary focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-mono text-xs uppercase">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-black/20 border-border focus-visible:border-accent focus-visible:ring-accent/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-mono text-xs uppercase">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Inquiry" className="bg-black/20 border-border focus-visible:border-secondary focus-visible:ring-secondary/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-mono text-xs uppercase">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Hello, I'd like to talk about..." 
                            className="bg-black/20 border-border focus-visible:border-primary focus-visible:ring-primary/20 min-h-[120px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 hover-glow transition-all duration-300 gap-2 h-12">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
