"use client"

import {getProviders, signIn} from "next-auth/react";
import {useState, useEffect} from "react";
import Button from "@/components/Button";

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signInUrlParams?: Record<string, Provider> | null;
}

type Providers=Record<string, Provider>

const AuthProviders = () => {
    const [providers, setProviders] =
        useState<Providers | null>(null);

    useEffect(() => {
        const fetchProviders=async() =>{
            const res=await getProviders();
            setProviders(res);
        }

        fetchProviders();
    }, []);
    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider: Provider, index) => (
                    <Button
                        key={index}
                        handleClick={()=>signIn(provider?.id)}
                        title={"Sign In"}
                    >{provider.id}</Button>
                ))}
            </div>
        )
    }
}

export default AuthProviders;