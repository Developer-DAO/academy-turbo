import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from "ui";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Invalid email!"),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(8, "Password must have than 8 characters!"),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const loginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (loginData?.error !== undefined && loginData.error !== null) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
      });
    } else {
      router.refresh();
      router.push("/admin");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Login
        </Button>
      </form>
      <p className="text-md mt-5 text-center text-gray-600">
        If you don&apos;t have an account, please.
        <Link className="ml-1 text-blue-500 hover:underline" href="/signup">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
