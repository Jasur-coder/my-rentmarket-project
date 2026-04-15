import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { InputMask } from "@react-input/mask";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "./ui/textarea";
import { contactFormSchema } from "@/utils/schema";
import { contactFormDefaultValues } from "@/utils/dafault-values";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/utils/https";
import { toast } from "sonner";
import { endpoints } from "@/utils/endpoints";
import { Loader2 } from "lucide-react";
import useModal from "@/hooks/useModal";
import InfoModal from "./info-modal";



type MutationParams = {
  url: string;
  data: {
    first_name: string;
    phone: string;
    message: string;
  };
};
const ContactForm = () => {

 

  const { open, handleOpen } = useModal();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaultValues,
  });

  const { mutate, isPending } = useMutation<unknown, Error, MutationParams>({
    mutationFn: ({ url, data }) => postData({ url, data }),
    onSuccess: () => {
      form.reset(contactFormDefaultValues);
      handleOpen();
    },
    onError: (error) => {
      toast.error(error.message || "Failed", { duration: 3000 });
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const phone = values.phone.replace(/[()\s]/g, "");
    mutate({ url: `${endpoints.contact}`, data: { ...values, phone } });
  }
  return (
    <section className="py-16">
      <div className="container">
        <div className="p-8 sm:p-10 md:p-12 lg:p-16 bg-[#206BC4] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-[563px]">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-semibold text-white leading-[140%] ">
              Напишите нам свое имя и номер телефона, оставьте комментарий о себе
            </h2>
            <p className="text-white lg:leading-[140%] text-base md:text-lg mt-4">
              Ваш комментарий поможет нам улучшить наш сервис
            </p>
          </div>
          <div className="w-full md:w-2/5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 bg-white rounded-lg p-4"
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }: { field: ControllerRenderProps<z.infer<typeof contactFormSchema>, "first_name"> }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }: { field: ControllerRenderProps<z.infer<typeof contactFormSchema>, "phone"> }) => (
                    <FormItem>
                      <FormControl>
                        <InputMask
                          mask="+998 __ ___ __ __"
                          replacement={{ _: /\d/ }}
                          placeholder="+998 99 999 99 99"
                          {...field}
                          className="w-full rounded-md border-gray-300 border pl-3 py-2 bg-gray text-base placeholder:text-placeholder text-placeholder"
                        />
                      </FormControl>


                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }: { field: ControllerRenderProps<z.infer<typeof contactFormSchema>, "message"> }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          {...field}
                          className="resize-none"
                          rows={4}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <InfoModal open={open} handleOpen={handleOpen} />
    </section>
  );
};

export default ContactForm;