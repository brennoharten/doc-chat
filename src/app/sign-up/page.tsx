"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Page() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isPending } = useSignup();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('enttrou aqui')
        signup(email, password, fullName);
        
    };

    return (
        <div className="flex flex-col lg:flex-row-reverse  gap-20 h-screen w-full lg:px-20 lg:py-20">
            <div className="flex flex-col justify-center lg:w-1/2 px-20">
                <div>
                    <h1 className="text-3xl font-medium">Cadastre-se agora</h1>
                    <p className="mt-4 text-muted-foreground font-normal text-lg">
                        Crie sua conta agora mesmo
                    </p>
                    <form className="mt-10" onSubmit={handleSubmit}>
                        <p className="text-muted-foreground mb-2.5">Nome completo</p>
                        <Input
                            type="text"
                            autoComplete="name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <p className="mt-5 text-muted-foreground mb-2.5">E-mail</p>
                        <Input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="mt-5 text-muted-foreground mb-2.5">Senha</p>
                        <Input
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            disabled={isPending}
                            size="lg"
                            className="mt-10 text-lg w-full"
                        >
                            {isPending && (
                                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
                            )}
                            {isPending ? "Criando a conta..." : "Criar minha conta"}
                        </Button>
                    </form>
                    <div className="mt-12 flex justify-center gap-2 text-lg">
                        <p>Já tem uma conta?</p>
                        <Link href="/login" className="text-primary">
                            Entre agora.
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 bg-muted rounded-xl p-12">
                <h2 className="mt-10 text-4xl leading-[50px] font-medium">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </h2>
                <p className="mt-6 text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                    debitis dolore, dicta fugiat iure quia! Hic facilis aut ducimus
                    aliquam blanditiis ex ea. Ipsa omnis quas impedit maiores ad unde?
                </p>
                <div className="bg-foreground text-background p-8 rounded-xl mt-16 leading-8">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
                    quasi molestias molestiae, pariatur, doloribus neque saepe sit hic
                    quis sequi nulla non quidem accusantium harum ipsa minima adipisci
                    iure obcaecati!
                </div>
            </div>
        </div>
    );
}
